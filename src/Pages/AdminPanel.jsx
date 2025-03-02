/* eslint-disable no-unused-vars */
import { useState } from 'react'
import '../Pages/css/login.css'
import './css//admin.css'
import axios from 'axios'
import { message } from 'antd'
function AdminPanel() {
  let [postData, setPostData] = useState({ "quantity": 1, "noOfReviews": 0, "rating": 0 })
  let [inputCategory, setInputCategory] = useState("men");
  let [selectImgPost, setSelectImgPost] = useState(-1);
  let [selectColor, setSelectColor] = useState({ "Red": false, "Green": false, "Blue": false, "Yellow": false, "Black": false, "White": false })
  let [selectSize, setSelectSize] = useState({ "6": false, "7": false, "8": false, "9": false, "10": false, "5": false });
  const api = `http://localhost:3000/products`;

  const category = {
    "men": ["sneakers", "boots", "loafers", "sandals", "running"],
    "women": ["heels", "flats", "boots", "sandles"],
    "kids": ["sneakers", "boots", "sandals", "slions"]
  }
  const colors = ["Red", "Green", "Blue", "Yellow", "Black", "White"];
  const sizes = [5, 6, 7, 8, 9, 10];

  function handleColorChange(e) {
    const name = e.target.name;
    const checked = e.target.checked;
    setSelectColor(pre => ({ ...pre, [name]: checked }))
  }

  function handleSizeChange(e) {
    console.log("hello")
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

  function postDataFunc(e) {
    e.preventDefault();
    let finalColor = Object.keys(selectColor).filter(key => selectColor[key] == true);
    let finalSize = Object.keys(selectSize).filter(key => selectSize[key] == true);
    let priceAfterDiscount = parseInt(postData.price - (postData.price * postData?.discount / 100))

    if (finalColor.length == 0 || finalSize.length == 0 || postData.name == "" ||
      postData.price == "" || postData.imgUrl == "" || postData.about == "" ||
      postData.detailed_description == "" || postData.category == "" || postData.names == "" ||
      postData.shoeType == "" || !postData.shoeType
    ) {
      console.log(postData.shoeType)
      message.error("All fields Required")
      return
    }

    let updatedData = {
      ...postData,
      colors: finalColor,
      sizeRange: finalSize,
      priceAfterDiscount,
      category: inputCategory
    };
    console.log(updatedData)
    message.success("data posted")
    // axios.post(api, updatedData).then(() => {
    // }).catch(err => console.log(err))
  }




  function makeURL(e) {
    const file = e.target.files[0];
    console.log(file)
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => {
      setPostData(pre => ({ ...pre, "imgUrl": reader.result }))
    }
    reader.onerror = (error) => console.log(error);
  }

  return (
    <div className='login_form'>
      <form action="" onSubmit={postDataFunc}>
        <input onChange={handleInputs} type="text" value={postData.name} name='name' placeholder='name' />
        <input onChange={handleInputs} type="text" value={postData.detailed_description} name='detailed_description' placeholder='Full Description' />
        <input onChange={handleInputs} type="text" value={postData.names} name='names' placeholder='names' />
        <input onChange={handleInputs} type="text" value={postData.price} name='price' placeholder='price' />
        <input onChange={handleInputs} type="text" value={postData.discount} name='discount' placeholder='discount' />
        <input onChange={handleInputs} type="text" value={postData.about} name='about' placeholder='about' />
        {/* IMAGE============================== */}
        {(selectImgPost == 0) ? (<>
          <button onClick={() => setSelectImgPost(1)}>By Raw</button>
          <input onChange={handleInputs} type="text" name='imgUrl' placeholder='Image url' />
        </>) : (
          <>
            <button onClick={() => setSelectImgPost(0)}>By url</button>
            <input onChange={makeURL} type="file" name='imgUrl' />

          </>
        )}
        <label>Shoe Category:</label>
        <select name="category" onChange={(e) => setInputCategory(e.target.value)}>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select><br />
        {/* ====================[Type]============================ */}
        <label>Shoe Type:</label>
        <select name="shoeType" onChange={handleInputs}>
          <option value="">Select...</option>
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
        <button onClick={postDataFunc}>Post data</button>
      </form>
    </div>
  )
}

export default AdminPanel