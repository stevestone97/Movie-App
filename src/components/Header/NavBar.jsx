import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";
import { searchMovies } from "../../Services";

function NavBar() {
  const [show, handelShow] = useState(false);
  const [nav, setNav] = useState(false);
  const [searchMovie, SetSearchMovie] = useState([]);
  const [search, SetSearch] = useState("");
  const location = useLocation();
  const defultStyle = {
    textDecoration: "none",
  };

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

  const SearchItems = searchMovie?.slice(0, 4).map((s, i) => {
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
    <header>
      <div
        className={`wrapper ${show && "wrapper_black"} ${
          nav && "wrapper_black"
        }`}
      >
        <nav>
          <li className="listItem ham__menu">
            <i onClick={() => setNav(!nav)} class="fas fa-bars"></i>
          </li>
          <div className={` ${nav ? "ham__menu__items" : "ham_menu_hidden"}`}>
            <Link style={defultStyle} to="/">
              <li>Home</li>
            </Link>
            <Link style={defultStyle} to="/movies">
              <li>Movies</li>
            </Link>
            <Link style={defultStyle} to="/watchlist">
              <li>Watchlist</li>
            </Link>
            <Link style={defultStyle} to="/registration/signin">
              <li>Log in</li>
            </Link>
          </div>
          <ul>
            <div className="flex">
              <div className="left_side">
                <Link style={defultStyle} to="/">
                  <li className="listItem">Home</li>
                </Link>
                <Link style={defultStyle} to="/movies">
                  <li className="listItem">Movies</li>
                </Link>
                <Link style={defultStyle} to="/watchlist">
                  <li className="listItem">Watchlist</li>
                </Link>
              </div>
              <div className="right_side">
                <li className="search">
                  <div className="search_results">
                    <div>
                      <input
                        id="search"
                        type="text"
                        autocomplete="off"
                        className="searchTerm"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => SetSearch(e.target.value)}
                      />
                      <button className="searchButton">
                        <i className="fa fa-search"></i>
                      </button>
                    </div>
                    <div className="search_items">{SearchItems}</div>
                  </div>
                </li>
                <Link style={defultStyle} to="/registration/signin">
                  <li className="listItem sign_in">Log in</li>
                </Link>
              </div>
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
}
export default NavBar;
