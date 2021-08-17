import React, { useState } from "react";
import Styles from "./Review.module.css";

function Review(props) {
  const [review, setReview] = useState(false);
  const star = (
    <i style={{ color: "gold", marginRight: "5px" }} class="fa fa-star" />
  );
  const info = props.r;
  const author = props.r.author;
  //   Temporary avatar
  const avatar =
    "https://png.pngitem.com/pimgs/s/10-109819_my-account-my-account-icon-transparent-hd-png.png";

  return (
    <div className={Styles.review__wrapper} key={props.key}>
      <div className={Styles.review}>
        <div>
          <img className={Styles.avatar} src={avatar} />
        </div>
        <div>
          <div className={Styles.username__rating}>
            <h1 className={Styles.username}>{author.username}</h1>
            <p className={Styles.rating}>
              {author.rating != null && star}
              {author.rating != null && parseFloat(author.rating).toFixed(1)}
            </p>
          </div>
          <p className={Styles.created}>{info.created.substring(0, 10)}</p>
        </div>
      </div>

      <p className={Styles.content}>
        {review ? info.content : info.content.substring(0, 400)}
        {info.content.length > 400 && "..."}
        {info.content.length > 400 && (
          <button
            className={Styles.more__btn}
            onClick={() => setReview(!review)}
          >
            {`Show ${review ? "Less" : "More"}`}
          </button>
        )}
      </p>
    </div>
  );
}

export default Review;
