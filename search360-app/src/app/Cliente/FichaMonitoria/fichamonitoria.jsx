import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from 'react-router-dom';
import './fichamonitoria.css'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import 'firebase/firestore'

function FichaMonitoria() {
    const [encaminharCliente, setEncaminharCliente] = useState(false);
    const [naoEncaminharCliente, setNaoEncaminharCliente] = useState(false);
    const [mensagem, setMensagem] = useState('');
    const [sucesso, setSucesso] = useState('');
    const db = getFirestore();
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('ID do Cliente:', id);
                const clienteDocRef = doc(db, 'clientes', id);
                console.log('Referência do Documento:', clienteDocRef);
                const docSnapshot = await getDoc(clienteDocRef);
                console.log('Snapshot do Documento:', docSnapshot.data());
                if (docSnapshot.exists()) {
                    const dados = docSnapshot.data();
                    setEncaminharCliente(dados.encaminharCliente);
                    setNaoEncaminharCliente(dados.naoEncaminharCliente);
                } else {
                    setMensagem('Cliente não encontrado');
                }
            } catch (error) {
                setMensagem('Erro ao obter dados do cliente');
                console.error('Erro ao obter dados do cliente:', error);
            }
        };
        fetchData();
    }, [db, id]);

    const AlterarCliente = async () => {
        try {
            const senhaDigitada = prompt("Digite sua senha:");
            if (senhaDigitada === '@') { // Verifica se a senha está correta
                await updateDoc(doc(db, 'clientes', id), {
                    encaminharCliente: encaminharCliente, // Alterado para naoEncaminharCliente
                    naoEncaminharCliente: naoEncaminharCliente,
                });
                setMensagem('');
                setSucesso('S');
            } else {
                setMensagem('Senha incorreta');
            }
        } catch (erro) {
            setMensagem('Erro ao atualizar cliente');
            setSucesso('N');
            console.error('Erro ao atualizar cliente:', erro);
        }
    };




    return (
        <div>
                <div className="background13">
                    <form className="box">

                        <div className=" box1">
                            <div className="title ">
                                <h1 className="text-center">
                                    <u>Site Concluido!</u>
                                </h1>
                            </div>
                        </div>
                        <div className="divMkt">
                            <h5>
                                Encaminhar cliente para o Jhonas?
                            </h5>
                        </div>
                        <div className="encaminhar row">

                            <div className="form-check mb-3">
                                <input onChange={(e) => setEncaminharCliente(e.target.checked)} checked={encaminharCliente} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Sim</b>
                                </label>
                            </div>
                            <div className="form-check mb-3">
                                <input onChange={(e) => setNaoEncaminharCliente(e.target.checked)} checked={naoEncaminharCliente} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Não</b>
                                </label>
                            </div>
                        </div>

                        {mensagem.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{mensagem}</div> : null}
                        {sucesso === 'S' ? <Navigate to='/app/monitoriamapsempresas' /> : null}
                    </form>
                </div >
            <div className="voltar row">
                <Link to="/app/monitoriamapsempresas" className="btn btn-warning btn-acao">Voltar</Link>
                <button onClick={AlterarCliente} type="button" className="btn btn-primary btn-acao">Salvar</button>
            </div>
        </div >
    );
}

export default FichaMonitoria;