// import { Modal } from "antd";
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './css/nav.css'
import './css/search.css'

import shoes from '../img/shoes.png'
import { useSelector, useDispatch } from 'react-redux';
// import walkingShoes from '../img/walkingShoe.gif'

// // ============> LOGO'S
import { SlLocationPin } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { PiShoppingCartThin } from "react-icons/pi";
import { PiHeartThin } from "react-icons/pi";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { currentUserInfo, removeAllFromCart, removeAllFromWishlist, searchBoxIsVisible,setWhoLogin } from "../Redux/CartSlice";
import { Modal } from 'antd';
import { useState } from 'react';
import { BsPlusCircle } from "react-icons/bs";
// import { useState } from 'react';


function MyNav() {
    // only for find length;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [rotate, setRotate] = useState();
    // const [btnRotate, setBtnRotate] = useState(false)

    let cart = useSelector(state => state.cartSlice.cards);
    let wishlist = useSelector(state => state.cartSlice.wishlist);
    let currentUser = useSelector(state => state.cartSlice.currentUser);
    const whoLogin = useSelector(state => state.cartSlice.whoLogin);
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
                    dispatch(removeAllFromWishlist())
                    dispatch(setWhoLogin(""))
                    navigate('/whoLogin');
                }
            });
            return;
        }
        else {
            Modal.confirm({
                title: "Login",
                onOk() {
                    navigate('/whoLogin');
                }
            });
        }

    }
    function showSearchBox() {
        dispatch(searchBoxIsVisible(true))
    }

    function toggleRotate() {
        setRotate(!rotate);
    }

    return (
        <>

            <div className="my-head" > {/* Remove styele */}
                <div className="image">
                </div>
                <div className='profile' >
                    <button  ><SlLocationPin /> {address} </button> |
                    <button onClick={logout} ><CgProfile /> {name}</button>
                </div>

            </div>
            <div className={`my-nav ${rotate ? "small-nav" : ""}`}>
                <ul className='nav-item left'>
                    <Link to='/'>FitPartners.com </Link>
                    <img className='shoes' src={shoes} alt="ssd" />
                </ul>
                <ul className='nav-item center'>
                    <Link to="allProducts">Shoes</Link> |
                    <Link to="men">Men</Link> |
                    <Link to="women">Women</Link> |
                    <Link to="kids">Kids</Link> 
                </ul>
                <ul className='nav-item right'>
                    {(whoLogin == "employeeLogin") ? (<>
                        <button onClick={() => navigate('/postUpdate/-1')}><BsPlusCircle /> </button>
                    </>) : (<></>)}


                 
                    <button onClick={showSearchBox}><CiSearch /> </button>
                    <button onClick={() => navigate('/wishlist')} ><PiHeartThin /> <span>{wishlist.length}</span></button>
                    <button onClick={() => navigate('/cart')}><PiShoppingCartThin /><span>{cart.length}</span></button>

                </ul>
                <button className={`three-line ${!rotate ? "rotateBtn" : ""}`} onClick={toggleRotate} >
                    <div className='dot-1'><HiOutlineDotsCircleHorizontal /></div>
                    <div className='dot-2'><HiOutlineDotsCircleHorizontal /></div>
                    <div className='dot-3'><HiOutlineDotsCircleHorizontal /></div>
                </button>
            </div>

            <div className='some-details'></div>
        </>
    )
}

export default MyNav