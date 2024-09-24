import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';
import './novocliente.css';

function NovoCliente() {

    const [fotoEntrada, setFotoEntrada] = useState(null);
    const [fotoPreview, setFotoPreview] = useState("");

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFotoEntrada(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setFotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        fone: '',
        razao: '',
        cpf: '',
        fantasia: '',
        data: '',
        operador: '',
        venc: '',
        link: '',
        encaminharCliente: false,
        naoEncaminharCliente: false,
        encaminharClienteCobranca: false,
        naoEncaminharClienteCobranca: false,
        dataEncaminhamento: '',
        dataCobranca: '',
        vencimentoCobranca: '',
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
        mapa: '',
        descricao: ''
    });

    const [clientes, setClientes] = useState([]);
    const [mensagem, setMensagem] = useState('');
    const [sucesso, setSucesso] = useState('');
    const navigate = useNavigate();
    const db = getFirestore();

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
            navigate('/app/home/novocliente');
            return;
        }
        const q = query(collection(db, 'clientes'), where('userId', '==', user.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const clientesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setClientes(clientesData);
        });
        return () => unsubscribe();
    }, [navigate, db]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const cadastrarCliente = async () => {
        const auth = getAuth();
        const userId = auth.currentUser.uid;

        const { nome, cpf, email } = formData;
        if (!nome) {
            setMensagem('Informe o nome do autorizante 😤');
            return;
        }
        if (!cpf) {
            setMensagem('Informe o CNPJ ou CPF do cliente 😤');
            return;
        }
        if (!email) {
            setMensagem('Informe o email do cliente 😤');
            return;
        }

        try {
            await addDoc(collection(db, "clientes"), {
                ...formData,
                fotoEntrada: fotoPreview,
                createdBy: userId,
                createdAt: new Date().toISOString(),
            });

            setFormData({
                nome: '',
                email: '',
                fone: '',
                razao: '',
                cpf: '',
                fantasia: '',
                data: '',
                operador: '',
                venc: '',
                link: '',
                encaminharCliente: false,
                naoEncaminharCliente: false,
                encaminharClienteCobranca: false,
                naoEncaminharClienteCobranca: false,
                dataEncaminhamento: '',
                dataCobranca: '',
                vencimentoCobranca: '',
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
                mapa: '',
                descricao: ''
            });
            setFotoPreview('');
            setMensagem('');
            setSucesso('S');
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
            setMensagem('Ocorreu um erro ao cadastrar o cliente. Por favor, tente novamente.');
            setSucesso('N');
        }
    };
    return (
        <div>
            <div className="background">
                <div id="formId">
                    <div className="quest row">
                        {[
                            { label: 'RAZÃO SOCIAL', name: 'razao', type: 'text', placeholder: 'Insira a razão social neste campo' },
                            { label: 'CNPJ/CPF', name: 'cpf', type: 'text', placeholder: 'Insira o CNPJ/CPF neste campo' },
                            { label: 'FANTASIA', name: 'fantasia', type: 'text', placeholder: 'Insira o nome fantasia neste campo' },
                            { label: 'E-MAIL', name: 'email', type: 'text', placeholder: 'Insira o e-mail neste campo' },
                            { label: 'TELEFONE', name: 'fone', type: 'text', placeholder: 'Insira o telefone neste campo' },
                            { label: 'NOME', name: 'nome', type: 'text', placeholder: 'Insira o nome do cliente neste campo' },
                            { label: 'OPERADOR', name: 'operador', type: 'text', placeholder: 'Insira o nome do operador neste campo' },
                            { label: 'DATA', name: 'data', type: 'date', placeholder: 'Insira a data' },
                            { label: 'VENCIMENTO', name: 'venc', type: 'date', placeholder: 'Insira o vencimento' },
                            { label: 'LINK', name: 'link', type: 'text', placeholder: 'Insira o link do contrato neste campo' },
                            { label: 'ESTADO', name: 'estado', type: 'text', placeholder: 'Insira o estado neste campo' },
                            { label: 'CIDADE', name: 'cidade', type: 'text', placeholder: 'Insira a cidade neste campo' },
                            { label: 'BAIRRO', name: 'bairro', type: 'text', placeholder: 'Insira o bairro neste campo' },
                            { label: 'RAMO', name: 'ramo', type: 'text', placeholder: 'Insira o ramo de atividade neste campo' },
                            { label: 'FACEBOOK', name: 'facebook', type: 'text', placeholder: 'Insira o link do Facebook neste campo' },
                            { label: 'INSTAGRAM', name: 'instagram', type: 'text', placeholder: 'Insira o link do Instagram neste campo' },
                            { label: 'WHATSAPP', name: 'whatsapp', type: 'text', placeholder: 'Insira o número do WhatsApp neste campo' },
                            { label: 'ENDEREÇO', name: 'endereco', type: 'text', placeholder: 'Insira o endereço neste campo' },
                            { label: 'BOOKING', name: 'booking', type: 'text', placeholder: 'Insira o link de booking neste campo' },
                            { label: 'NÚMERO', name: 'numero', type: 'text', placeholder: 'Insira o número neste campo' },
                            { label: 'SITE', name: 'site', type: 'text', placeholder: 'Insira o site neste campo' },
                            { label: 'HORÁRIO', name: 'horario', type: 'text', placeholder: 'Insira o horário de funcionamento neste campo' },
                            { label: 'DESCRIÇÂO', name: 'descricao', type: 'text', placeholder: 'Insira a descrição neste campo' },
                            { label: 'TAGS', name: 'tags', type: 'text', placeholder: 'Insira as tags neste campo' },
                        ].map((field, index) => (
                            <div className="col-md-4" key={index}>
                                <label className="d-flex align-items-center justify-content-center text-light" htmlFor={field.name}>
                                    <b>{field.label}:</b>
                                </label>
                                <input
                                    type={field.type}
                                    id={field.name}
                                    name={field.name}
                                    onChange={handleChange}
                                    value={formData[field.name]}
                                    className="form-control"
                                    placeholder={field.placeholder}
                                />
                            </div>
                        ))}
                        <div className="col-md-6">
                            <label className="text-light"><b>MAPA:</b></label>
                            <input
                                type="text"
                                name="mapa"
                                value={formData.mapa}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Insira a URL do mapa"
                            />
                            {formData.mapa && (
                                <iframe
                                    src={formData.mapa}
                                    width="100%"
                                    height="200"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                            )}
                        </div>

                        <div className="form-group col-md-6 input-img">
                            <label
                                htmlFor="img-input"
                                className="flex flex-col items-center justify-center w-full max-w-sm h-72 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition"
                            >
                                <div className="flex flex-col items-center justify-center w-full h-full p-4">
                                    {fotoPreview ? (
                                        <img
                                            src={fotoPreview}
                                            alt="Preview"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <p className="mt-2 text-sm text-gray-600 text-dark">Clique para adicionar a foto</p>
                                    )}
                                    <input
                                        id="img-input"
                                        name="img-input"
                                        type="file"
                                        accept="image/*"
                                        className="d-none"
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </label>
                        </div>

                    </div>


                    {mensagem && <div className="alert alert-danger mt-2" role="alert">{mensagem}</div>}
                    {sucesso === 'S' && <Navigate to='/app/home' />}
                </div>
            </div>
            <div className="row salvar">
                <Link to="/app/home" className="btn btn-warning btn-acao">Cancelar</Link>
                <button onClick={cadastrarCliente} type="button" className="btn btn-primary btn-acao">Salvar</button>
            </div>
        </div>
    );
}

export default NovoCliente;
