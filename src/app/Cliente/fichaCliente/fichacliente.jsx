import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import './fichacliente.css';

function FichaCliente() {
    const [loader, setLoader] = useState(false);
    const [formState, setFormState] = useState('');
    const [fotoEntrada, setFotoEntrada] = useState(null);
    const [fotoPreview, setFotoPreview] = useState("");
    const [cliente, setCliente] = useState({
        razao: '',
        cpf: '',
        nome: '',
        fantasia: '',
        email: '',
        fone: '',
        operador: '',
        data: '',
        venc: '',
        estado: '',
        cidade: '',
        bairro: '',
        ramo: '',
        facebook: '',
        instagram: '',
        whatsapp: '',
        endereco: '',
        booking: '',
        numero: '',
        site: '',
        horario: '',
        tags: '',
        descricao: '',
        link: ''
    });
    const [mensagem, setMensagem] = useState('');
    const db = getFirestore();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const clienteDocRef = doc(db, 'clientes', id);
                const docSnapshot = await getDoc(clienteDocRef);

                if (docSnapshot.exists()) {
                    setCliente(docSnapshot.data());
                    if (docSnapshot.data().fotoEntrada) {
                        setFotoPreview(docSnapshot.data().fotoEntrada);
                      }
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

    const handleOnClick = () => {
        window.history.back();
    };

    return (
        <div>
            <div className="background">
                <div id="formId">
                    <div className="quest row">
                        <div className="col-md-4">
                            <label className="text-light"><b>RAZÃO SOCIAL:</b></label>
                            <input type="text" value={cliente.razao} disabled className="form-control" placeholder="Insira a razão social" />
                        </div>
                        <div className="col-md-4">
                            <label className="text-light"><b>CNPJ/CPF:</b></label>
                            <input type="text" value={cliente.cpf} disabled className="form-control" placeholder="Insira o CNPJ/CPF" />
                        </div>
                        <div className="col-md-4">
                            <label className="text-light"><b>FANTASIA:</b></label>
                            <input type="text" value={cliente.fantasia} disabled className="form-control" placeholder="Insira o nome fantasia" />
                        </div>
                    </div>

                    <div className="quest row">
                        <div className="col-md-4">
                            <label className="text-light"><b>E-MAIL:</b></label>
                            <input type="text" value={cliente.email} disabled className="form-control" placeholder="Insira o e-mail" />
                        </div>
                        <div className="col-md-4">
                            <label className="text-light"><b>TELEFONE:</b></label>
                            <input type="text" value={cliente.fone} disabled className="form-control" placeholder="Insira o telefone" />
                        </div>
                        <div className="col-md-4">
                            <label className="text-light"><b>CLIENTE:</b></label>
                            <input type="text" value={cliente.nome} disabled className="form-control" placeholder="Insira o nome do cliente" />
                        </div>
                    </div>

                    <div className="quest row">
                        <div className="col-md-4">
                            <label className="text-light"><b>OPERADOR:</b></label>
                            <input type="text" value={cliente.operador} disabled className="form-control" placeholder="Insira o nome do operador" />
                        </div>
                        <div className="col-md-4">
                            <label className="text-light"><b>DATA:</b></label>
                            <input type="date" value={cliente.data} disabled className="form-control" />
                        </div>
                        <div className="col-md-4">
                            <label className="text-light"><b>VENCIMENTO:</b></label>
                            <input type="date" value={cliente.venc} disabled className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-12">
                            <label className="text-light"><b>LINK:</b></label>
                            <input type="TEXT" value={cliente.link} disabled className="form-control" />
                        </div>

                    <div className="quest row">
                        <div className="col-md-4">
                            <label className="text-light"><b>ESTADO:</b></label>
                            <input type="text" value={cliente.estado} disabled className="form-control" placeholder="Insira o estado" />
                        </div>
                        <div className="col-md-4">
                            <label className="text-light"><b>CIDADE:</b></label>
                            <input type="text" value={cliente.cidade} disabled className="form-control" placeholder="Insira a cidade" />
                        </div>
                        <div className="col-md-4">
                            <label className="text-light"><b>BAIRRO:</b></label>
                            <input type="text" value={cliente.bairro} disabled className="form-control" placeholder="Insira o bairro" />
                        </div>
                    </div>

                    <div className="quest row">
                        <div className="col-md-4">
                            <label className="text-light"><b>RAMO:</b></label>
                            <input type="text" value={cliente.ramo} disabled className="form-control" placeholder="Insira o ramo" />
                        </div>
                        <div className="col-md-4">
                            <label className="text-light"><b>FACEBOOK:</b></label>
                            <input type="text" value={cliente.facebook} disabled className="form-control" placeholder="Insira o link do Facebook" />
                        </div>
                        <div className="col-md-4">
                            <label className="text-light"><b>INSTAGRAM:</b></label>
                            <input type="text" value={cliente.instagram} disabled className="form-control" placeholder="Insira o link do Instagram" />
                        </div>
                    </div>

                    <div className="quest row">
                        <div className="col-md-4">
                            <label className="text-light"><b>WHATSAPP:</b></label>
                            <input type="text" value={cliente.whatsapp} disabled className="form-control" placeholder="Insira o número do WhatsApp" />
                        </div>
                        <div className="col-md-4">
                            <label className="text-light"><b>ENDEREÇO:</b></label>
                            <input type="text" value={cliente.endereco} disabled className="form-control" placeholder="Insira o endereço" />
                        </div>
                        <div className="col-md-4">
                            <label className="text-light"><b>BOOKING:</b></label>
                            <input type="text" value={cliente.booking} disabled className="form-control" placeholder="Insira o link do Booking" />
                        </div>
                    </div>

                    <div className="quest row">
                        <div className="col-md-4">
                            <label className="text-light"><b>NÚMERO:</b></label>
                            <input type="text" value={cliente.numero} disabled className="form-control" placeholder="Insira o número" />
                        </div>
                        <div className="col-md-4">
                            <label className="text-light"><b>SITE:</b></label>
                            <input type="text" value={cliente.site} disabled className="form-control" placeholder="Insira o site" />
                        </div>
                        <div className="col-md-4">
                            <label className="text-light"><b>HORÁRIO:</b></label>
                            <input type="text" value={cliente.horario} disabled className="form-control" placeholder="Insira o horário de funcionamento" />
                        </div>
                    </div>
                    <div className="quest row">
                        <div className="col-md-12">
                            <label className="text-light"><b>TAGS:</b></label>
                            <input type="text" value={cliente.tags} disabled className="form-control" placeholder="Insira as tags" />
                        </div>
                    </div>

                    <div className="quest row">
                        <div className="col-md-12">
                            <label className="text-light"><b>DESCRIÇÂO:</b></label>
                            <input type="text" value={cliente.descricao} disabled className="form-control" placeholder="Insira as tags" />
                        </div>
                    </div>

                    <div className="quest row">
                        <div className="col-md-4">
                            <label className="text-light"><b>MAPA:</b></label>
                            <input type="text" value={cliente.mapa} disabled className="form-control" placeholder="Insira a URL do mapa" />
                            {cliente.mapa && (
                                <iframe
                                    src={cliente.mapa}
                                    width="100%"
                                    height="200"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                            )}
                        </div>

                        <div className="col-md-4">
                            <label className="text-light"><b>FOTO:</b></label>
                            <input type="text" value={cliente.foto} disabled className="form-control" placeholder="Insira a URL da foto" />
                            {fotoPreview && (
                                <img
                                    src={fotoPreview}
                                    alt="Foto do cliente"
                                    width="100%"
                                    height="auto"
                                    style={{ borderRadius: '8px', marginTop: '10px' }}
                                />
                            )}
                        </div>
                    </div>

                    <div className="d-flex justify-content-center mt-3">
                        <button onClick={handleOnClick} className="btn btn-primary">Voltar</button>
                    </div>

                    {mensagem && (
                        <div className="alert alert-danger mt-3 text-center">{mensagem}</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FichaCliente;
