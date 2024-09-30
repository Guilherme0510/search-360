import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../Navbar/navbar.css";
import { AuthContext } from "../../Acesso/Context/auth";
function Navbar4() {
  const [loading, setLoading] = useState(true);
  const { setLogado } = useContext(AuthContext);
  const auth = getAuth();
  const navigate = useNavigate();
  const [isAdmUser, setIsAdmUser] = useState(false);
  const Logout = () => {
    setLogado(false);
    localStorage.removeItem("logado");
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log('ID do usuário:', user.uid);
        setLogado(true);
        setIsAdmUser(
          user.uid === "o0MWkxE9M1fXOFbyuFzo96NG3rv2" ||
      user.uid === "xHHHkLS2VIYkf0XQlsDDk97bMh63" ||
      user.uid === "yLrl7j2bBMR7PGrZmPblS1OuCP83"
        );
      } else {
        console.log("Nenhum usuário autenticado.");
        setLogado(false);
      }
    });
    return () => unsubscribe();
  }, [auth, setLogado]);
  useEffect(() => {
    const storedClientes = localStorage.getItem("clientes");
    if (storedClientes) {
      setLoading(false);
    }
  }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <div className="container-fluid">
        <a className="navbar-brand" href="/app/marketingmapsempresas">
          <img
            src="./../../img/logo_ass.png"
            width="85"
            height="80"
            alt=""
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Alterna navegação"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse  d-lg-flex justify-content-end"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav active">
            <li className="nav-item ">
              <Link
                to={"https://app2.pontomais.com.br/login"}
                aria-current="page"
                className="btn  btn-nav btn-nav-ct0 btn-success"
                type="button"
                id="button-addon2"
              >
                <i className="fa-solid fa-check"></i>
                <b> PONTO MAIS</b>
              </Link>
            </li>
            {isAdmUser && (
              <>
                <li className="nav-item ">
                  <Link
                    to="/app/home"
                    aria-current="page"
                    className="btn  btn-nav btn-nav-ct"
                    type="button"
                    id="button-addon2"
                  >
                    <i className="fa-solid fa-arrow-rotate-left"></i>
                    <b> VOLTAR</b>
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link
                to="/app"
                onClick={Logout}
                className="btn btn-danger btn-nav"
                aria-current="page"
              >
                <b>
                  <i className="fa-solid fa-right-from-bracket"></i> SAIR{" "}
                </b>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar4;
