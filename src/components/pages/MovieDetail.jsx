import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Styles from "./css/MovieDetail.module.css";
import MovieItem from "../MainContent/Movies/movie-item";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ReactPlayer from "react-player";
import ReactStars from "react-rating-stars-component";
import {
  fetchMovieDetail,
  fetchMovieVideos,
  fetchCasts,
  fetchSimilarMovie,
  fetchReviews,
  fetchMoviebackdrops,
  fetchMoviePoster,
} from "../../Services";

function MovieDetail({ match }) {
  let params = match.params;
  let genres = [];
  const [backdropsSlide, setBackdropsSlide] = useState(false);
  const [postersSlide, setPostersSlide] = useState(false);
  const [review, setReview] = useState(false);
  const [reviewActive, setReviewActive] = useState(false);
  const [detail, setDetail] = useState([]);
  const [video, setVideo] = useState([]);
  const [casts, setCasts] = useState([]);
  const [backdrops, setBackdrops] = useState([]);
  const [posters, setPosters] = useState([]);
  const [reviwes, setReviews] = useState([]);
  const [similarMovie, setSimilarMovie] = useState([]);

  const youtubeUrl = "https://www.youtube.com/watch?v=";
  const avatar =
    "https://png.pngitem.com/pimgs/s/10-109819_my-account-my-account-icon-transparent-hd-png.png";
  const posterUrl = "https://image.tmdb.org/t/p/original/";
  const star = (
    <i style={{ color: "gold", marginRight: "5px" }} class="fa fa-star" />
  );
  const reviewAlt = (
    <p style={{ marginTop: "15px" }} className={Styles.content}>
      There are currently no reviews
    </p>
  );
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
  };
  const responsiveBackdrops = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
  };
  const responsivePosters = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 10,
    },
  };
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  useEffect(() => {
    const fetchAPI = async () => {
      setDetail(await fetchMovieDetail(params.id));
      setVideo(await fetchMovieVideos(params.id));
      setCasts(await fetchCasts(params.id));
      setBackdrops(await fetchMoviebackdrops(params.id));
      setPosters(await fetchMoviePoster(params.id));
      setSimilarMovie(await fetchSimilarMovie(params.id));
      setReviews(await fetchReviews(params.id));
    };

    fetchAPI();
  }, [params.id]);

  genres = detail.genres;
  let genresList;
  if (genres) {
    genresList = genres.map((g, i) => {
      return (
        <li key={i}>
          <button type="button">{g.name}</button>
        </li>
      );
    });
  }

  const castList = casts.map((c, i) => {
    return (
      <div>
        {(c.img || !c.img.includes("null")) && (
          <div className={Styles.cast__wrapper} key={i}>
            <Link to={`/name/${c.id}`}>
              <img className={Styles.cast__img} src={c.img} alt={c.name}></img>
            </Link>

            <div style={{ marginTop: "15px", marginLeft: "10px" }}>
              <Link style={{ textDecoration: "none" }} to={`/name/${c.id}`}>
                <p className={Styles.cast__name}>{c.name}</p>
              </Link>
              <p className={Styles.cast__character}>{c.character}</p>
            </div>
          </div>
        )}
      </div>
    );
  });
  const backdropsList = backdrops.map((b, i) => {
    return (
      <div key={i}>
        <img
          style={{
            width: "100%",
            height: "100%",
            minHeight: "300px",
            objectFit: "cover",
            padding: "4px",
          }}
          src={b.backPoster}
        />
      </div>
    );
  });
  const postersList = posters.map((b, i) => {
    return (
      <div key={i}>
        <img
          style={{
            width: "100%",
            minHeight: "200px",
            height: "100%",
            objectFit: "cover",
            padding: "4px",
          }}
          src={b.poster}
        />
      </div>
    );
  });
  // console.log(posters);
  const reviewList = reviwes.map((r, i) => {
    return (
      <div className={Styles.review__wrapper} key={i}>
        <div className={Styles.review}>
          <div>
            <img className={Styles.avatar} src={avatar} />
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1 className={Styles.username}>{r.author.username}</h1>
              <p className={Styles.rating}>
                {r.author.rating != null && star}
                {r.author.rating != null &&
                  parseFloat(r.author.rating).toFixed(1)}
              </p>
            </div>
            <p className={Styles.created}>{r.created.substring(0, 10)}</p>
          </div>
        </div>

        <p className={Styles.content}>
          {review ? r.content : r.content.substring(0, 400)}
          {r.content.length > 400 && "..."}
          {r.content.length > 400 && (
            <button
              className={Styles.more__btn}
              onClick={(e) => setReview(!review)}
            >
              {`Show ${review ? "Less" : "More"}`}
            </button>
          )}
        </p>
      </div>
    );
  });
  const similarMovieList = similarMovie.slice(0, 10).map((item, index) => {
    return <MovieItem key={index} item={item} />;
  });

  return (
    <div>
      <div className={Styles.movie_detail}>
        {/* Trailer */}
        <ReactPlayer
          controls={true}
          playing={false}
          url={youtubeUrl + video.key}
          height="70vh"
          width="100vw"
        ></ReactPlayer>

        {/* Movie Info */}
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
            <p className={Styles.genre}>{genresList}</p>
          </div>
        </div>
        <hr />

        <section>
          {/* Cast */}
          <div className="top-picks">
            <h2>Top cast</h2>
            <div className={Styles.castList}>
              {castList.slice(0, 9)}
              {castList.length > 9 && (
                <button
                  style={{
                    textDecoration: "none",
                    minWidth: "100px",
                    padding: "5px",
                  }}
                  className={Styles.more__btn}
                >
                  View More <i class="fas fa-arrow-right" />
                </button>
              )}
            </div>
          </div>

          {/* Media */}
          <div>
            <div style={{ display: "flex" }} className="top-picks">
              <h2 style={{ width: "200px" }}>Media</h2>
              <button className={Styles.media__btn}>Videos</button>
              <button
                onClick={() => setBackdropsSlide(true)}
                className={Styles.media__btn}
              >
                BackDrops
              </button>
              <button
                onClick={() => setPostersSlide(true)}
                className={Styles.media__btn}
              >
                Posters
              </button>
            </div>
            {backdropsSlide && (
              <Carousel
                showDots={false}
                renderDotsOutside={true}
                responsive={responsiveBackdrops}
              >
                {backdropsList}
              </Carousel>
            )}
          </div>

          {/* Review List */}
          <div className="top-picks">
            <h2>Reviews</h2>
            <div className={Styles.review__flex}>
              <div style={{ marginLeft: "15px" }}>
                {reviewList.length === 0
                  ? reviewAlt
                  : reviewActive
                  ? reviewList
                  : reviewList.slice(0, 3)}
              </div>
              <div>
                {reviewList.length > 3 && (
                  <button
                    style={{ marginRight: "50px" }}
                    className={Styles.more__btn}
                    onClick={() => setReviewActive(!reviewActive)}
                  >{`View ${reviewActive ? "Less" : "More"}`}</button>
                )}
              </div>
            </div>
          </div>

          {/* Review Input */}
          <div className="top-picks">
            <h2>Write a Review</h2>
            <div className={Styles.rating__star}>
              <h3 style={{ marginRight: "5px" }}>Rating: </h3>
              <ReactStars
                key={detail.id}
                count={10}
                onChange={ratingChanged}
                isHalf={true}
                size={24}
                activeColor="#ffd700"
              />
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
          <hr />
        </section>

        {/* Similar Movies  */}
        <div className="top-picks">
          <h2>Similar</h2>
          <Carousel
            containerClass="carousel-container"
            dotListClass="dots"
            showDots={false}
            renderDotsOutside={true}
            responsive={responsive}
          >
            {similarMovieList}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
