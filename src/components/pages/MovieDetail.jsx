import React, { useState, useEffect } from "react";
import Styles from "./css/MovieDetail.module.css";
import MovieItem from "../MainContent/Movies/movie-item";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ReactPlayer from "react-player";
import Review from "./components/Review/Review";
import Cast from "./components/Cast/Cast";
import ReviewInput from "./components/Review_input/Review_input";
import {
  fetchMovieDetail,
  fetchMovieVideos,
  fetchCasts,
  fetchSimilarMovie,
  fetchReviews,
  fetchMoviebackdrops,
} from "../../Services";
import MovieInfo from "./components/Movie_info/Movie_info";

function MovieDetail({ match }) {
  let params = match.params;
  let genres = [];
  const [reviewActive, setReviewActive] = useState(false);
  const [detail, setDetail] = useState([]);
  const [video, setVideo] = useState([]);
  const [casts, setCasts] = useState([]);
  const [backdrops, setBackdrops] = useState([]);
  const [reviwes, setReviews] = useState([]);
  const [similarMovie, setSimilarMovie] = useState([]);

  const youtubeUrl = "https://www.youtube.com/watch?v=";
  const reviewAlt = (
    <p className={Styles.reviewAlt}>There are currently no reviews</p>
  );
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
  };

  useEffect(() => {
    const fetchAPI = async () => {
      setDetail(await fetchMovieDetail(params.id));
      setVideo(await fetchMovieVideos(params.id));
      setCasts(await fetchCasts(params.id));
      setBackdrops(await fetchMoviebackdrops(params.id));
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
    return <Cast key={i} c={c} />;
  });
  const backdropsList = backdrops.map((b, i) => {
    return (
      <div key={i}>
        <img className={Styles.movie_backdrops} src={b.backPoster} />
      </div>
    );
  });
  const reviewList = reviwes.map((r, i) => {
    return <Review key={i} r={r} />;
  });
  const similarMovieList = similarMovie.slice(0, 10).map((item, index) => {
    return <MovieItem key={index} item={item} />;
  });

  return (
    <div>
      <div className={Styles.movie_detail}>
        <section>
          {/* Trailer */}
          <ReactPlayer
            controls={true}
            playing={false}
            url={youtubeUrl + video.key}
            height="70vh"
            width="100vw"
          ></ReactPlayer>
          {/* Movie Info */}
          <MovieInfo detail={detail} genreList={genresList} />
          <hr />
        </section>
        <section>
          {/* Cast */}
          <div className={Styles.component}>
            <h2>Top cast</h2>
            <div className={Styles.castList}>
              {castList.slice(0, 9)}
              {castList.length > 9 && (
                <button className={Styles.cast_more_btn}>
                  View More <i class="fas fa-arrow-right" />
                </button>
              )}
            </div>
          </div>
          {/* Media */}
          <div className={Styles.component}>
            <div style={{ display: "flex" }} className={Styles.component}>
              <h2 style={{ width: "200px" }}>Media</h2>
              <button className={Styles.media__btn}>Videos</button>
              <button className={Styles.media__btn}>BackDrops</button>
              <button className={Styles.media__btn}>Posters</button>
            </div>
            <Carousel
              showDots={false}
              renderDotsOutside={true}
              responsive={responsive}
            >
              {backdropsList}
            </Carousel>
          </div>
          {/* Review List */}
          <div className={Styles.component}>
            <h2>Reviews</h2>
            <div className={Styles.review__flex}>
              {reviewList.length === 0
                ? reviewAlt
                : reviewActive
                ? reviewList
                : reviewList.slice(0, 3)}
              {reviewList.length > 3 && (
                <button
                  className={Styles.more__btn}
                  onClick={() => setReviewActive(!reviewActive)}
                >{`View ${reviewActive ? "Less" : "More"}`}</button>
              )}
            </div>
          </div>
          {/* Review Input */}
          <div className={Styles.component}>
            <h2>Write a Review</h2>
            <ReviewInput key={detail.id} />
          </div>
        </section>
        <hr />
        {/* Similar Movies  */}
        <div className={Styles.component}>
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
