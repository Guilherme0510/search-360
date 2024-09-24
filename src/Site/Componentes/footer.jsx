import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "./footer.css";

function Footer() {
    return (
        <div className="footer" id="contato">
          <footer className="py-3 mt-5">
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
              <li className="nav-item">
                <a href="#inicio" className="nav-link px-2 text-body-secondary">Inicio</a>
              </li>
              <li className="nav-item">
                <a href="#sobre" className="nav-link px-2 text-body-secondary">Sobre</a>
              </li>
              <li className="nav-item">
                <a href="#servicos" className="nav-link px-2 text-body-secondary">Serviços</a>
              </li>
              <li className="nav-item">
                <a href="#contato" className="nav-link px-2 text-body-secondary">Contato</a>
              </li>
            </ul>
            <p className="text-center">&copy; 2021 G Realize - 28.062.365/0001-60</p>
          </footer>
        </div>
      );
}

export default Footer;