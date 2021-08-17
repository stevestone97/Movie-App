import React from "react";
import Styles from "./Movie_info.module.css";

function MovieInfo(props) {
  const detail = props.detail;
  const posterUrl = "https://image.tmdb.org/t/p/original/";

  return (
    <div className={Styles.poster}>
      <div className={Styles.poster__description}>
        <img src={posterUrl + detail.poster_path} alt={detail.title} />
        <div style={{ padding: "10px" }}>
          <h1 className={Styles.title}>{detail.title}</h1>
          <p className={Styles.overview}>{detail.overview}</p>
        </div>
      </div>
      <div className={Styles.col__info}>
        <h3>Release date</h3>
        <p>{detail.release_date}</p>
        <h3>Run Time</h3>
        <p>{detail.runtime}min</p>
      </div>
      <div className={Styles.col__info}>
        <h3>IMDb Rating</h3>
        <p>{detail.vote_average} /10</p>
        <h3>Genres</h3>
        <p className={Styles.genre}>{props.genreList}</p>
      </div>
    </div>
  );
}

export default MovieInfo;
