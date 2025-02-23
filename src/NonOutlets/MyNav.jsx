import { Modal } from "antd";
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './css/nav.css'
import './css/search.css'
import { useSelector, useDispatch } from 'react-redux';
import walkingShoes from '../img/walkingShoe.gif'

// ============> LOGO'S
import { MdOutlineLocationOn } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { PiNotePencilDuotone } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { currentUserInfo, removeAllFromCart, addInSearchBar } from "../Redux/CartSlice";


function MyNav() {
    // only for find length;
    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    let cart = useSelector(state => state.cartSlice.cards);
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
    function handleInput(e){
        const value = e.target.value;
        dispatch(addInSearchBar(value));
    }
    

    return (
        <>
            <div className='my-nav'>
                <ul className='nav-item left'>
                    <a href="/">FitPartner.com   <img src={walkingShoes} style={{ height: "50px" }} alt="" /></a>

                </ul>
                <ul className='nav-item center'>
                    <Link to="allProducts">Shoes</Link> |
                    <Link to="men">Men</Link> |
                    <Link to="women">Women</Link> |
                    <Link to="kids">Kids</Link>
                </ul>
                <ul className='nav-item right'>
                    <input className="serach-icon" placeholder="search"onChange={handleInput} />
                    <Link ><div><MdOutlineLocationOn /> {address} <PiNotePencilDuotone /></div></Link> |
                    <Link ><div onClick={logout} ><CgProfile /> {name}</div></Link> |
                    <Link to="cart"><div><FaShoppingCart /> {cart.length}</div></Link>

                </ul>
            </div>

        </>
    )
}

export default MyNav