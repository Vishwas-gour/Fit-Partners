import { useEffect, useState } from 'react'
import '../Pages/css/login.css'
import './css//postData.css'
import axios from 'axios'
import { message } from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'
function PostUpdate() {
  const { id } = useParams();
  // -1 id Referce to DATA IS POSTING 
  // ID != -1 Referce to DATA IS UPDATING
  const navigate = useNavigate();
  let [postData, setPostData] = useState({ "quantity": 1, "noOfReviews": 0, "rating": 0, "category": "men", "shoeType": "sneakers" })
  let [selectImgPost, setSelectImgPost] = useState(0);
  let [selectColor, setSelectColor] = useState({ "Red": false, "Green": false, "Blue": false, "Yellow": false, "Black": false, "White": false, "Brown": false })
  let [selectSize, setSelectSize] = useState({ "6": false, "7": false, "8": false, "9": false, "10": false, "5": false });
  const api = `http://localhost:3000/products`;

  const colors = ["Red", "Green", "Blue", "Yellow", "Black", "White", "Brown"];
  const sizes = [5, 6, 7, 8, 9, 10, 11];

  const category = {
    "men": ["sneakers", "boots", "loafers", "sandals", "running", "formal", "slippers"],
    "women": ["heels", "flats", "boots", "sneakers", "sandals", "wedges", "slippers"],
    "kids": ["boots", "sneakers", "sandals", "slippers", "sports"]
  };

  // ===============[IF U WANT TO UPDATE DATA]===============
  function getData() {
    axios.get(`${api}/${id}`).then((res) => {
      setPostData(res.data)
      res.data.sizeRange.map(key => {
        setSelectSize(pre => ({ ...pre, [key]: true }))
      });

      res.data.colors.map(key => {
        setSelectColor(pre => ({ ...pre, [key]: true }))
      });

    })
  }
  useEffect(() => {
    if (id != -1) getData();
  }, [id]);
  // ================================================


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

  function postDataFunc(e) {
    e.preventDefault();
    let finalColor = Object.keys(selectColor).filter(key => selectColor[key] == true);
    let finalSize = Object.keys(selectSize).filter(key => selectSize[key] == true);
    let priceAfterDiscount = parseInt(postData.price - (postData.price * postData?.discount / 100))

    if (finalColor.length == 0 || finalSize.length == 0 || postData.name == "" ||
      postData.price == "" || postData.imgUrl == "" || postData.about == "" ||
      postData.detailed_description == "" || postData.category == "" || postData.names == "" ||
      postData.shoeType == "" || !postData.shoeType) {
      message.error("All fields Required")
      return
    }

    let updatedData = {
      ...postData,
      colors: finalColor,
      sizeRange: finalSize,
      priceAfterDiscount,
    };
    if (id == -1) {
      axios.post(api, updatedData).then(() => {
        message.success("data successfully posted")
      }).catch(err => console.log(err));
    }
    else {
      axios.put(`${api}/${id}`, updatedData).then(() => {
        message.success("datasuccessfully upadted")
        navigate(`/detailedProduct/${id}`)
      }).catch(err => console.log(err));
    }
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
    <div className='login_form crud_form'>

      <div className='sec-part'>
        <label className="label-tag" htmlFor=""> Product Name </label>
        <input onChange={handleInputs} type="text" value={postData.name} name='name' placeholder='Enter name' />
      </div>

      <div className='sec-part'>
        <label className="label-tag" htmlFor="">Full Description</label>
        <input onChange={handleInputs} type="text" value={postData.detailed_description} name='detailed_description' placeholder='Enter Description' />
      </div>

      <div className='sec-part'>
        <label className="label-tag" htmlFor="">User Can Seach By</label>
        <input onChange={handleInputs} type="text" value={postData.names} name='names' placeholder='Enter Names' />
      </div>

      <div className='sec-part'>
        <label className="label-tag" htmlFor="">Original Price</label>
        <div >
          <input onChange={handleInputs} type="text" value={postData.price} name='price' placeholder='Enter Price' />
          <input onChange={handleInputs} type="text" value={postData.discount} name='discount' placeholder='Discount On Price' />
        </div>
      </div>

      <div className='sec-part'>
        <label className="label-tag" htmlFor="">About Product</label>
        <input onChange={handleInputs} type="text" value={postData.about} name='about' placeholder='About Product' />
      </div>
      {/* ==============================[IMAGE]============================== */}
      {(selectImgPost == 0) ? (
        <div className='sec-part'>
         <label className="label-tag url-taggle" onClick={() => setSelectImgPost(1)}><Link>Choose Image</Link></label>
          <input onChange={handleInputs} type="text" name='imgUrl' placeholder='Image url' value={postData.imgUrl} />
        </div>
      ) : (

        <div className='sec-part'>
             <label className="label-tag url-taggle" onClick={() => setSelectImgPost(0)}><Link>Enter Url</Link></label>
          <input onChange={makeURL} type="file" name='imgUrl' />
        </div>

      )}
      <div className='sec-part'>
        <label className="label-tag">Shoe Type:</label>
        <div>
          <select name="category" onChange={handleInputs} value={postData.category}>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
          <select name="shoeType" onChange={handleInputs} value={postData.shoeType}>
            {category[postData.category].map((val) => <option key={val} value={val}>{val}</option>)}
          </select>
        </div>
      </div>
      {/* ====================[Color]=========================== */}
      <div className='sec-part '>
        <label className="label-tag">Shoe Color:</label>
        <div className='color-size-sec'>
          {colors.map((color, index) => (
            <>
              <label  style = {{backgroundColor:color, color:color}}  htmlFor={color} className={`colors ${(selectColor[color]) ? ("checked") : ("not-checked")}`}> 0 </label>
              <input type="checkbox" name={color} key={index} id={color} onClick={handleColorChange}
                value={color} hidden />
            </>
          )

          )}
        </div>
      </div>
      {/* ========================[Size]======================== */}
      <div className='sec-part '>
        <label className="label-tag">Shoe Size:</label>
        <div className='color-size-sec'>
          {sizes.map((size, index) => (
            <>
              <label htmlFor={size} className={`sizes ${(selectSize[size]) ? ("checked") : ("not-checked")}`}>{size} </label>
              <input type="checkbox" name={size} key={index} id={size} onClick={handleSizeChange}
                value={size} hidden />
            </>
          ))}
        </div>
      </div>

      <button onClick={postDataFunc}>{(id == -1) ? ("Post data") : ("Update data")}</button>

    </div>
  )
}

export default PostUpdate