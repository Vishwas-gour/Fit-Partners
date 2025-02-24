
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { searchBoxIsVisible } from '../Redux/CartSlice';
import StarAvg from '../Components/StarAvg';
import './css/search.css'
import { limitTheLength } from '../Functions/starPrint';
import { RxCross1 } from "react-icons/rx";
import { IoSearchOutline } from "react-icons/io5";

function AllCards() {
    const [input, setInput] = useState();
    const navigate = useNavigate();
    const [allProducts, setAllProducts] = useState([]);
    const searchContainer = useSelector((state) => state.cartSlice.search);
    const style = {
        width: "55vw"
    }
    const productApi = `http://localhost:3000/products`;
    const dispatch = useDispatch();

    // =================[ INITIAL RENDER ]=================
    useEffect(() => {
        axios.get(productApi).then((res) => setAllProducts(res.data))
            .catch((err) => console.error("Error fetching products:", err));

    }, []);



    // ======================={ SET PRODUCTS }========================= 



    function renderCard() {
        return allProducts.filter(product => 
        
            product.name.toLowerCase().includes(input.toLowerCase()) ||
            product.category.toLowerCase().includes(input.toLowerCase()) 
            // product.names.toLowerCase().includes(input.toLowerCase()) 
        
        )
            .map((product) => (
                <div className='card' key={product.id} >
                    <div className='card-img'>
                        <img src={product.imgUrl} alt="" onClick={() => { navigate(`/detailedProduct/${product.id}`) }} />
                    </div>
                    <div className='card-body'>
                        <div className='card-title'>{product.name}</div>
                        <div className='card-text'>{limitTheLength(product.about, 20)}</div>
                    </div>
                    <div className='avrageStar'><StarAvg id={product.id} /></div>
                    <div className='card-footer'>
                        <div className="card-price">INR {product.price}</div>
                        <div className="add-to-cart">
                            {/* <button id={product.id} onClick={(e) => getCardData(e.target.id)} className='cart-btn'>
                            Add To Cart
                        </button> */}
                        </div>
                    </div>
                </div>
            ));

    }
    function searchBoxHide() {
        dispatch(searchBoxIsVisible(false))
    }

    return (
        <div className="search-container" style={(searchContainer) ? (style) : ({ width: "0px" })}>
            <div className='searchBox' >
                <div className='searchInput'>
                    <input type="text" placeholder='Search' value={input} onChange={(e) => setInput(e.target.value)} />
                    <h4 className='searchIcon'><IoSearchOutline /> </h4>
                </div>
                <button className="cross" onClick={searchBoxHide}><RxCross1 /></button>
            </div>
            <div className='card-rows' >
                {(!input) ? (
                    <p style={{color:"grey"}}>
                        Search for products,shoe styles, product collections / categories or key words
                    </p>) : (renderCard())}
            </div>
        </div>
    )
}
export default AllCards;