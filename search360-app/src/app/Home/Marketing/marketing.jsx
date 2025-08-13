import React, { useState, useEffect } from "react";
import Navbar4 from "../../Componentes/Navbar/navbar4";
import ListaClienteMarketing from "../../Listas/listamarketing";
import './marketing.css';
import { getAuth } from 'firebase/auth';
import { collection, getFirestore, getDocs, query, where } from 'firebase/firestore';
import 'firebase/firestore';

function Marketing() {
  const [clientes, setClientes] = useState([]);
  const [busca, setBusca] = useState('');
  const [texto, setTexto] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantidadeClientes, setQuantidadeClientes] = useState(0);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const q = query(collection(db, 'clientes'), where('encaminharCliente', '==', true));
        const querySnapshot = await getDocs(q);
        const listaCli = [];
        querySnapshot.forEach((doc) => {
          const lowercaseSearch = busca.toLowerCase();
          const lowercaseNome = doc.data().nome.toLowerCase();
          const lowercaseEmail = doc.data().email.toLowerCase();
          const lowercaseCpf = doc.data().cpf.toLowerCase();

          if (
            lowercaseNome.includes(lowercaseSearch) ||
            lowercaseEmail.includes(lowercaseSearch) ||
            lowercaseCpf.includes(lowercaseSearch)
          ) {
            listaCli.push({
              id: doc.id,
              cpf: doc.data().cpf,
              nome: doc.data().nome,
              email: doc.data().email,
              fone: doc.data().fone,
              valor: doc.data().valor,
              data: doc.data().data,
              operador: doc.data().operador,
              encaminharCliente: doc.data().encaminharCliente,
              naoEncaminharCliente: doc.data().naoEncaminharCliente,
              realizadoNao: doc.data().realizadoNao,
              realizadoSim: doc.data().realizadoSim
            });
          }
        });
        setClientes(listaCli);
        setQuantidadeClientes(listaCli.length);
        setLoading(false);
        localStorage.setItem('clientes', JSON.stringify(listaCli));
      } catch (error) {
        console.error('Erro ao obter dados:', error);
        setError(error);
      }
    };
    if (user) {
      fetchData();
    }
  }, [busca, user]);

  useEffect(() => {
    const storedClientes = localStorage.getItem('clientes');
    if (storedClientes) {
      setClientes(JSON.parse(storedClientes));
      setQuantidadeClientes(JSON.parse(storedClientes).length);
      setLoading(false);
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setBusca(texto);
    }
  };

  return (
    <div>
      <Navbar4 />
      <div className="background6">
        <div className="container-fluid titulo">
          <div className="row lista-vendas">
            <h1><b>BACKOFFICE</b></h1>
            <div className="col-5 pesquisa">
              <div className="input-group mb-3">
                <input
                  onChange={(e) => setTexto(e.target.value)}
                  onKeyDown={handleKeyDown}
                  type="text"
                  className="form-control barra"
                  placeholder="Pesquisar por descrição"
                  aria-describedby="button-addon2"
                />
                <div className="botao-pesquisa-container">
                  <button
                    onClick={() => setBusca(texto)}
                    className="btn btn-pesquisa"
                    type="button"
                    id="button-addon2"
                  >
                    <b className="text-light"><i className="fa-solid fa-magnifying-glass"></i> Pesquisa</b>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="background01 div-baixo">
          <div className="container-fluid titulo">
            <div className="row">
              <div className="col-4 buttons"></div>
              <div className="row exibicao2">
                <h4>
                  <i className="fa-solid fa-user"></i><b> CLIENTES: {quantidadeClientes}</b>
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="background7">
          <div className="container-fluid titulo">
            <ListaClienteMarketing arrayClientes={clientes} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Marketing;
