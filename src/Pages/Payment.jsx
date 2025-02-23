import  { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'
import {  useSelector } from 'react-redux';
import '../Pages/css/login.css'
import './css/payment.css'


function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cards = useSelector((state) => state.cartSlice.cards);
  const currentUser = useSelector((state) => state.cartSlice.currentUser);
  console.log(currentUser)
  const card = cards.find((key) => key.id == id);
  const [address, setAddess] = useState(currentUser.address) 

  function handleForm(e) {
    e.preventDefault();
    navigate("/popup")
  }
  return (
    <div id='payment'>
      <h3 style={{ borderRadius: "20px", textAlign: "center", backgroundColor: "rgb(255, 255, 255)", padding: "1rem" }}>Product Price: ₹ {(card.price * card.quantity)}</h3>
      <Form>


        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Mobile No.</Form.Label>
          <Form.Control type="text" placeholder="Enter Mobile No" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Curret Address</Form.Label>
          <Form.Control type="text" placeholder="Proceed with current Address"  value={address} onChange={(e)=>setAddess(e.target.value)}/>
        </Form.Group>

     
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Select payment method</Form.Label>

          <select className="form-select" style={{ marginBottom: "10px" }}>
            <option value="creditCard">Credit Card</option>
            <option value="debitCard">Debit Card</option>
            <option value="paypal">PayPal</option>
            <option value="paypal">Bank Transfer</option>
            <option value="paypal">Cash on Delivery</option>
          </select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="I am not a Robot" />
        </Form.Group>

        <Button type="submit" onClick={handleForm}>
          Submit
        </Button>
      </Form>

    </div>
  );
}

export default Payment