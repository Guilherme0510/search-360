import React, { useContext, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "./listacliente.css";
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "../Acesso/Context/auth";
import { Tooltip } from "react-tooltip";

function ListaCliente({ arrayClientes, clickDelete }) {
  const [filtroDataVenda01, setFiltroDataVenda01] = useState(
    localStorage.getItem("filtroDataVenda01") || ""
  );
  const [filtroDataVenda02, setFiltroDataVenda02] = useState(
    localStorage.getItem("filtroDataVenda02") || ""
  );
  const [quantidadeClientes, setQuantidadeClientes] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [exclusiveUser, setExclusiveUser] = useState(false);
  const [isAdmUser, setIsAdmUser] = useState(false);
  const { setLogado } = useContext(AuthContext);
  const auth = getAuth();

  useEffect(() => {
    localStorage.setItem("filtroDataVenda01", filtroDataVenda01);
    localStorage.setItem("filtroDataVenda02", filtroDataVenda02);
  }, [filtroDataVenda01, filtroDataVenda02]);

 const formattedClientes = React.useMemo(() => {
  return arrayClientes
    .slice()
    .sort((a, b) => {
      const dateA = new Date(a.data); // assume-se que a.data está em formato YYYY-MM-DD
      const dateB = new Date(b.data);
      return dateB - dateA; // Mais recente primeiro
    })
    .map((cliente) => ({
      ...cliente,
      formattedData01: formatarData(cliente.data), // Exibe no formato DD-MM-YYYY
      formattedData02: formatarData(cliente.venc),
    }));
}, [arrayClientes]);

  function formatarData(data) {
    if (typeof data === "string" && data.includes("-")) {
      const partes = data.split("-");
      return `${partes[2]}-${partes[1]}-${partes[0]}`;
    } else {
      return "N/A";
    }
  }

  const handleVerificarPagos = useCallback(async () => {
    try {
      const db = getFirestore();
      const userId = auth.currentUser?.uid;
      const adminUsers = [
        "jQmq7NAw5KUsqIZQJanCXLYBDXh1",
        "Hc2jp2W3zhX2vkEh9BV6pEXlGh33",
      ];
      const exclusiveUsers = [
        "jQmq7NAw5KUsqIZQJanCXLYBDXh1",
        "Hc2jp2W3zhX2vkEh9BV6pEXlGh33",
      ];

      if (adminUsers.includes(userId)) {
        setIsAdmUser(true);
      } else if (exclusiveUsers.includes(userId)) {
        setExclusiveUser(true);
      }

      const userAllViwer = [
        "jQmq7NAw5KUsqIZQJanCXLYBDXh1", // talita
        "Hc2jp2W3zhX2vkEh9BV6pEXlGh33", // joans
        "DUcK22o2bDSrlxq5HYpdS9g2o4S2", // camila
        "MutIiMvE3jVzXOJ6OnN5CFAgHTt1", // jessica mota
        "0nrVRt456BS3sAqqs9wwjYeCjfU2", // fabiana
      ];

      let q;
      if (userAllViwer.includes(userId)) {
        q = query(collection(db, "clientes"));
      } else {
        q = query(collection(db, "clientes"), where("userId", "==", userId));
      }

      const querySnapshot = await getDocs(q);
      const listaCli = querySnapshot.docs.map((doc) => {
        const cliente = {
          id: doc.id,
          fantasia: doc.data().fantasia,
          cpf: doc.data().cpf,
          nome: doc.data().nome,
          email: doc.data().email,
          fone: doc.data().fone,
          data: doc.data().data,
          razao: doc.data().razao,
          venc: doc.data().venc,
          whatsapp: doc.data().whatsapp,
        };

        return cliente;
      });

      setQuantidadeClientes(listaCli.length);
      setTotalPages(Math.ceil(listaCli.length / 10));
    } catch (error) {
      console.error("Erro ao obter dados:", error);
    }
  }, [auth]);

  const Logout = () => {
    setLogado(false);
    localStorage.removeItem("logado");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogado(true);
        handleVerificarPagos();
      } else {
        setLogado(false);
      }
    });
    return () => unsubscribe();
  }, [auth, setLogado, handleVerificarPagos]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
    window.scrollTo(0, 0);
  };

  const clientesPerPage = 10;
  const filteredClientes = formattedClientes.filter((cliente) => {
    const vencimentoMatch =
      !filtroDataVenda02 || cliente.venc === filtroDataVenda02;
    const dataMatch = !filtroDataVenda01 || cliente.data === filtroDataVenda01;
    return dataMatch && vencimentoMatch;
  });

  const indexOfLastCliente = currentPage * clientesPerPage;
  const indexOfFirstCliente = indexOfLastCliente - clientesPerPage;
  const currentClientes = filteredClientes.slice(
    indexOfFirstCliente,
    indexOfLastCliente
  );

  useEffect(() => {
    setTotalPages(Math.ceil(filteredClientes.length / clientesPerPage));
  }, [filteredClientes]);

  return (
    <div>
      <div className="divAss">
        <div className="divDate">
          <p className="text-center">DATA DE VENDA</p>
          <input
            type="date"
            value={filtroDataVenda01}
            onChange={(e) => setFiltroDataVenda01(e.target.value)}
            className="form-control date date-config"
          />
        </div>
        <div className="divDate">
          <p className="text-center">DATA DE VENCIMENTO</p>
          <input
            type="date"
            value={filtroDataVenda02}
            onChange={(e) => setFiltroDataVenda02(e.target.value)}
            className="form-control date date-config"
          />
        </div>
      </div>
      <table className="table table-hover table-bordered">
        <thead>
          <tr className="table-primari">
            <th scope="col" className="col-acao text-center">
              CNPJ/CPF
            </th>
            <th scope="col" className="col-acao text-center">
              NOME
            </th>
            <th scope="col" className="col-acao text-center">
              E-MAIL
            </th>
            <th scope="col" className="col-acao text-center">
              OPERADOR
            </th>
            <th scope="col" className="col-acao text-center">
              WHATSAPP
            </th>
            <th scope="col" className="col-acao text-center">
              DATA
            </th>
            <th scope="col" className="col-acao text-center">
              VENCIMENTO
            </th>
            <th scope="col" className="col-acao text-center">
              <i className="fa-solid fa-clipboard icon-u"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentClientes.map((cliente) => (
            <tr key={cliente.id} className="table-light">
              <th scope="row" className="align-middle">
                <Link
                  to={`/app/home/fichacliente/${cliente.id}`}
                  className="fa-solid fa-list icone-acao1 align-middle"
                ></Link>
                {cliente.cpf}
              </th>
              <td className="align-middle text-center ">
                {cliente.nome || "N/A"}
              </td>
              <td className="align-middle text-center ">
                {cliente.email || "N/A"}
              </td>
              <td className="align-middle text-center ">
                {cliente.operador || "N/A"}
              </td>
              <td className="align-middle text-center ">
                {cliente.whatsapp ? cliente.whatsapp : "N/A"}
              </td>
              <td className="align-middle text-center ">
                {cliente.formattedData01 || "N/A"}
              </td>
              <td className="align-middle text-center ">
                {cliente.formattedData02 || "N/A"}
              </td>
              <td className="align-middle text-center ">
                <div className="d-flex gap-2">
                  <Link
                    to={`/app/home/editarcliente/${cliente.id}`}
                    data-tooltip-id="Tooltip Inicio"
                    data-tooltip-content="Editar Cliente"
                  >
                    <i className="fa-solid fa-pen-to-square icone-acao"></i>
                  </Link>

                  <Link
                    to={`/app/home/qrcode/${cliente.id}`}
                    data-tooltip-id="Tooltip Inicio"
                    data-tooltip-content="Qr Code"
                  >
                    <i className="fa-solid fa-qrcode icone-acao"></i>
                  </Link>
                  <Link
                    to={`/app/contrato/${cliente.id}`}
                    data-tooltip-id="Tooltip Inicio"
                    data-tooltip-content="Contrato"
                  >
                    <i class="fa-solid fa-address-card icone-acao"></i>
                  </Link>
                  <Link
                    to="#"
                    onClick={() => clickDelete(cliente.id)}
                    data-tooltip-id="Tooltip Inicio"
                    data-tooltip-content="Excluir"
                  >
                    <i className="fa-solid fa-trash icone-acao red"></i>
                  </Link>
                </div>
                <Tooltip id="Tooltip Inicio" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}
const Pagination = ({ currentPage, totalPages, handlePageChange }) => (
  <div className="row">
    <div className="col-12 text-center">
      <div className="pagination">
        <button
          className="btn btn-outline-secondary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <div className="pagination text-light">
          <p>{currentPage}</p>
          <p>-</p>
          <p>{totalPages}</p>
        </div>
        <button
          className="btn btn-outline-secondary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Próximo
        </button>
      </div>
    </div>
  </div>
);

export default ListaCliente;
