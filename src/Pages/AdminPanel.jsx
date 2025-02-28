import { useState } from 'react'
import '../Pages/css/login.css'
import './css//admin.css'
import axios from 'axios'
function AdminPanel() {
  let [postData, setPostData] = useState({ "quantity": 1, "noOfReviews": 0, "rating": 0 })
  let [inputCategory, setInputCategory] = useState("men")
  let [selectColor, setSelectColor] = useState({ "Red": false, "Green": false, "Blue": false, "Yellow": false, "Black": false, "White": false })
  let [selectSize, setSelectSize] = useState({ "6": false, "7": false, "8": false, "9": false, "10": false, "5": false });
  const api = `http://localhost:3000/products`;

  const category = {
    "men": ["sneakers", "boots", "loafers", "sandals", "running"],
    "women": ["heels", "flats", "boots", "sandles"],
    "kids": ["sneakers", "boots", "sandals", "slions"]
  }
  const colors = ["Red", "Green", "Blue", "Yellow", "Black", "White"];
  const sizes = ["5", "6", "7", "8", "9", "10"];

  function handleColorChange(e) {
    const name = e.target.name;
    const checked = e.target.checked;
    setSelectColor(pre => ({ ...pre, [name]: checked }))
  }
  function handleSizeChange(e) {
    const name = e.target.name;
    const checked = e.target.checked;
    setSelectSize(pre => ({ ...pre, [name]: checked }))
  }

  function handleInputs(e) {
    let name = e.target.name;
    let value = e.target.value;
    if (name == "price" || name == "discount") value = +value;
    setPostData(pre => ({ ...pre, [name]: value }))
  }
  function confirmChanges() {
    let finalColor = Object.keys(selectColor).filter(key => selectColor[key] == true );
    let finalSize = Object.keys(selectSize).filter(key => selectSize[key] == true );
    setPostData(pre => ({ ...pre, color: finalColor, size:finalSize }))
    console.log(postData)
  }
  function postDataFunc(){
    axios.post(api, postData).then((res)=>{
      console.log(res)
    }).catch(err => console.log(err))
  }



  return (
    <div className='login_form'>
      {/* =================[Name]=============================== */}
      <input onChange={handleInputs} type="text" name='name' placeholder='name' />
      {/* =================[detailed]============================ */}
      <input onChange={handleInputs} type="text" name='detailed_description' placeholder='detailed_description' />
      {/* =================[names]=============================== */}
      <input onChange={handleInputs} type="text" name='names' placeholder='names' />
      {/* =================[discount %]========================== */}
      <input onChange={handleInputs} type="text" name='price' placeholder='price' />
      {/* =================[price]=============================== */}
      <input onChange={handleInputs} type="text" name='discount' placeholder='discount' />
      {/* =================[price after discount]================ */}
      <input onChange={handleInputs} type="text" name='priceAfterDiscount' placeholder='priceAfterDiscount'
        value={parseInt(postData.price - (postData.price * postData?.discount / 100))} />
      {/* =================[about]================ */}
      <input onChange={handleInputs} type="text" name='about' placeholder='about' />
      {/* ==================[Category]========================== */}
      <label>Shoe Category:</label>
      <select name="category" onChange={(e) => setInputCategory(e.target.value)}>
        <option value="men">Men</option>
        <option value="women">Women</option>
        <option value="kids">Kids</option>
      </select><br />
      {/* ====================[Type]============================ */}
      <label>Shoe Type:</label>
      <select name="shoes">
        {category[inputCategory].map((val) => <option key={val} value={val}>{val}</option>)}
      </select><br />
      {/* ====================[Color]=========================== */}
      <label>Shoe Color:</label>
      {colors.map((color, index) => (
        <>
          <label htmlFor={color} className={`colors ${(selectColor[color]) ? ("checked") : ("not-checked")}`}>{color} </label>
          <input name={color} key={index} id={color} onChange={handleColorChange}
            type="checkbox" value={color} hidden />
        </>
      ))}<br />
      {/* ========================[Size]======================== */}
      <label>Shoe Size:</label>
      {sizes.map((size, index) => (
        <>
          <label htmlFor={size} className={`sizes ${(selectSize[size]) ? ("checked") : ("not-checked")}`}>{size} </label>
          <input name={size} key={index} id={size} onChange={handleSizeChange}
            type="checkbox" value={size} hidden />
        </>
      ))}
      <br />
      <button onClick={confirmChanges}>Confirm</button>
      <button onClick={postDataFunc}>Post data</button>

    </div>
  )
}

export default AdminPanel