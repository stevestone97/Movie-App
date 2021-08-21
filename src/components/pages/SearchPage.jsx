import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { searchMovies } from "../../Services";

function SearchPage({ match }) {
  let params = match.params;
  const [searchMovie, SetSearchMovie] = useState([]);
  const [more, setMore] = useState(false);

  useEffect(() => {
    const fetchAPI = async () => {
      SetSearchMovie(await searchMovies(params.search));
    };
    fetchAPI();
  }, [params.search]);

  const SearchItems = searchMovie?.map((s, i) => {
    return (
      <Link style={{ textDecoration: "none" }} to={`/movie/${s.id}`}>
        <div
          style={{ width: "100vw", paddingRight: "40px" }}
          key={i}
          className="search_item"
        >
          <div className="img_title">
            <img style={{ width: "120px" }} src={s.poster} />
            <p
              style={{
                fontSize: "18px",
                marginLeft: "10px",
                fontFamily: "Poppins",
              }}
            >
              {s.title}
            </p>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <div
      style={{
        marginTop: "70px",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {more ? SearchItems : SearchItems?.slice(0, 10)}
      {SearchItems.length > 10 && (
        <button
          style={{
            backgroundColor: "transparent",
            color: "white",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
            padding: "15px",
            fontFamily: "Poppins",
          }}
          onClick={() => setMore(!more)}
        >{`Load ${more ? "Less" : "More"}`}</button>
      )}
    </div>
  );
}

export default SearchPage;
