// import { Modal } from "antd";
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './css/nav.css'
import './css/search.css'
// import tag from '../img/tag.png'
import shoes from '../img/shoes.png'
import { useSelector, useDispatch } from 'react-redux';
// import walkingShoes from '../img/walkingShoe.gif'

// // ============> LOGO'S
import { SlLocationPin } from "react-icons/sl";
// import { CiPen } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { PiShoppingCartThin } from "react-icons/pi";
import { PiHeartThin } from "react-icons/pi";
import { currentUserInfo, removeAllFromCart, searchBoxIsVisible } from "../Redux/CartSlice";
// import {  searchBoxIsVisible } from "../Redux/CartSlice";
import { Modal } from 'antd';


function MyNav() {
    // only for find length;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let cart = useSelector(state => state.cartSlice.cards);
    let wishlist = useSelector(state => state.cartSlice.wishlist);
    let currentUser = useSelector(state => state.cartSlice.currentUser);
    const address = currentUser?.address || "Address";
    const name = currentUser?.name || "Login";

    function logout() {
        if (name != "Login") {
            Modal.confirm({
                title: "Logout",
                content: "Are you sure you want to log out?",
                onOk() {
                    dispatch(currentUserInfo(null))
                    dispatch(removeAllFromCart())
                    navigate('/login');
                }
            });
            return;
        }
        else {
            Modal.confirm({
                title: "Login",
                onOk() {
                    navigate('/login');
                }
            });
        }

    }
    function showSearchBox() {
        dispatch(searchBoxIsVisible(true))
    }


    return (
        <>

            <div className="my-head">
                <div className="image">
                </div>
                <div className='some-details'>
           
                </div>
                <div className='profile' >
                    <div  ><SlLocationPin  /> {address} </div> | 
                    <div onClick={logout} ><CgProfile  /> {name}</div>
                </div>

            </div>
            <div className='my-nav'>
                <ul className='nav-item left'>
                    <a href="/">FitPartners.com </a>
                    <img className='shoes' src={shoes} alt="ssd" />
                </ul>
                <ul className='nav-item center'>

                    <Link to="allProducts">Shoes</Link> |
                    <Link to="men">Men</Link> |
                    <Link to="women">Women</Link> |
                    <Link to="kids">Kids</Link>
                </ul>
                <ul className='nav-item right'>
                    <button onClick={showSearchBox}><CiSearch /> </button>
                    <button onClick={() => navigate('/wishlist')} ><PiHeartThin /> <span>{wishlist.length}</span></button>
                    <button onClick={() => navigate('/cart')}><PiShoppingCartThin /><span>{cart.length}</span></button>

                </ul>
            </div>

        </>
    )
}

export default MyNav