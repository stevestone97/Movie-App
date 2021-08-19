import React, { useState } from "react";
import { Link } from "react-router-dom";
import Styles from "./css/Movie-item.module.css";

function MovieItem(props) {
  const [info, setInfo] = useState(false);
  const movieUrl = `/movie/${props.item.id}`;
  const defultStyle = { textDecoration: "none" };

  return (
    <div className={Styles.wrapper}>
      <Link to={movieUrl}>
        <img
          src={props.isLargeRow ? props.item.poster : props.item.backPoster}
          alt={props.item.title || props.item.name || props.item.original_name}
        />
      </Link>
      <div className={Styles.flex}>
        <div>
          <Link style={defultStyle} to={movieUrl}>
            <h2>
              {props.item.title || props.item.name || props.item.original_name}
            </h2>
          </Link>
        </div>
        <div>
          <button
            onClick={() => setInfo(!info)}
            type="button"
            className={Styles.info_btn}
          >
            <i class="fas fa-angle-down"></i>
          </button>
        </div>
      </div>
      <div className={info ? Styles.info_active : Styles.info_hidden}>
        <p>{props.item.overview?.substring(0, 200)}...</p> <br />
        <Link style={defultStyle} to={movieUrl}>
          <h4>
            More about the movie <i class="fas fa-arrow-right"></i>
          </h4>
        </Link>
      </div>
    </div>
  );
}
export default MovieItem;
