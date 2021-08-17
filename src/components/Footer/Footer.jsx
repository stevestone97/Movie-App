import React from "react";
import Styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={Styles.wrapper}>
      <hr
        className={Styles.sperator}
        style={{ borderTop: "1px solid #5a606b" }}
      ></hr>
      <div className={Styles.footer}>
        <div>
          <h3>ABOUT ME</h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi
            error earum perspiciatis praesentium sint ipsum provident blanditiis
            pariatur necessitatibus voluptas, cum, atque iste eligendi autem,
            culpa cupiditate placeat facilis repellat.
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
            perspiciatis? Numquam, enim illo voluptatum neque facere aut sed ut
            dolore nihil? Nulla sit, recusandae ea tenetur rerum deserunt sequi
            earum?
          </p>
          <ul className={Styles.list_inline}>
            <li>
              <a href="/">
                <i style={{ color: "#3b5998" }} className="fab fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="/">
                <i style={{ color: "#FF0000" }} className="fab fa-youtube"></i>
              </a>
            </li>
            <li>
              <a href="/">
                <i style={{ color: "#00acee" }} className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="/">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3>KEEP IN TOUCH</h3>
          <ul className={Styles.contact}>
            <li>
              <p>
                <strong>
                  <i className="fas fa-map-marker-alt"></i> Address:{" "}
                </strong>
                city, state, country
              </p>
            </li>
            <li>
              <p>
                <strong>
                  <i class="fas fa-phone"></i> Phone:{" "}
                </strong>
                +01 00 00 00
              </p>
            </li>
            <li>
              <p>
                <strong>
                  <i className="fas fa-envelope"></i> Email:{" "}
                </strong>
                <a href="#">info@infomail.com</a>
              </p>
            </li>
            <a href="https://www.themoviedb.org/" target="_blank">
              <img
                style={{
                  width: "200px",
                  height: "100px",
                  objectFit: "contain",
                  marginTop: "15px",
                }}
                src="https://raw.githubusercontent.com/zisiszikos/the-movie-db-example/master/tmdb.png"
                alt="The MOVIE DB"
              />
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
