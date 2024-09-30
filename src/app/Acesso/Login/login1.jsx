import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import "../Login/login.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../Context/auth.jsx";
import "firebase/auth";
import firebase from "../Config/firebase.js";
function Login() {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [sucesso, setSucesso] = useState("");
  const { setLogado } = useContext(AuthContext);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [redirectPath, setRedirectPath] = useState("");
  function LoginUsuario() {
    signInWithEmailAndPassword(auth, email, senha)
      .then(function (firebaseUser) {
        localStorage.setItem("logado", "S");
        setLogado(true);
        setSucesso("S");
        let redirectPath = "/app/paginadeescolhavendasgrupomapsempresas";
        if (
          email === "karoline.alves@grupomapscartaodigital.com.br" ||
          email === "eryck.vinicius@grupomapscartaodigital.com.br" ||
          email === "gabriel.pinheiro@grupomapscartaodigital.com.br" ||
          email === "andressa.anastacia@grupomapscartaodigital.com.br"
        ) {
          redirectPath = "/app/marketingmapsempresas";
        } else if (
          email === "bruno@seusite360.com" ||
          email === "ana@seusite360.com" ||
          email === "jhow@seusite360.com" ||
          email === "allan@seusite360.com" ||
          email === "isabela@grupomapscartaodigital.com.br" ||
          email === "adriana@grupomapscartaodigital.com" ||
          email === "karol@seusite360.com"
        ) {
          redirectPath = "/app/cobrancamapsempresas";
        } else if (
          email === "grazielli@grupomapscartaodigital.com.br" ||
          email === "robert.b@grupomapscartaodigital.com.br"
        ) {
          redirectPath = "/app/monitoriamapsempresas";
        } else if (
          email === "felipe@eusite360.com" ||
          email === "fabiane@seusite360.com" ||
          email === "talita@seusite360.com" ||
          email === "jhonas@seusite360.com" ||
          email === "alef.thadeu@grupomapscartaodigital.com.br"
        ) {
          redirectPath = "/app/paginadeescolhagrupomapsempresas";
        }

        setRedirectToHome(true);
        setRedirectPath(redirectPath);
      })
      .catch(function (error) {
        localStorage.setItem("logado", "N");
        setLogado(false);
        setSucesso("N");
      });
  }
  function alterarEmail(event) {
    setEmail(event.target.value);
  }
  function alterarSenha(event) {
    setSenha(event.target.value);
  }
  function handleSubmit(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      LoginUsuario();
    }
  }
  return (
    <div className="d-flex align-items-centes text-center form-container">
      <form className="form-signin formulari">
        {/* <img className="mb-4 icon" src="../../../img/LOGO-REALIZE-removebg-preview.png" alt="" height="110" width="90" /> */}
        <h1 className="h3 mb-3 fw-normal text-light">Login</h1>
        <div className="form-floating">
          <input
            onChange={alterarEmail}
            type="email"
            // className="form-control"
            id="floatingInput"
            placeholder="E-mail"
          />
        </div>
        <div className="form-floating formulario1 ">
          <input
            onChange={alterarSenha}
            onKeyPress={handleSubmit}
            type="password"
            // className="form-control"
            id="floatingPassword"
            placeholder="Senha"
          />
        </div>
        <div className="form-check d-flex flex-column align-items-center text-center my-3">
          <input
            className="form-check-input mb-2"
            type="checkbox"
            value="remember-me"
            id="flexCheckDefault"
          />
          <label className="text-center" htmlFor="flexCheckDefault">
            Lembrar
          </label>
        </div>

        <button
          onClick={LoginUsuario}
          className="btn btn-primary w-100 py-2"
          type="button"
        >
          Acessar
        </button>
        {sucesso === "N" ? (
          <div className="alert alert-danger mt-2" role="alert">
            Email ou senha inválida
          </div>
        ) : null}
        {sucesso === "S"
          ? redirectToHome && <Navigate to={redirectPath} />
          : null}
        <div className="login-links mt-5">
          {/* <Link to="/app/resetsenha" className="mx-3 text-light">Esqueci minha senha</Link> */}
          {/* <Link to="/app/novaconta" className="mx-3">Criar conta</Link> */}
        </div>
        {/* <p className="mt-5 mb-3 text-body-secondary">&copy; Desenvolvido por Seu Site</p> */}
      </form>
    </div>
  );
}
export default Login;
