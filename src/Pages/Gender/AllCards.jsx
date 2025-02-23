
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../Redux/CartSlice';
import StarAvg from '../../Components/StarAvg';
import { Modal } from 'antd';
import '../css/card.css'

function AllCards(prop) {

    const navigate = useNavigate();
    const [allProducts, setAllProducts] = useState(["asdf"]);
    const carts = useSelector((state) => state.cartSlice.cards);
    const currentUser = useSelector((state) => state.cartSlice.currentUser);
    const productApi = `http://localhost:3000/products`;
    const dispatch = useDispatch();

    // =================[ INITIAL RENDER ]=================
    useEffect(() => {
        axios.get(productApi).then((res) => setAllProducts(res.data))
            .catch((err) => console.error("Error fetching products:", err));

    }, []);


    // =============== SET DATA IN CART-API
    function addToCartFunction(data) {
        let existingItem = carts.some(item => item.id === data.id);
        if (existingItem) {
            Modal.confirm({
                title: "Product already in the cart! Do you want to view the cart?",
                onOk() {
                    navigate("/cart")
                }
            });

            return;
        }

        dispatch(addToCart(data));
        if (currentUser) {
            Modal.confirm({
                title: "Item added to cart. Do you want to view the cart?",
                onOk() {
                    navigate("/cart")
                }
            });
        }
    }

    // =============== GET DATA FORM CLICKED EVENT
    async function getCardData(id) {
        const addDataApi = `http://localhost:3000/products/${id}`;
        const object = await axios.get(addDataApi);
        addToCartFunction(object.data)
    }

    // ======================={ SET PRODUCTS }========================= 
    console.log(prop.category)

    function renderCard() {
        return allProducts.filter((product) => (prop.category) ? (product.category === prop.category) : (true)
        ).map((product) => (
            <div className='card' key={product.id} >
                <div className='card-img'>
                    <img src={product.imgUrl} alt="" onClick={() => navigate(`/detailedProduct/${product.id}`)} />
                </div>
                <div className='card-body'>
                    <div className='card-title'>{product.name}</div>
                    <div className='card-text'>{product.about}</div>
                </div>
                <div className='avrageStar'><StarAvg id={product.id} /></div>
                <div className='card-footer'>
                    <div className="card-price">INR {product.price}</div>
                    <div className="add-to-cart">
                        <button id={product.id} onClick={(e) => getCardData(e.target.id)} className='cart-btn'>
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
        ));
    }


    return (
        <div className='container'>
            <div className='card-row container'>{renderCard()}</div>
        </div>
    )
}
export default AllCards;