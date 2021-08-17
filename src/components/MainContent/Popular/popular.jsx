import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { fetchpopular } from "../../../Services";
import MovieItem from "../Movies/movie-item";

function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setPopular(await fetchpopular());
    };
    fetchAPI();
  }, []);

  const trendingPersons = popular
    .slice(0, 6)
    .map((item, index) => <MovieItem key={index} item={item} isLargeRow />);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
  };
  return (
    <div className="top-picks">
      <h2>Popular this week</h2>
      <Carousel
        infinite={true}
        autoPlay={false}
        arrows={true}
        autoPlaySpeed={5000}
        transitionDuration={500}
        responsive={responsive}
      >
        {trendingPersons}
      </Carousel>
    </div>
  );
}

export default Popular;
