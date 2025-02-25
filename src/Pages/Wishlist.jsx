import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlit } from '../Redux/CartSlice'
import "./css/cart.css"
import { Modal } from 'antd';


function Wishlist() {
    const wishlist = useSelector((state) => state.cartSlice.wishlist);
    const currentUser = useSelector((state) => state.cartSlice.currentUser);
    const dispatch = useDispatch();


    const navigate = useNavigate();

    // ======================={ handleQuantity() } ============


    // ======================={ SET PRODUCTS }========================= 

    let sections = function () {

        return wishlist.map((key, index) => (
            <span id="wishlist" key={index}>

                <div className='cart-cards wishlist'>
                    <div className='first-div part'>
                        <img src={key.imgUrl} alt="" />
                    </div>
                    <div className='second-div part'>
                        <div className='card-title'><h3>{key.name}</h3></div>
                        <div className='card-text'>{key.about}</div>
                        <div className="cart-card-price"><h4>INR {(key.price * key.quantity).toFixed(2)}</h4></div>
                    </div>
                    <div className="third-div part">
                        <button className='cart-btn remove' id={key.id} style={{ background: "rgba(251, 0, 0, 0.48)" }} onClick={() => removeItem(key)}>Remove</button>
                        <button style={{ background: "rgb(129, 129, 234)" }} onClick={() => navigate(`/payment/${key.id}`)} >Buy-Product</button>
                        <button style={{ background: "rgb(234, 225, 129)", color: "black" }} onClick={() => navigate(`/detailedProduct/${key.id}`)}>More... </button>
                    </div>
                </div>

            </span>
        ));
    }


    // ========================[ Remove item form cart ]=============
    function removeItem(data) {
        Modal.confirm({
            title: "do you want to remove Item",
            onOk() {
                dispatch(toggleWishlit(data))
            }
        });

    }
    let product = sections();


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            {currentUser && wishlist.length !== 0 ? (
                <div className='container'>
                    {product}
                </div>
            ) : (

                <div className='cart-product'>
                    <div className='no-item'>
                        No items in wishlist
                    </div>
                </div>

            )}
        </>
    )

}

export default Wishlist