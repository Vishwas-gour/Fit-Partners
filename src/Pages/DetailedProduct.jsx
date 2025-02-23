import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import './css/detailed.css'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../Redux/CartSlice';
import Review from '../Components/Review.jsx'
import { Modal } from 'antd';


function DetailedProduct() {
    const { id } = useParams();
    const [card, setCard] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let ans = useSelector(stata => stata.cartSlice.cards);
    let currentUser = useSelector(stata => stata.cartSlice.currentUser);
    let cartApi = `http://localhost:3000/products/${id}`;
    // =================[ INITIAL RENDER ]=================
    function renderCarts() {
        axios.get(cartApi).then((res) => {
            setCard(res.data);
        });
    }

    useEffect(() => {
        renderCarts();
        window.scrollTo(0, 0);
    }, []);

    function handleBuy() {
        const check = ans.find((key) => key.id == id);
        if (check) {


            Modal.confirm({
                title: "Product already in the cart! Do you want to view the cart?",
                onOk() {
                    navigate("/cart")
                },
                onCancel(){
                    navigate(`/payment/${card.id}`)
                }
            });
        }
        else {
            dispatch(addToCart(card));
            if(currentUser)navigate(`/payment/${card.id}`)
        }
    }

    return (
        <>
            <div className='parent'>
                <div className='detailed-cards'>
                    <div className='first-div part'>
                        <img src={card.imgUrl} alt="" />
                    </div>
                    <div className='second-div part'>
                        <div className='card-title'>{card.name}</div>
                        <div className='card-text1'>{card.about}</div>
                        <div className='card-text2'>{card.detailed_description}</div>
                        <div className="card-price"><h4>₹{(card.price)}</h4>
                            <button onClick={() => handleBuy()}>Buy Product</button>
                            <button onClick={() => dispatch(addToCart(card))}>Add TO Cart</button>
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
}

export default DetailedProduct