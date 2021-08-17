import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Styles from "./css/Featured-item.module.css";
import FeaturedItem from "./Featured-item";
import { fetchMovies } from "../../../Services";
import "./css/slideDots.css";

function FeaturedSlide() {
  const [nowPlaying, setNowPlaying] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setNowPlaying(await fetchMovies());
    };
    fetchAPI();
  }, []);

  const movieItems = nowPlaying
    .slice(0, 12)
    .map((item, index) => <FeaturedItem key={index} item={item} />);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
  };

  return (
    <div className={Styles.wrapper}>
      <Carousel
        containerClass="carousel-container"
        infinite={true}
        autoPlay={true}
        arrows={false}
        showDots={true}
        renderDotsOutside={false}
        dotListClass="custom-dot"
        autoPlaySpeed={8000}
        transitionDuration={500}
        responsive={responsive}
      >
        {movieItems}
      </Carousel>
    </div>
  );
}

export default FeaturedSlide;
