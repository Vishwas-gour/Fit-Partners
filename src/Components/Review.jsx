/* eslint-disable react/prop-types */

import { message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "./css/review.css"
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { starPrintForReviews } from '../Functions/starPrint';

import { FaStar } from "react-icons/fa"
import StarAvg from './StarAvg';

import e1 from '../img/emoji1.gif';
import e2 from '../img/emoji2.gif';
import e3 from '../img/emoji3.gif';
import e4 from '../img/emoji4.gif';
import e5 from '../img/emoji5.gif';
import se1 from '../img/starEmoji.gif';

function Review({ id }) {
  const [input, setInput] = useState({});
  const [reviews, setReviews] = useState([]);
  const [likeDislike, setLikeDislike] = useState(0);
  const [onClick, setOnClick] = useState(0);
  const [onHover, setOnHover] = useState(0);
  const currentUser = useSelector((state) => state.cartSlice.currentUser);
  const gmail = (currentUser) ? (currentUser.gmail) : ("Guest");

  id = +id;
  // ==================== INITIAL RENDERING
  const api = `http://localhost:3000/review`;
  function loadReviews() {
    const otherReviews = `http://localhost:3000/review/?productId=${id}`;
    axios.get(otherReviews).then((res) => {
      setReviews(res.data)
    }
    ).catch((err) => console.error("Error => :", err));
  }

  useEffect(() => {
    loadReviews();
  }, [id]);
  
  useEffect(() => {
    allReviews();
  });


  function printEmoji() {
    if (onHover === 0) return <img src={se1} alt="not found" />;
    if (onHover === 1) return <img src={e1} alt="not found" />;
    if (onHover === 2) return <img src={e2} alt="not found" />;
    if (onHover === 3) return <img src={e3} alt="not found" />;
    if (onHover === 4) return <img src={e4} alt="not found" />;
    if (onHover === 5) return <img src={e5} alt="not found" />;
  }

  // ==================== COLOR THE RATING STARS
  function colorTheStars() {
    return (
      <div className='star-emoji-sec'>
        <div className="star5">
          {[...Array(5)].map((_, indx) => {
            return (

              <FaStar key={indx}
                className={(indx < onHover) ? (`coloredStar`) : ((`notColored`))}
                onClick={() => setOnClick(indx + 1)}
                onMouseOver={() => setOnHover(indx + 1)}
                onMouseOut={() => setOnHover(onClick)} />
            )
          })
          }
        </div>
        <div className='emojis'>{printEmoji()}</div>   {/* 😍🥰🥲😥😡😊*/}
      </div>
    );
  }
  // ==================== POST MY REVIEW
  function postData() {
    if (!currentUser) {
      message.info("You need to log in to continue.")
      return;
    }
    if (!input.comment) {
      message.warning("All fields are required")
      return
    } else if (onClick === 0) {
      message.warning("Rating required")
      return;
    }
    axios.post(api, { ...input, gmail: currentUser.gmail, productId: id, "like": 0, "dislike": 0, star: onClick }).then(() => {
      message.success("Thank you for your review");
      loadReviews();
      setInput({});
      setOnClick(0);
      setOnHover(0);

    }).catch((err) => console.error("Error =>:", err));
  }
  // ==================== HANDLE MY REVIES
  function handleSubmit(e) {
    const value = e.target.value;
    const name = e.target.name;
    setInput((prev) => ({ ...prev, [name]: value }));
  }

  // ==================== MANAGE LIKE/DISLIKE
  function likeDislikeFunct(e, check) {
    
    if (check == likeDislike) {
      e.target.style.color = "black"
      setLikeDislike(0)
      return;
    }

    if (check == 1) {
      e.target.style.color = "blue"
      setLikeDislike(1)
    }
    else if (check == -1) {
      e.target.style.color = "red"
      setLikeDislike(-1)
    }

  }
  // ==================== SHOW CURRENT I'D REVIES
  function allReviews() {
    if(reviews.length == 0 ) return <h1  className='no-item'>No Reviews Yet </h1>
    return reviews.map((review) => {
      return (
        <div key={review.id} className='review-container'>
          <div className='r1'>
            <div className='r-name'><b>{review.gmail}</b></div>
            {starPrintForReviews(review.star)}
          </div >
          <div className='r-comment'>Review : {review.comment}</div>
          <div className='like'>
            <BiLike onClick={(e) => likeDislikeFunct(e, 1)} /> {review.like}
            <BiDislike onClick={(e) => likeDislikeFunct(e, -1)} /> {review.dislike}
            <input type="text" placeholder='Reply' />
          </div>
        </div>
      )
    });
  }
  // ==================== STAR AND THEIR COLORS

  // ==================== COMPONENT RETURN VALUE
  return (
    (
      <>
        <div className="reviews" style={{ padding: "4rem" }}>

          <div className='my-review'>
            <div>Review </div>
            Gmail: <input type="text" value={gmail} name='gmail' /> <br />
            Comment: <input type="text" value={input.comment || ""} name='comment' onChange={(e) => handleSubmit(e)} /> <br />
            <div className='colorTheStars'>
              {colorTheStars()}
            </div>
            {/* Star: <input type="number" value={input.star} name='star' onChange={handleSubmit} /> <br /> */}
            <button onClick={postData}>Post</button>
          </div>


          {/* =======================[ RIGHT-SIDE ]============================= */}
          <div className='all-review'>
            <div className='all-review-heading'>
              All reviews
              <StarAvg id={id} />
            </div>
            {allReviews()}
          </div>
        </div>
        {/* <div className='related-products'></div> */}
      </>
    )
  );
}
export default Review;
