import React, { useState, useEffect } from "react";
import "./css/MovieSlide.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieItem from "./movie-item";
import { fetchTopratedMovie } from "../../../Services";

function MovieSlide() {
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setTopRated(await fetchTopratedMovie());
    };
    fetchAPI();
  }, []);
  const movieItems = topRated
    .slice(0, 25)
    .map((item, index) => <MovieItem key={index} item={item} isLargeRow />);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
  };

  return (
    <div className="top-picks">
      <h2>Top Picks </h2>
      <div className="top-picks-wrapper">
        <Carousel
          containerClass="carousel-container"
          dotListClass="dots"
          showDots={false}
          renderDotsOutside={true}
          responsive={responsive}
        >
          {movieItems}
        </Carousel>
      </div>
    </div>
  );
}

export default MovieSlide;
