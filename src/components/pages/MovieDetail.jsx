import React, { useState, useEffect } from "react";
import Styles from "./css/MovieDetail.module.css";
import MovieItem from "../MainContent/Movies/movie-item";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
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
  fetchMoviePoster,
} from "../../Services";
import MovieInfo from "./components/Movie_info/Movie_info";
import ReactvideoPlayer from "./components/ReactPlayer/ReactPlayer";

function MovieDetail({ match }) {
  let params = match.params;
  let genres = [];
  const [reviewActive, setReviewActive] = useState(false);
  const [videoMedia, setVideoMedia] = useState(true);
  const [backdrop, setBackdrop] = useState(false);
  const [poster, setposter] = useState(false);
  const [detail, setDetail] = useState([]);
  const [video, setVideo] = useState([]);
  const [casts, setCasts] = useState([]);
  const [backdrops, setBackdrops] = useState([]);
  const [posters, setPosters] = useState([]);
  const [reviwes, setReviews] = useState([]);
  const [similarMovie, setSimilarMovie] = useState([]);

  const reviewAlt = (
    <p className={Styles.reviewAlt}>There are currently no reviews</p>
  );
  const mediaAlt = (
    <p className={Styles.reviewAlt}>There are currently no Photos</p>
  );
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
  };
  const responsiveVideoPlayer = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
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
    return <Cast key={i} c={c} />;
  });
  const videoList = video.map((v, i) => {
    return <ReactvideoPlayer key={i} v={v} />;
  });
  const backdropsList = backdrops.map((b, i) => {
    return (
      <div key={i}>
        <img className={Styles.movie_backdrops} src={b.backPoster} />
      </div>
    );
  });
  const postersList = posters.map((p, i) => {
    return (
      <div key={i}>
        <img className={Styles.movie_posters} src={p.poster} />
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
          {/* Movie Info */}
          <MovieInfo detail={detail} genreList={genresList} />
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
          <div className={Styles.Media}>
            <div style={{ display: "flex" }} className={Styles.component}>
              <h2 className={Styles.media__title}>Media</h2>
              <button
                className={Styles.media__btn}
                onClick={() => {
                  setVideoMedia(true);
                  setBackdrop(false);
                  setposter(false);
                }}
              >
                Videos({video.length})
              </button>
              <button
                className={Styles.media__btn}
                onClick={() => {
                  setVideoMedia(false);
                  setBackdrop(true);
                  setposter(false);
                }}
              >
                BackDrops({backdropsList.length})
              </button>
              <button
                className={Styles.media__btn}
                onClick={() => {
                  setVideoMedia(false);
                  setBackdrop(false);
                  setposter(true);
                }}
              >
                Posters({postersList.length})
              </button>
            </div>

            <Carousel responsive={responsiveVideoPlayer}>
              {videoMedia && videoList}
            </Carousel>
            <div className={Styles.media__scroller}>
              {backdrop
                ? backdropsList.length === 0
                  ? mediaAlt
                  : backdropsList.slice(0, 7)
                : null}
              {backdrop && backdropsList.length > 7 && (
                <button className={Styles.cast_more_btn}>
                  View More <i class="fas fa-arrow-right" />
                </button>
              )}
            </div>
            <div className={Styles.media__scroller}>
              {poster
                ? postersList.length === 0
                  ? mediaAlt
                  : postersList.slice(0, 15)
                : null}
              {poster && postersList.length > 15 && (
                <button className={Styles.cast_more_btn}>
                  View More <i class="fas fa-arrow-right" />
                </button>
              )}
            </div>
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
