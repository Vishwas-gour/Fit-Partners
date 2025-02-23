
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
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="allProducts" element={<AllCards />} />
          <Route path="men" element={<Men />} />
          <Route path="women" element={<Women />} />
          <Route path="kids" element={<Kids />} />
          
          <Route path="detailedProduct/:id" element={<DetailedProduct />} />
          <Route path="payment/:id" element={<Payment />} />
          <Route path="popup" element={<Popup />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="forget" element={<Forget />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>

  )
}

export default App;