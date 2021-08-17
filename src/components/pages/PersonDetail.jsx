import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Styles from "./css/PersonDetail.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  fetchActors,
  fetchImgs,
  fetchActorsCredit,
  fetchTaggedImages,
} from "../../Services";

function PersonDetail({ match }) {
  let params = match.params;
  const [detail, setDetail] = useState([]);
  const [credits, setCredits] = useState([]);
  const [img, setImg] = useState([]);
  const [taggedimg, setTaggedImg] = useState([]);

  const imgUrl = "https://image.tmdb.org/t/p/w200";
  const defultStyle = { textDecoration: "none" };
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7,
    },
  };

  useEffect(() => {
    const fetchAPI = async () => {
      let params = match.params;
      setDetail(await fetchActors(params.id));
      setImg(await fetchImgs(params.id));
      setTaggedImg(await fetchTaggedImages(params.id));
      setCredits(await fetchActorsCredit(params.id));
    };

    fetchAPI();
  }, [params.id]);

  const actorImgs = img.map((m, i) => {
    return (
      <div className={Styles.actor__img} key={i}>
        <img src={m.backPoster} />
      </div>
    );
  });
  const taggedImgs = taggedimg.map((m, i) => {
    return (
      <div className={Styles.actor__img} key={i}>
        <img src={m.poster} />
      </div>
    );
  });
  const actorCredits = credits.slice(0, 4).map((m, i) => {
    return (
      <div className={Styles.actor__credits} key={i}>
        <Link style={defultStyle} to={`/movie/${m.id}`}>
          <img className={Styles.actor__credits__img} src={m.poster} />
        </Link>
        <h3 className={Styles.actor__credits__title}>{m.title}</h3>
        <p className={Styles.actor__credits__character}>{m.character}</p>
        <p className={Styles.actor__credits__released}>
          ({m.released.substring(0, 4)})
        </p>
      </div>
    );
  });
  const Filmography = credits.slice(0, 20).map((m, i) => {
    return (
      <div className={Styles.filmography} key={i}>
        <div>
          <Link style={defultStyle} to={`/movie/${m.id}`}>
            <h3 className={Styles.filmography__title}>{m.title}</h3>
          </Link>
          <p className={Styles.filmography__character}>{m.character}</p>
        </div>
        <div>
          <p className={Styles.filmography__released}>
            ({m.released.substring(0, 4)})
          </p>
        </div>
      </div>
    );
  });

  return (
    <div className={Styles.wrapper} key={detail.id}>
      <div className={Styles.flex}>
        <div>
          <div className={Styles.description}>
            <div>
              <img src={imgUrl + detail.profile_path} alt={detail.name} />
            </div>
            <div style={{ padding: "15px" }}>
              <h1 className={Styles.name}>{detail.name}</h1>
              <p className={Styles.department}>
                <strong>Known for: </strong>
                {detail.known_for_department}
              </p>
              <p className={Styles.biography}>{detail.biography}</p>
              <br />
              <p className={Styles.biography}>
                <strong>Born: </strong>
                {detail.birthday} in {detail.place_of_birth}
              </p>
            </div>
          </div>
          <div className={Styles.photos}>
            <h2>Photos</h2>
            <Carousel
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={8000}
              transitionDuration={500}
              responsive={responsive}
            >
              {taggedImgs}
              {actorImgs}
            </Carousel>
          </div>
          <div className={Styles.actorCredits}>
            <h2>Also Known For</h2>
            <span className={Styles.creditsList}>{actorCredits}</span>
          </div>
        </div>
        <div>
          <div className={Styles.filmographyList}>
            <h2>Filmography</h2>
            <div style={{ padding: "15px" }}>{Filmography}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonDetail;
