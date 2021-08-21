import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./NavBar.css";
import { searchMovies } from "../../Services";

function NavBar() {
  let history = useHistory();
  const [show, handelShow] = useState(false);
  const [nav, setNav] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [searchMovie, SetSearchMovie] = useState([]);
  const [search, SetSearch] = useState("");
  const location = useLocation();
  const defultStyle = {
    textDecoration: "none",
    color: "white",
  };

  const moreResults = (
    <p className="Alt-result">See all results for "{search}"</p>
  );
  const noResults = (
    <p className="Alt-result">There are no movies that matches "{search}"</p>
  );

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handelShow(true);
      } else handelShow(false);
    });
    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);
  useEffect(() => {
    const fetchAPI = async () => {
      SetSearchMovie(await searchMovies(search));
    };
    fetchAPI();
  }, [search]);
  useEffect(() => {
    SetSearch("");
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const SearchItems = searchMovie?.slice(0, 5).map((s, i) => {
    return (
      <Link style={defultStyle} to={`/movie/${s.id}`}>
        <div key={i} className="search_item">
          <div className="img_title">
            <img src={s.poster} />
            <p>{s.title}</p>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <div
      className={`wrapper ${show && "wrapper_black"} ${nav && "wrapper_black"}`}
    >
      <nav>
        <li className="listItem ham__menu">
          <i onClick={() => setNav(!nav)} class="fas fa-bars" />
        </li>
        <div className={nav ? "ham__menu__items" : "ham_menu_hidden"}>
          <li onClick={() => history.push("/")}>Home</li>
          <li onClick={() => history.push("/movies")}>Movies</li>
        </div>
        <ul>
          <div className="flex">
            <div className="left_side">
              <li onClick={() => history.push("/")}>HOME</li>
              <li onClick={() => history.push("/movies")}>MOVIES</li>
            </div>

            <div className="right_side">
              <li className="search">
                <div className="search_results">
                  <form onSubmit={() => history.push(`/search/${search}`)}>
                    <input
                      className="searchTerm"
                      type="text"
                      role="search"
                      autocomplete="off"
                      placeholder="Search..."
                      value={search}
                      onChange={(e) => SetSearch(e.target.value)}
                    />
                    <button className="searchButton">
                      <i className="fa fa-search" />
                    </button>
                  </form>
                  <div className="search_items">
                    {SearchItems?.length === 0 ? noResults : SearchItems}
                    <Link style={defultStyle} to={`/search/${search}`}>
                      {searchMovie?.length > 5 && moreResults}
                    </Link>
                  </div>
                </div>
              </li>
            </div>
          </div>
        </ul>
      </nav>
    </div>
  );
}
export default NavBar;
