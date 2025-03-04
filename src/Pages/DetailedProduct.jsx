import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import './css/detailed.css'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, searchBoxIsVisible, toggleWishlit } from '../Redux/CartSlice';
import Review from '../Components/Review.jsx'
import { message, Modal } from 'antd';
import { FcLike } from "react-icons/fc";
import { FcDislike } from "react-icons/fc";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineChangeCircle } from "react-icons/md";


function DetailedProduct() {
    const { id } = useParams();
    const [card, setCard] = useState({});
    const [isLiked, setIsLiked] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let ans = useSelector(stata => stata.cartSlice.cards);
    const whoLogin = useSelector(state => state.cartSlice.whoLogin);
    let currentUser = useSelector(stata => stata.cartSlice.currentUser);
    let wishlist = useSelector(stata => stata.cartSlice.wishlist);
    let cartApi = `http://localhost:3000/products/${id}`;
    // =================[ INITIAL RENDER ]=================
    function renderCarts() {
        axios.get(cartApi).then((res) => {
            setCard(res.data);
        });
    }

    useEffect(() => {

        if (wishlist.some(item => item.id == id)) {
            setIsLiked(true);
        } else setIsLiked(false)

    }, [id, wishlist.length]);

    useEffect(() => {
        renderCarts();
        window.scrollTo(0, 0);
        dispatch(searchBoxIsVisible(false))

    }, [id]);


    function handleBuy() {
        const check = ans.find((key) => key.id == id);
        if (check) {
            Modal.confirm({
                title: "Product already in the cart! Do you want to view the cart?",
                onOk() {
                    navigate("/cart")
                },
                onCancel() {
                    navigate(`/payment/${card.id}`)
                }
            });
        }
        else {
            dispatch(addToCart(card));
            if (currentUser) navigate(`/payment/${card.id}`)
        }
    }

    function deleteProduct() {
        dispatch(toggleWishlit(card))
    }

    function removeFromApi() {
        axios.delete(`http://localhost:3000/products/${id}`).then(() => {
            message.success("Product removed Successfully")
        })
    }
    function popUp(check) {
        if (check === 'r') {
            Modal.confirm({
                content: 'Do you want to delete the Produnct.',
                okText: 'Yes, Proceed',
                cancelText: 'No, Go Back',
                onOk() {
                    removeFromApi();
                },
            });
        }
        else {
            Modal.confirm({
                content: 'Do you want to Update Produnct detail.',
                okText: 'Yes, Proceed',
                cancelText: 'No, Go Back',
                onOk() {
                    navigate(`/postUpdate/${id}`)
                },
            });
        }
    }
   

    return (
        (card &&
            <>
                <div className='container'>
                    <div className='detailed-cards'>
                        <div className='first-div part'>
                            <img src={card.imgUrl} alt="" />
                            {(whoLogin == "employeeLogin") ? (<>
                                <div className='icons remove' onClick={() => popUp('r')}><AiTwotoneDelete /></div>
                                <div className='icons update' onClick={() => popUp('u')}><MdOutlineChangeCircle /></div>
                            </>) : (<></>)}

                            <div className='icons like' onClick={deleteProduct}  > {(isLiked) ? (< FcDislike />) : (< FcLike />)}</div>
                        </div>
                        <div className='second-div part'>


                            <div className='card-title'>{card.name}</div>
                            <div className='card-text1'>{card.about}</div>
                            <div className='card-text2'>{card.detailed_description}</div>
                                <div className='color-available available'>
                                    <label htmlFor="">colors</label>
                                    <div >
                                        {card.colors?.map((color, indx) => <div key={indx} style={{ backgroundColor: color }}> </div>)}
                                    </div>
                                </div>
                                <div className='size-available available'>
                                    <label htmlFor="">sizes</label>
                                    <div>
                                        {card.sizeRange?.map((size, indx) => <div key={indx}>{size} </div>)}
                                    </div>
                                </div>
                            <div className="card-price"><h4>₹{(card.price)}</h4>
                                <button onClick={() => handleBuy()}>Buy Product</button>
                                <button onClick={() => dispatch(addToCart(card))}>Add To Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='resf'>
                    <h1></h1>
                    <Review id={card.id} />
                </div>
            </>
        )
    )
}

export default DetailedProduct