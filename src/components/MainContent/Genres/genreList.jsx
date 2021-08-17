import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Styles from "./css/genreList.module.css";
import MovieItem from "../Movies/movie-item";
import {
  fetchGenre,
  fetchMovieByGenre,
  fetchActionMovies,
  fetchComedyMovies,
  fetchHorrorMovies,
  fetchRomanceMovies,
  fetchDocumatariesMovies,
} from "../../../Services";

function GenreList() {
  const [genres, setGenres] = useState([]);
  const [movieByGenre, setMovieByGenre] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);
  const [documatariesMovies, setDocumatariesMovies] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setGenres(await fetchGenre());
      setMovieByGenre(await fetchMovieByGenre());
      setActionMovies(await fetchActionMovies());
      setComedyMovies(await fetchComedyMovies());
      setHorrorMovies(await fetchHorrorMovies());
      setRomanceMovies(await fetchRomanceMovies());
      setDocumatariesMovies(await fetchDocumatariesMovies());
    };

    fetchAPI();
  }, []);

  const handleGenreClick = async (genre_id) => {
    setMovieByGenre(await fetchMovieByGenre(genre_id));
  };

  const genreList = genres.map((item, index) => {
    return (
      <div className={Styles.genre}>
        <li className={Styles.list_item} key={index}>
          <button
            type="button"
            onClick={() => {
              handleGenreClick(item.id);
            }}
          >
            {item.name}
          </button>
        </li>
      </div>
    );
  });

  const movieList = movieByGenre.map((item, index) => (
    <MovieItem key={index} item={item} isLargeRow />
  ));
  const actionList = actionMovies.map((item, index) => (
    <MovieItem key={index} item={item} />
  ));
  const comedyList = comedyMovies.map((item, index) => (
    <MovieItem key={index} item={item} />
  ));
  const HorrorList = horrorMovies.map((item, index) => (
    <MovieItem key={index} item={item} />
  ));
  const romanceList = romanceMovies.map((item, index) => (
    <MovieItem key={index} item={item} />
  ));
  const documatariesList = documatariesMovies.map((item, index) => (
    <MovieItem key={index} item={item} />
  ));

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
  };

  return (
    <div className={Styles.genreList}>
      <div className="top-picks">
        <h2>Movies to explore /</h2>
        <p>{genreList}</p>
        <Carousel responsive={responsive}>{movieList}</Carousel>
        <h2>Comedy</h2>
        <Carousel responsive={responsive}>{comedyList}</Carousel>
        <h2>Horror</h2>
        <Carousel responsive={responsive}>{HorrorList}</Carousel>
        <h2>Action</h2>
        <Carousel responsive={responsive}>{actionList}</Carousel>
        <h2>Romance</h2>
        <Carousel responsive={responsive}>{romanceList}</Carousel>
        <h2>Documentaries</h2>
        <Carousel responsive={responsive}>{documatariesList}</Carousel>
      </div>
      );
    </div>
  );
}

export default GenreList;
