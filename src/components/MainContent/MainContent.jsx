import React from "react";
import FeaturedSlide from "./Featured/FeaturedSlide";
import LatestSlide from "./Latest/LatestSlide";
import MovieSlide from "./Movies/movie-slide";
import Popular from "./Popular/popular";

function MainContent() {
  return (
    <div>
      <FeaturedSlide />
      <LatestSlide />
      <MovieSlide />
      <Popular />
    </div>
  );
}

export default MainContent;
