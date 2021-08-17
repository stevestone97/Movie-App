import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { fetchUpcoming } from "../../../Services";
import MovieItem from "../Movies/movie-item";

function LatestSlide() {
  const [upcoming, setupcoming] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setupcoming(await fetchUpcoming());
    };
    fetchAPI();
  }, []);

  const upcomingItem = upcoming
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
      <h2>Upcomings</h2>
      <Carousel
        infinite={true}
        autoPlay={false}
        arrows={true}
        autoPlaySpeed={5000}
        transitionDuration={500}
        responsive={responsive}
      >
        {upcomingItem}
      </Carousel>
    </div>
  );
}

export default LatestSlide;
