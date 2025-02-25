import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, increQuantity, decreQuantity } from '../Redux/CartSlice'
import "./css/cart.css"
import { Modal } from 'antd';


function Cart() {
    const carts = useSelector((state) => state.cartSlice.cards);
    const currentUser = useSelector((state) => state.cartSlice.currentUser);
    const dispatch = useDispatch();

    const [priceCalculation, setPriceCalulation] = useState({});
    const navigate = useNavigate();

    // ======================={ handleQuantity() } ============
    function handleQuantity(index, condition) {
        (condition) ? (dispatch(increQuantity(index))) : (dispatch(decreQuantity(index)))
    }

    // ======================={ SET PRODUCTS }========================= 
    let totalPrize = 0;
    let totalProducts = 0;
    let sections = function () {
        return carts.map((key, index) => (
            <>
                <div style={{ display: "none" }}>{totalProducts++}{totalPrize += key.price * key.quantity}</div>
                <div className='cart-cards'>
                    <div className='first-div part'>
                        <img src={key.imgUrl} alt="" />
                    </div>

                    <div className='second-div part'>
                        <div className='card-title'><h3>{key.name}</h3></div>
                        <div className='card-text'>{key.about}</div>
                        <div className="cart-card-price"><h4>INR {(key.price * key.quantity).toFixed(2)}</h4></div>
                    </div>

                    <div className="third-div part">
                        <div className='quantity'>
                            <button id={key.id} className='update-quantity' onClick={() => handleQuantity(index, false)}>➖</button>
                            <button type="number" >item {key.quantity}</button>
                            <button id={key.id} className='update-quantity' onClick={() => handleQuantity(index, true)}>➕</button>
                        </div>
                        <button className='cart-btn remove' id={key.id} style={{ background: "rgba(251, 0, 0, 0.48)" }} onClick={(e) => removeItem(e.target.id)}>Remove</button>
                        <button style={{ background: "rgb(129, 129, 234)" }} onClick={() => navigate(`/payment/${key.id}`)} >Buy-Product</button>
                        <button style={{ background: "rgb(234, 225, 129)", color: "black" }} onClick={() => navigate(`/detailedProduct/${key.id}`)}>More... </button>
                    </div>
                </div>
            </>
        ));
    }


    // ========================[ Remove item form cart ]=============
    function removeItem(id) {
        Modal.confirm({
            title: "do you want to remove Item",
            onOk() {
                dispatch(removeFromCart(id))
            }
        });

    }
    let product = sections();
    totalPrize = totalPrize.toFixed(2); // for taking 2 digits after decimal

    // ========================[ Calculation of Price Detail ]=================
    //==> when any item remove or quantity the price update and this useEffect render on that

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        totalPrize = parseFloat(totalPrize).toFixed(2);
        totalProducts = parseFloat(totalProducts).toFixed(2);
        let discount = parseFloat(totalPrize * 0.1).toFixed(2);
        let deliveryCharges = parseFloat(totalPrize * 0.01).toFixed(2);
        let priceAfterDiscount = (parseFloat(totalPrize - discount + +(deliveryCharges))).toFixed(2);
        let platformFee = parseFloat(totalPrize * 0.02).toFixed(2);

        if (platformFee > 10) platformFee = 9.76
        setPriceCalulation(
            {
                totalPrize: totalPrize,
                totalProducts: totalProducts,
                discount: discount,
                deliveryCharges: deliveryCharges,
                priceAfterDiscount: priceAfterDiscount,
                platformFee: platformFee
            })
    }, [totalPrize]);


    return (
      
            <>

                {(  currentUser && carts.lenght != 0) ? (

                    <>

                        <div className='carts-container  '>
                            <div className='cart-product'>
                                {product}
                            </div>
                            <div className='price-detail'>
                                <h2>Price detail</h2>
                                <div className='detail'>
                                    <div>Price ({totalProducts})</div>
                                    <div>₹{totalPrize}</div>
                                </div>
                                <div className='detail'>
                                    <div>Discount</div>
                                    <div>₹{priceCalculation.discount}</div>
                                </div>
                                <div className='detail'>
                                    <div>Platform fee</div>
                                    <div>₹{priceCalculation.platformFee}</div>
                                </div>

                                <div className='detail'>
                                    <div>Delivery Charges</div>
                                    <div>₹{priceCalculation.deliveryCharges}</div>
                                </div>

                                <div className='detail'>
                                    <div>total Amount</div>
                                    <div >₹{priceCalculation.priceAfterDiscount}</div>
                                </div>
                                <div className='detail' style={{ color: "yellow" }}>You will save ₹{priceCalculation.discount} on this order</div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='no-item'>
                        No items in Cart
                    </div>
                )}
            </>

        )
    
}

export default Cart