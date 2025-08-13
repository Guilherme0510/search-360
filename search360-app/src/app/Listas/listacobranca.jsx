import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { getAuth } from "firebase/auth";
function ListaCobranca(props) {
  const [additionalInfo, setAdditionalInfo] = useState(() => {
    const storedInfo = localStorage.getItem("additionalInfo");
    return storedInfo ? JSON.parse(storedInfo) : {};
  });

  const [loading, setLoading] = useState(true);
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [filtroDataVenda, setFiltroDataVenda] = useState("");

  const auth = getAuth();
  const user = auth.currentUser;

  // ---------- Funções de utilidade ----------
  function formatarData(data) {
    if (typeof data === "string" && data.includes("-")) {
      const partes = data.split("-");
      return `${partes[2]}-${partes[1]}-${partes[0]}`;
    }
    console.warn("Data inválida:", data);
    return "N/A";
  }

  const salvarNoLocalStorage = (info) => {
    localStorage.setItem("additionalInfo", JSON.stringify(info));
  };

  function formatarData1(venc) {
    if (typeof venc === "string" && venc.includes("-")) {
      const partes = venc.split("-");
      console.log(partes); // Adicionando este console.log para depurar
      return `${partes[2]}-${partes[1]}-${partes[0]}`;
    } else {
      console.log("Data inválida:", venc); // Adicionando este console.log para depurar
      return "N/A";
    }
  }

  // ---------- Funções de manipulação ----------
  const deleteInfo = (clienteId) => {
    Swal.fire({
      title: "Tem certeza que deseja excluir informações?",
      html: `<input type="password" id="senha-exclusao" class="swal2-input" placeholder="Senha de Exclusão">`,
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    }).then((result) => {
      if (result.isConfirmed) {
        const senhaDigitada = document.getElementById("senha-exclusao").value;
        const senhaCorreta = "@1V?$9En9o#1qa";

        if (senhaDigitada === senhaCorreta) {
          setAdditionalInfo((prevInfo) => {
            const updatedInfo = { ...prevInfo };
            delete updatedInfo[clienteId];
            salvarNoLocalStorage(updatedInfo);
            return updatedInfo;
          });
          Swal.fire("Informações excluídas!", "", "success");
        } else {
          Swal.fire("Senha incorreta!", "Você não tem permissão para excluir informações.", "error");
        }
      }
    });
  };

  const addInfoManually = async (clienteId) => {
    const result = await Swal.fire({
      title: "Adicionar Informações",
      html: `
        <input type="text" id="info-input" class="swal2-input" placeholder="Informações">
        <input type="text" id="name-input" class="swal2-input" placeholder="Seu Nome">
      `,
      showCancelButton: true,
      confirmButtonText: "Adicionar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const info = document.getElementById("info-input").value;
        const name = document.getElementById("name-input").value;
        return { info, name };
      },
    });

    if (result.isConfirmed) {
      const { info, name } = result.value;
      if (!info || !name) {
        Swal.fire({
          icon: "error",
          title: "Preencha todas as informações",
          text: "Você precisa fornecer tanto as informações quanto o seu nome.",
        });
        return;
      }

      setAdditionalInfo((prevInfo) => {
        const updatedInfo = { ...prevInfo, [clienteId]: { info, name } };
        salvarNoLocalStorage(updatedInfo);
        return updatedInfo;
      });
    }
  };

  // ---------- Filtro de clientes ----------
  useEffect(() => {
    const filterClientes = async () => {
      try {
        const filtered = await Promise.all(
          props.arrayClientes.map(async (cliente) => {
            const allVisu =
              (user && user.uid === "jQmq7NAw5KUsqIZQJanCXLYBDXh1") || // talita
              (user && user.uid === "Hc2jp2W3zhX2vkEh9BV6pEXlGh33") || // Jonas
              (user && user.uid === "HaJ1zQ3uhfUjN3Ucd49qmhbD9Ez2");  // felipe

            const allNames = [
              "bruno", "allan", "jhow", "ana", "talita", "karol", "ana.caroline", "alef"
            ].includes(cliente.cobrador);

            if (
              (allNames && allVisu) ||
              (cliente.cobrador === "bruno" && user?.uid === "xwRvGUiEJWbGuMvCNHiHYzmw0Cu1") ||
              (cliente.cobrador === "allan" && user?.uid === "BhHsQBvMqoSTKsohAy4Bg380v8a2") ||
              (cliente.cobrador === "ana" && user?.uid === "oadTRyuG9bSHfPArrfPEZ8VN5iQ2") ||
              (cliente.cobrador === "ana.caroline" && user?.uid === "GeuSj5nq5WSvH9hvYy7YkOG3Usl1") ||
              (cliente.cobrador === "talita" && user?.uid === "jQmq7NAw5KUsqIZQJanCXLYBDXh1")
            ) {
              return cliente;
            }
            return null;
          })
        );

        setFilteredClientes(filtered.filter(Boolean));
      } catch (error) {
        console.error("Erro geral ao filtrar clientes:", error);
      }
    };

    filterClientes();
  }, [props.arrayClientes, user]);
  return (
    <>
      <div className="row divAss">
        <div className="divDate">
          <p className="text-center">DATA DE ENCAMINHAMENTO:</p>
          <input
            type="date"
            value={filtroDataVenda}
            onChange={(e) => setFiltroDataVenda(e.target.value)}
            className="form-control date date-config"
          />
        </div>
      </div>
      <table className="table table-hover table-bordered">
        <thead>
          <tr className="table-primari text-light">
            <th scope="col" className="text-center col-acao">
              CNPJ/CPF
            </th>
            <th scope="col" className="text-center col-acao">
              COBRADOR
            </th>
            <th scope="col" className="text-center col-acao">
              NOME
            </th>
            <th scope="col" className="text-center col-acao">
              E-MAIL
            </th>
            <th scope="col" className="text-center col-acao">
              TELEFONE
            </th>
            <th scope="col" className="text-center col-acao">
              ENVIADO
            </th>
            <th scope="col" className="text-center col-acao">
              VENCIMENTO
            </th>
            <th scope="col" className="text-center col-acao">
              ACORDO
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredClientes
            .filter(
              (cliente) =>
                !filtroDataVenda ||
                cliente.dataEncaminhamento == filtroDataVenda
            )
            .map((cliente) => {
              const additionalInfoData = additionalInfo[cliente.id] || {};
              return (
                <tr key={cliente.id} className="table-light">
                  <th scope="row" className="align-middle">
                    <Link to={`/app/home/fichacliente/${cliente.id}`}>
                      <i className="fa-solid fa-list icone-acao1"></i>
                    </Link>
                    {cliente.cpf}
                  </th>
                  <td className="align-middle text-center">
                    {cliente.cobrador}
                  </td>
                  <td className="align-middle text-center">
                    {cliente.nome || "N/A"}
                  </td>
                  <td className="align-middle text-center">
                    {cliente.email || "N/A"}
                  </td>
                  <td className="align-middle text-center">
                    {cliente.fone || "N/A"}
                  </td>
                  <td className="align-middle text-center">
                    {formatarData(cliente.dataEncaminhamento)}
                  </td>
                  <td className="align-middle text-center">
                    {formatarData1(cliente.venc)}
                  </td>

                  <td className="d-flex gap-3 align-items-center justify-content-center">
                    <Link
                      to={`/app/home/fichacobrancamapsempresas/${cliente.id}`}
                    >
                      <i className="fa-solid fa-money-check-dollar green"></i>
                    </Link>

                    <Link to={`/app/fichaalterar/${cliente.id}`}>
                      <i className="fa-solid fa-share"> </i>
                    </Link>
                    <Link to={`/app/comprovantes/${cliente.id}`}>
                      <i className="fa-solid fa-file-invoice icone-acao"></i>
                    </Link>
                    <Link
                      to={`/app/home/qrcode/${cliente.id}`}
                      data-tooltip-id="Tooltip Inicio"
                      data-tooltip-content="Qr Code"
                    >
                      <i className="fa-solid fa-qrcode icone-acao"></i>
                    </Link>

                    {/* 
                                <button onClick={() => addInfoManually(cliente.id)}>
                                    Adicionar Informações
                                </button>
                                {additionalInfoData.info && (
                                    <div>
                                        <strong>Informações:</strong> {additionalInfoData.info}
                                        <br />
                                        <strong>Adicionado por:</strong> {additionalInfoData.name}
                                        <br />
                                        <button onClick={() => deleteInfo(cliente.id)}>
                                            Excluir Informações
                                        </button>
                                    </div>
                                )} */}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
export default ListaCobranca;
