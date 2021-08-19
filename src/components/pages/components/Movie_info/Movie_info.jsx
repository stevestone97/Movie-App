import React from "react";
import Styles from "./Movie_info.module.css";

function MovieInfo(props) {
  const detail = props.detail;
  const posterUrl = "https://image.tmdb.org/t/p/original/";
  const hr = detail.runtime / 60;
  const rhr = Math.round(hr);
  const min = (hr - rhr) * 60;
  const rmin = Math.round(min);
  const userScore = detail.vote_average * 10;
  const dotStyle = {
    fontSize: "6px",
    margin: "0 13px",
  };
  const ratingStyle =
    userScore >= 70
      ? { color: "green" }
      : userScore >= 40
      ? { color: "#FFC300" }
      : { color: "#D90909" };

  return (
    <div className={Styles.poster}>
      <img className={Styles.bg} src={posterUrl + detail.backdrop_path} />
      <div className={Styles.poster__description}>
        <img src={posterUrl + detail.poster_path} alt={detail.title} />
        <div className={Styles.details}>
          <div className={Styles.title_date}>
            <h1 className={Styles.title}>{detail.title}</h1>
            <p className={Styles.date}>({detail.release_date?.slice(0, 4)})</p>
          </div>
          <div className={Styles.rating_genre}>
            <p style={ratingStyle}>{`${userScore}%`}</p>
            <p className={Styles.rating}>User Score</p>
            <i style={dotStyle} class="fas fa-dot-circle" />
            <p className={Styles.genre}>{props.genreList}</p>
            <i style={dotStyle} class="fas fa-dot-circle" />
            <p>{`${rhr}h ${rmin}m`}</p>
          </div>
          <p className={Styles.overview}>{detail.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;
