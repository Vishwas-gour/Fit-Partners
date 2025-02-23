
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart } from '../Redux/CartSlice';
import StarAvg from '../Components/StarAvg';
import { Modal } from 'antd';
import './css/search.css'
import { limitTheLength } from '../Functions/starPrint';

function AllCards() {

    const navigate = useNavigate();
    const [allProducts, setAllProducts] = useState([]);
    const carts = useSelector((state) => state.cartSlice.cards);
    const currentUser = useSelector((state) => state.cartSlice.currentUser);
    const searchValue = useSelector((state) => state.cartSlice.search);
    console.log(searchValue)
    const productApi = `http://localhost:3000/products`;
    const dispatch = useDispatch();

    let style = {
        right: "0%"
    }

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


    function renderCard() {
        if (allProducts.length == 0 || !searchValue) return "no pro ava";
        return allProducts
            .filter((product) =>
                // product.names.toLowerCase().includes(searchValue.toLowerCase()) ||
                product.price <= searchValue ||
                product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                product.about.toLowerCase().includes(searchValue.toLowerCase()) ||
                product.shoeType.toLowerCase().includes(searchValue.toLowerCase()) ||
                product.detailed_description.toLowerCase().includes(searchValue.toLowerCase()) ||
                product.category.toLowerCase().includes(searchValue.toLowerCase()))


            .map((product) => (
                <div className='card' key={product.id} >
                    <div className='card-img'>
                        <img src={product.imgUrl} alt="" onClick={() => navigate(`/detailedProduct/${product.id}`)} />
                    </div>
                    <div className='card-body'>
                        <div className='card-title'>{product.name}</div>
                        <div className='card-text'>{limitTheLength(product.about, 25)}</div>
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
        <div className='search'>
            <div className='card-row search-container' style={searchValue ? (style) : {}}>
                {searchValue && renderCard()}
            </div>
        </div>
    )
}
export default AllCards;