import React, { useState, useEffect } from "react";
import Navbar2 from "../../Componentes/Navbar/navbar2";
import ListaCobranca from "../../Listas/listacobranca";
import "./cobranca.css";
import { collection, getFirestore, getDocs, query } from "firebase/firestore";
import { getAuth } from "firebase/auth";
function Cobranca() {
  const [clientes, setClientes] = useState([]);
  const [busca, setBusca] = useState("");
  const [texto, setTexto] = useState("");
  const [exibirPagos, setExibirPagos] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;
  const [quantidadeClientes, setQuantidadeClientes] = useState(0);

  useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const db = getFirestore();
      const q = query(collection(db, "clientes"));
      const querySnapshot = await getDocs(q);

      const listaCli = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data) {
          const lowercaseBusca = busca.toLowerCase();
          const lowercaseNome = (data.nome || "").toLowerCase();
          const lowercaseEmail = (data.email || "").toLowerCase();
          const lowercaseCPF = (data.cpf || "").toLowerCase();
          const lowercaseRazao = (data.razao || "").toLowerCase();

          if (
            lowercaseNome.includes(lowercaseBusca) ||
            lowercaseEmail.includes(lowercaseBusca) ||
            lowercaseCPF.includes(lowercaseBusca) ||
            lowercaseRazao.includes(lowercaseBusca)
          ) {
            listaCli.push({ id: doc.id, ...data });
          }
        }
      });

      setClientes(listaCli);
      setQuantidadeClientes(listaCli.length);
      try {
        localStorage.setItem("clientes", JSON.stringify(listaCli));
      } catch (err) {
        if (err.name === "QuotaExceededError") {
          console.warn("⚠️ LocalStorage cheio, não foi possível salvar os clientes.");
        } else {
          console.error("Erro ao salvar no localStorage:", err);
        }
      }
    } catch (error) {
      console.error("Erro ao obter dados:", error);
      setError(error);

      // fallback caso dê erro
      const storedClientes = localStorage.getItem("clientes");
      if (storedClientes) {
        setClientes(JSON.parse(storedClientes));
        setQuantidadeClientes(JSON.parse(storedClientes).length);
      }
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [busca]);

console.log("usuario atual:", user.uid);
  useEffect(() => {
    const storedClientes = localStorage.getItem("clientes");

    if (storedClientes) {
      setClientes(JSON.parse(storedClientes));
      setQuantidadeClientes(JSON.parse(storedClientes).length);
      setLoading(false);
    }
  }, []);
  const handleExibirPagos = () => {
    setExibirPagos(!exibirPagos);
  };
  const handleSearch = () => {
    setBusca(texto);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setBusca(texto);
    }
  };
  return (
    <div>
      <Navbar2 />
      <div className="container-fluid titulo">
        <div className="row lista-vendas">
          <h1>
            <b> COBRANÇA</b>
          </h1>
          <div className="col-5 pesquisa">
            <div className="input-group mb-3 ">
              <input
                onChange={(e) => setTexto(e.target.value)}
                onKeyDown={handleKeyDown}
                type="text"
                className="form-control barra"
                placeholder="Pesquisar por descrição"
                aria-describedby="button-addon2"
              />
              <div className="botao-pesquisa-container ">
                <button
                  onClick={() => setBusca(texto)}
                  className="btn  btn-pesquisa"
                  type="button"
                  id="button-addon2"
                >
                  <b className="text-light">
                    <i className="fa-solid fa-magnifying-glass "></i> Pesquisa
                  </b>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="background01 div-baixo">
        <div className="container-fluid titulo ">
          <div className="row">
            <div className="row exibicao4"></div>
          </div>
        </div>
      </div>
      <div className="background7">
        
          {loading ? (
            <p className="text-black d-flex justify-content-center mx-auto fs-1">Carregando...</p>
          ) : (
            <div className="container-fluid titulo">
            <ListaCobranca arrayClientes={clientes} exibirPagos={exibirPagos} />
        </div>

          )}
      </div>
    </div>
  );
}
export default Cobranca;
