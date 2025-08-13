import React, { useEffect, useState } from 'react';
import './menu.css'; // Certifique-se de criar este arquivo CSS para os estilos da Navbar
import { Link, useLocation } from 'react-router-dom';

function Menu() {
  const [scrolling, setScrolling] = useState(false);
  const location = useLocation();

  const handleScroll = () => {
    if (window.scrollY > 50) { // Ajuste o valor conforme necessário
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Smooth scroll to anchor on location change
    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className={`container`}>
      <nav className={`nav navbar navbar-expand-md navbar-light fixed-top ${scrolling ? 'navbar-dark' : ''}`}>
        <div className="container">
          <a href="/" className="navbar-brand logo-home">
            <img src="img/toda_logo.png" alt="logo" className='logo-home' />
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            
            <div className="d-flex">
              <a href="https://wa.link/cibopv" className="btn btn-success me-2 px-3 text-white">
                <i className="fa-brands fa-whatsapp text-white px-2"></i>
              </a>
              <Link to={'/app'} className='btn btn-primary ml-3'>Login</Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Menu;
