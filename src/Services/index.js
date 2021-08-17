import axios from "axios";
const apiKey = process.env.REACT_APP_API_KEY;
const url = "https://api.themoviedb.org/3";
const nowPlayingUrl = `${url}/movie/now_playing`;
const topratedUrl = `${url}/movie/top_rated`;
const movieUrl = `${url}/movie`;
const upcomingtUrl = `${url}/movie/upcoming`;
const personUrl = `${url}/person`;
const genreUrl = `${url}/genre/movie/list`;
const moviesUrl = `${url}/discover/movie`;
const popularUrl = `${url}/movie/popular`;
const searchrUrl = `${url}/search/movie`;

export const fetchMovies = async () => {
  try {
    const { data } = await axios.get(nowPlayingUrl, {
      params: {
        api_key: apiKey,
        language: "en_US",
        page: 1,
      },
    });

    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["title"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
      genre: m["genre_ids"],
    }));

    return modifiedData;
  } catch (error) {}
};
export const searchMovies = async (search) => {
  try {
    const { data } = await axios.get(searchrUrl, {
      params: {
        api_key: apiKey,
        language: "en_US",
        page: 1,
        include_adult: false,
        query: search,
      },
    });

    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      title: m["title"],
      poster: posterUrl + m["poster_path"],
      rating: m["vote_average"],
      genre: m["genre_ids"],
    }));

    return modifiedData;
  } catch (error) {}
};
export const fetchTopratedMovie = async () => {
  try {
    const { data } = await axios.get(topratedUrl, {
      params: {
        api_key: apiKey,
        language: "en_US",
        page: 1,
      },
    });
    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["title"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
    }));

    return modifiedData;
  } catch (error) {}
};
export const fetchUpcoming = async () => {
  try {
    const { data } = await axios.get(upcomingtUrl, {
      params: {
        api_key: apiKey,
        language: "en_US",
      },
    });
    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["title"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
    }));

    return modifiedData;
  } catch (error) {}
};
export const fetchActors = async (id) => {
  try {
    const { data } = await axios.get(`${personUrl}/${id}`, {
      params: {
        api_key: apiKey,
        language: "en_US",
      },
    });

    return data;
  } catch (error) {}
};
export const fetchActorsCredit = async (id) => {
  try {
    const { data } = await axios.get(`${personUrl}/${id}/movie_credits`, {
      params: {
        api_key: apiKey,
        language: "en_US",
      },
    });
    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["cast"].map((m) => ({
      id: m["id"],
      poster: posterUrl + m["poster_path"],
      character: m["character"],
      title: m["title"],
      vote_average: m["vote_average"],
      released: m["release_date"],
    }));

    return modifiedData;
  } catch (error) {}
};
export const fetchTaggedImages = async (id) => {
  try {
    const { data } = await axios.get(`${personUrl}/${id}/tagged_images`, {
      params: {
        api_key: apiKey,
        language: "en_US",
      },
    });
    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      poster: posterUrl + m["file_path"],
    }));

    return modifiedData;
  } catch (error) {}
};
export const fetchImgs = async (id) => {
  try {
    const { data } = await axios.get(`${personUrl}/${id}/images`, {
      params: {
        api_key: apiKey,
        language: "en_US",
        page: 1,
      },
    });

    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["profiles"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["file_path"],
    }));

    return modifiedData;
  } catch (error) {}
};
export const fetchMoviebackdrops = async (id) => {
  try {
    const { data } = await axios.get(`${movieUrl}/${id}/images`, {
      params: {
        api_key: apiKey,
        language: "en_US",
        include_image_language: "en",
      },
    });

    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["backdrops"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["file_path"],
    }));
    return modifiedData;
  } catch (error) {}
};
export const fetchMoviePoster = async (id) => {
  try {
    const { data } = await axios.get(`${movieUrl}/${id}/images`, {
      params: {
        api_key: apiKey,
        language: "en_US",
        include_image_language: "en",
      },
    });

    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["posters"].map((m) => ({
      id: m["id"],
      poster: posterUrl + m["file_path"],
    }));
    return modifiedData;
  } catch (error) {}
};
export const fetchpopular = async () => {
  try {
    const { data } = await axios.get(popularUrl, {
      params: {
        api_key: apiKey,
        language: "en_US",
        page: 1,
      },
    });
    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["title"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
      genre: m["genre_ids"],
    }));

    return modifiedData;
  } catch (error) {}
};
export const fetchGenre = async () => {
  try {
    const { data } = await axios.get(genreUrl, {
      params: {
        api_key: apiKey,
        language: "en_US",
        page: 1,
      },
    });
    const modifiedData = data["genres"].map((g) => ({
      id: g["id"],
      name: g["name"],
    }));
    return modifiedData;
  } catch (error) {}
};
export const fetchMovieByGenre = async (genre_id) => {
  try {
    const { data } = await axios.get(moviesUrl, {
      params: {
        api_key: apiKey,
        language: "en_US",
        page: 1,
        with_genres: genre_id,
      },
    });
    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["title"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
    }));

    return modifiedData;
  } catch (error) {}
};
export const fetchActionMovies = async () => {
  try {
    const { data } = await axios.get(moviesUrl, {
      params: {
        api_key: apiKey,
        language: "en_US",
        page: 1,
        with_genres: 28,
      },
    });
    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["title"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
    }));

    return modifiedData;
  } catch (error) {}
};
export const fetchComedyMovies = async () => {
  try {
    const { data } = await axios.get(moviesUrl, {
      params: {
        api_key: apiKey,
        language: "en_US",
        page: 1,
        with_genres: 35,
      },
    });
    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["title"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
    }));

    return modifiedData;
  } catch (error) {}
};
export const fetchHorrorMovies = async () => {
  try {
    const { data } = await axios.get(moviesUrl, {
      params: {
        api_key: apiKey,
        language: "en_US",
        page: 1,
        with_genres: 27,
      },
    });
    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["title"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
    }));

    return modifiedData;
  } catch (error) {}
};
export const fetchRomanceMovies = async () => {
  try {
    const { data } = await axios.get(moviesUrl, {
      params: {
        api_key: apiKey,
        language: "en_US",
        page: 1,
        with_genres: 10749,
      },
    });
    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["title"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
    }));

    return modifiedData;
  } catch (error) {}
};
export const fetchDocumatariesMovies = async () => {
  try {
    const { data } = await axios.get(moviesUrl, {
      params: {
        api_key: apiKey,
        language: "en_US",
        page: 1,
        with_genres: 99,
      },
    });
    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["title"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
    }));

    return modifiedData;
  } catch (error) {}
};
export const fetchCasts = async (id) => {
  try {
    const { data } = await axios.get(`${movieUrl}/${id}/credits`, {
      params: {
        api_key: apiKey,
      },
    });
    const modifiedData = data["cast"].map((c) => ({
      id: c["id"],
      character: c["character"],
      name: c["name"],
      img: "https://image.tmdb.org/t/p/w200" + c["profile_path"],
    }));

    return modifiedData;
  } catch (error) {}
};
export const fetchMovieDetail = async (id) => {
  try {
    const { data } = await axios.get(`${movieUrl}/${id}`, {
      params: {
        api_key: apiKey,
        language: "en_US",
      },
    });
    return data;
  } catch (error) {}
};
export const fetchMovieVideos = async (id) => {
  try {
    const { data } = await axios.get(`${movieUrl}/${id}/videos`, {
      params: {
        api_key: apiKey,
      },
    });
    return data["results"][0];
  } catch (error) {}
};
export const fetchSimilarMovie = async (id) => {
  try {
    const { data } = await axios.get(`${movieUrl}/${id}/similar`, {
      params: {
        api_key: apiKey,
        language: "en_US",
      },
    });
    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["title"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
    }));

    return modifiedData;
  } catch (error) {}
};
export const fetchReviews = async (id) => {
  try {
    const { data } = await axios.get(`${movieUrl}/${id}/reviews`, {
      params: {
        api_key: apiKey,
        language: "en_US",
      },
    });
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      author: m["author_details"],
      content: m["content"],
      created: m["created_at"],
    }));

    return modifiedData;
  } catch (error) {}
};
