import React from "react";
import { Link } from "react-router-dom";
import Styles from "./css/Featured-item.module.css";

function FeaturedItem(props) {
  const movieurl = `/movie/${props.item.id}`;

  return (
    <div className={Styles.wrapper} key={props.key}>
      <img className={Styles.backPoster} src={props.item.backPoster} />
      <div className={Styles.info_wrapper}>
        <div>
          <h3>
            {props.item?.title || props.item?.name || props.item?.original_name}
          </h3>
          <h4>
            IMDb score: <i class="fas fa-star"></i> {props.item.rating}
          </h4>
        </div>

        <p className={Styles.overview}>
          {props.item.overview.length > 150
            ? `${props.item.overview.substring(0, 150)}...`
            : props.item.overview}
        </p>
        <Link style={{ textDecoration: "none" }} to={movieurl}>
          <button className={Styles.play_btn}>
            <i class="fas fa-play"></i>
            <p> PLAY</p>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default FeaturedItem;
