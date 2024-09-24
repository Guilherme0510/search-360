import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
import { getAuth } from 'firebase/auth';
function ListaCobranca(props) {

    const [additionalInfo, setAdditionalInfo] = useState(() => {
        const storedInfo = localStorage.getItem('additionalInfo');
        return storedInfo ? JSON.parse(storedInfo) : {};
    });
    const deleteInfo = (clienteId) => {
        Swal.fire({
            title: 'Tem certeza que deseja excluir informações?',
            html: `
                <input type="password" id="senha-exclusao" class="swal2-input" placeholder="Senha de Exclusão">
            `,
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
        }).then((result) => {
            if (result.isConfirmed) {
                const senhaDigitada = document.getElementById('senha-exclusao').value;
                const senhaCorreta = '@1V?$9En9o#1qa';

                if (senhaDigitada === senhaCorreta) {
                    setAdditionalInfo((prevInfo) => {
                        const updatedInfo = { ...prevInfo };
                        delete updatedInfo[clienteId];
                        return updatedInfo;
                    });
                    localStorage.setItem('additionalInfo', JSON.stringify({ ...additionalInfo, [clienteId]: null }));
                    Swal.fire('Informações excluídas!', '', 'success');
                } else {
                    Swal.fire('Senha incorreta!', 'Você não tem permissão para excluir informações.', 'error');
                }
            }
        });
    };
    const addInfoManually = async (clienteId) => {
        const result = await Swal.fire({
            title: 'Adicionar Informações',
            html: `
                <input type="text" id="info-input" class="swal2-input" placeholder="Informações">
                <input type="text" id="name-input" class="swal2-input" placeholder="Seu Nome">
            `,
            showCancelButton: true,
            confirmButtonText: 'Adicionar',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const infoInput = document.getElementById('info-input').value;
                const nameInput = document.getElementById('name-input').value;
                return { info: infoInput, name: nameInput };
            },
        });
        if (result.isConfirmed) {
            const { info, name } = result.value;
            if (!info || !name) {
                Swal.fire({
                    icon: 'error',
                    title: 'Preencha todas as informações',
                    text: 'Você precisa fornecer tanto as informações quanto o seu nome.',
                });
                return;
            }
            setAdditionalInfo((prevInfo) => ({ ...prevInfo, [clienteId]: { info, name } }));
            localStorage.setItem('additionalInfo', JSON.stringify({ ...additionalInfo, [clienteId]: { info, name } }));
        }
    };

    // const sortedClientes = props.arrayClientes.sort((b, a) => new Date(b.venc2) - new Date(a.venc2));
    // const formatarData = (venc2) => {
    //     const partes = venc2.split("-");
    //     return `${partes[2]}/${partes[1]}/${partes[0]}`;
    // };
    function formatarData(dataEncaminhamento) {
        if (typeof dataEncaminhamento === 'string' && dataEncaminhamento.includes('-')) {
          const partes = dataEncaminhamento.split('-');
          console.log(partes); // Adicionando este console.log para depurar
          return `${partes[2]}-${partes[1]}-${partes[0]}`;
        } else {
          console.log('Data inválida:', dataEncaminhamento); // Adicionando este console.log para depurar
          return 'N/A';
        }
      }
      function formatarData1(venc) {
        if (typeof venc === 'string' && venc.includes('-')) {
          const partes = venc.split('-');
          console.log(partes); // Adicionando este console.log para depurar
          return `${partes[2]}-${partes[1]}-${partes[0]}`;
        } else {
          console.log('Data inválida:', venc); // Adicionando este console.log para depurar
          return 'N/A';
        }
      }
    const [filteredClientes, setFilteredClientes] = useState([]);
    const auth = getAuth();
    const user = auth.currentUser;
    useEffect(() => {
        console.log("Usuário atual:", user && user.uid);
        console.log("Filtrando clientes...");

        const filterClientes = async () => {
            try {
                console.log("Iniciando filtro de clientes");
                const filtered = await Promise.all(
                    props.arrayClientes.map(async (cliente) => {
                        try {
                            const allVisu = user && user.uid === "rrMhvTLAElMAI0l7j0T2y9Ypm842" || user && user.uid === "WcOsPxuR4fMICQTnu2m7r0Abdf23";
                            const allNames = ((cliente.cobrador === "bruno") || (cliente.cobrador === "allan") || (cliente.cobrador === "jhow") || (cliente.cobrador === "ana") || (cliente.cobrador === "talita") || (cliente.cobrador === "karol") );
                            if ((allNames && allVisu) ||
                                (cliente.cobrador === "bruno" && (user && user.uid === "ad4iYgNHhThBnANoG2TYgBrg80k2")) ||
                                (cliente.cobrador === "allan" && (user && user.uid === "WALQEXc3wDhRl7isIpTRlSZYfnr2")) ||
                                (cliente.cobrador === "jhow" && (user && user.uid === "3zMN58b85LhoJ9ZpiNbawiRO9TG2")) ||
                                (cliente.cobrador === "ana" && (user && user.uid === "VOx4TAmCYgd9Bwo4nEam9izMCl63")) ||
                                (cliente.cobrador === "talita" && (user && user.uid === "rrMhvTLAElMAI0l7j0T2y9Ypm842")) || 
                                (cliente.cobrador === "karol" && (user && user.uid === "XqKgMqXJkKcp8tq8d9AwmVblcU92"))
                            ) {
                                return cliente;
                            } else {
                                return null;
                            }
                        } catch (error) {
                            console.error(`Erro ao verificar arquivos do cliente ${cliente}:`, error);
                            return null;
                        }
                    })
                );
                console.log("Clientes filtrados:", filtered);
                setFilteredClientes(filtered.filter(Boolean));
            } catch (error) {
                console.error("Erro geral ao filtrar clientes:", error);
            }
        };
        filterClientes();
    }, [props.arrayClientes, user]);
    
    const [filtroDataVenda, setFiltroDataVenda] = useState(""); // Estado para armazenar a data de filtro

    return (<>
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
                    <th scope="col" className="text-center col-acao">CNPJ/CPF</th>
                    <th scope="col" className="text-center col-acao">COBRADOR</th>
                    <th scope="col" className="text-center col-acao">NOME</th>
                    <th scope="col" className="text-center col-acao">E-MAIL</th>
                    <th scope="col" className="text-center col-acao">TELEFONE</th>
                    <th scope="col" className="text-center col-acao">ENVIADO</th>
                    <th scope="col" className="text-center col-acao">VENCIMENTO</th>
                    <th scope="col" className="text-center col-acao">ACORDO</th>
                </tr>
            </thead>
            <tbody>
                {filteredClientes.filter((cliente) => !filtroDataVenda || cliente.dataEncaminhamento == filtroDataVenda).map((cliente) => {
                    const additionalInfoData = additionalInfo[cliente.id] || {};
                    return (
                        <tr key={cliente.id} className="table-light" >
                            <th scope="row" className="align-middle">
                                <Link to={`/app/home/fichacliente/${cliente.id}`}><i className="fa-solid fa-list icone-acao1"></i></Link>
                                {cliente.cpf}
                            </th>
                            <td className="align-middle text-center">{cliente.cobrador}</td>
                            <td className="align-middle text-center">{cliente.nome || 'N/A'}</td>
                            <td className="align-middle text-center">{cliente.email || 'N/A'}</td>
                            <td className="align-middle text-center">{cliente.fone || 'N/A'}</td>
                            <td className="align-middle text-center">{formatarData(cliente.dataEncaminhamento)}</td>
                            <td className="align-middle text-center">{formatarData1(cliente.venc)}</td>

                            <td className="align-middle text-center">
                                <Link to={`/app/home/fichacobrancamapsempresas/${cliente.id}`}> <i className="fa-solid fa-money-check-dollar green"> </i> </Link>
  
                                <Link to={`/app/fichaalterar/${cliente.id}`}> <i className="fa-solid fa-share"> </i> </Link>
                                <Link to={`/app/comprovantes/${cliente.id}`}> <i className="fa-solid fa-file-invoice icone-acao"> </i> </Link>

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