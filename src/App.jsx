
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Layout from './Layout';
import Home from "./Pages/Home.jsx"
import NotFound from './Pages/NotFound.jsx';
import Cart from "./Pages/Cart.jsx"
import Payment from './Pages/Payment.jsx';
import DetailedProduct from './Pages/DetailedProduct.jsx';
import Popup from './Pages/Popup.jsx';
import LoginForm from './Pages/Loginform/Login.jsx'
import SignUp from './Pages/Loginform/SignUp.jsx';
import Forget from './Pages/Loginform/Forget.jsx';
import Men from './Pages/Gender/Men.jsx';
import Women from './Pages/Gender/Women.jsx';
import Kids from './Pages/Gender/Kids.jsx';
import AllCards from './Pages/Gender/AllCards.jsx';
import Wishlist from './Pages/Wishlist.jsx';
import Search from './NonOutlets/Search.jsx';
import WhoLogin from './Pages/Loginform/WhoLogin.jsx';
import PostUpdate from './Pages/PostUpdate.jsx';
import AdminProfile from './Pages/Loginform/AdminProfile.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          {/* ⬇️ only for taking the props while click on home page section */}
          <Route path="home" element={<Home />} /> 
          <Route path="home/:props" element={<Home />} /> 

          <Route path="allProducts" element={<AllCards />} />
          <Route path="men" element={<Men />} />
          <Route path="women" element={<Women />} />
          <Route path="kids" element={<Kids />} />
          <Route path="postUpdate/:id" element={<PostUpdate />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          
          <Route path="detailedProduct/:id" element={<DetailedProduct />} />
          <Route path="payment/:id" element={<Payment />} />
          <Route path="popup" element={<Popup />} />
          <Route path="search/:?value" element={<Search />} />

          <Route path="login/:login" element={<LoginForm />} />
          <Route path="forget/:login" element={<Forget />} />
          <Route path="signUp/:login" element={<SignUp />} />
          <Route path="adminProfile/:gmail" element={<AdminProfile />} />
          <Route path="whoLogin" element={<WhoLogin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>

  )
}

export default App;