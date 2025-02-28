
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { searchBoxIsVisible } from '../Redux/CartSlice';
import StarAvg from '../Components/StarAvg';
import './css/search.css'
import { limitTheLength } from '../Functions/starPrint';
import { RxCross1 } from "react-icons/rx";
import { IoSearchOutline } from "react-icons/io5";

// eslint-disable-next-line react/prop-types
function Search() {
    const { props } = useParams()
    const [input, setInput] = useState(props);
    const navigate = useNavigate();
    const [allProducts, setAllProducts] = useState([]);
    const searchContainer = useSelector((state) => state.cartSlice.search);
    const productApi = `http://localhost:3000/products`;
    const dispatch = useDispatch();

    // =================[ INITIAL RENDER ]=================
    useEffect(() => {

        axios.get(productApi).then((res) => setAllProducts(res.data))
            .catch((err) => console.error("Error fetching products:", err));
        setInput(props)

    }, []);

    useEffect(() => {
        // props are passed by the home page in in the sec-2 or sec-3 className
        // If we pass the props then set props to the setInput 
        setInput(props)
    }, [props])



    // ======================={ SET PRODUCTS }========================= 



    function renderCard() {
        return allProducts.filter(product =>
            product.price <= (input) ||
            product.detailed_description.toLowerCase().includes(input.toLowerCase()) ||
            product.shoeType.toLowerCase().includes(input.toLowerCase()) ||
            product.names.toLowerCase().includes(input.toLowerCase()) ||
            product.name.toLowerCase().includes(input.toLowerCase()) ||
            product.category.toLowerCase().includes(input.toLowerCase())

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
                        </div>
                    </div>
                </div>
            ));

    }
    function searchBoxHide() {
        dispatch(searchBoxIsVisible(false))
    }


    return (
        <div className={`search-container ${searchContainer ? ("full-search") : ("half-search")}`} >
            <div className='searchBox' >
                <div className='searchInput'>
                    <input type="text" placeholder='Search' value={input} onChange={(e) => setInput(e.target.value)} />
                    <h4 className='searchIcon'><IoSearchOutline /> </h4>
                </div>
                <button className="cross" onClick={searchBoxHide}><RxCross1 /></button>
            </div>
            <div className='card-rows' >
                {(!input) ? (
                    <p style={{ color: "grey", margin: "1rem" }}>
                        Search for products,shoe styles, product collections / categories or key words
                    </p>) : (renderCard())}
            </div>
        </div>
    )
}
export default Search;