import React from "react";
import Styles from "./Review_input.module.css";
import ReactStars from "react-rating-stars-component";

function ReviewInput(props) {
  return (
    <div>
      <div className={Styles.rating__star}>
        <h3 style={{ marginRight: "5px" }}>Rating: </h3>
        <ReactStars count={10} isHalf={true} size={24} activeColor="#ffd700" />
      </div>
      <form className={Styles.reviews__wrapper}>
        <textarea
          className={Styles.review__input}
          placeholder="Write a review..."
          name="review"
          id="review"
          required={true}
        ></textarea>
        <button className={Styles.review__btn}>Submit</button>
      </form>
    </div>
  );
}

export default ReviewInput;
