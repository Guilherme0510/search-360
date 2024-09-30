// Banner.js
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./banner.css";
import VanillaTilt from "vanilla-tilt";
import BackgroundVideo from "./background-video";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Banner() {
  const tiltRef = useRef(null);
  const [query, setQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 25,
        speed: 400,
      });
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/pesquisas?query=${encodeURIComponent(query)}&location=${encodeURIComponent(locationQuery)}`);
  };

  return (
    <section className="banner" id="inicio">
      <BackgroundVideo />
      <div className="container">
        <div className="itens-banner">
          <h1>Encontre o que precisa!</h1>
          <div className="input-header">
            <input
              type="text"
              placeholder="Digite o que deseja encontrar"
              className="form-control input-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {/* <input
              type="text"
              placeholder="Localização"
              className="form-control input-search"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
            /> */}
            <button className="btn btn-primary" onClick={handleSearch}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
