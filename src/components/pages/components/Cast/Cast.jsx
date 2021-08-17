import React from "react";
import Styles from "./Cast.module.css";
import { Link } from "react-router-dom";

function Cast(props) {
  const cast = props.c;
  const acterURL = `/name/${cast.id}`;
  const defultStyle = {
    textDecoration: "none",
  };
  return (
    <div>
      {!cast.img.includes("null") && (
        <div className={Styles.cast__wrapper}>
          <Link to={acterURL}>
            <img
              className={Styles.cast__img}
              src={cast.img}
              alt={cast.name}
            ></img>
          </Link>

          <div className={Styles.name__character}>
            <Link style={defultStyle} to={acterURL}>
              <p className={Styles.cast__name}>{cast.name}</p>
            </Link>
            <p className={Styles.cast__character}>{cast.character}</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default Cast;
