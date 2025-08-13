import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import "./novocliente.css";
import axios from "axios";

function NovoCliente() {
  const [pagina, setPagina] = useState(1);
  const [fotoEntrada, setFotoEntrada] = useState(null);
  const [fotoPreview, setFotoPreview] = useState("");
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    fone: "",
    razao: "",
    cpf: "",
    cep: "",
    cnpj: "",
    cargo: "",
    fantasia: "",
    data: "",
    operador: "",
    venc: "",
    link: "",
    estado: "",
    cidade: "",
    bairro: "",
    ramo: "",
    facebook: "",
    instagram: "",
    whatsapp: "",
    endereco: "",
    booking: "",
    numero: "",
    site: "",
    horario: "",
    tags: "",
    mapa: "",
    descricao: "",
    qrCode: "",
    cartaoDigital: "",
    linkPagina: "",
  });

  const [clientes, setClientes] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [sucesso, setSucesso] = useState("");
  const navigate = useNavigate();
  const db = getFirestore();

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = phoneNumber.replace(/\D/g, "");

    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(
        6
      )}`;
    } else if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(
        7
      )}`;
    }
    return phoneNumber;
  };

  const formatValues = (values) => {
    const capitalize = (str) => {
      return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
    };
    if (Array.isArray(values)) {
      return values.map((item) =>
        typeof item === "string" ? capitalize(item) : item
      );
    }

    if (typeof values === "object" && values !== null) {
      return Object.keys(values).reduce((acc, key) => {
        acc[key] =
          typeof values[key] === "string"
            ? capitalize(values[key])
            : values[key];
        return acc;
      }, {});
    }
    return typeof values === "string" ? capitalize(values) : values;
  };

  const buscarCNPJ = async (cpf) => {
    try {
      const response = await axios.get(
        `https://search-360-backend.vercel.app/api/search_cnpj?cnpj=${cpf}`
      );

      const data = response.data;

      setFormData((prevData) => ({
        ...prevData,
        razao: formatValues(data.razao_social),
        fantasia: formatValues(data.nome_fantasia),
        endereco: formatValues(data.endereco.logradouro),
        bairro: formatValues(data.endereco.bairro),
        estado: formatValues(data.endereco.estado),
        cidade: formatValues(data.endereco.cidade),
        descricao: formatValues(data.atividade_principal),
        nome: formatValues(data.quadro_societario)
          .map((socio) => socio.nome)
          .join(", "),
        email: data.contato.email || "",
        fone: formatPhoneNumber(data.contato.telefone) || "",
        numero: formatPhoneNumber(data.contato.telefone) || "",
      }));

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      navigate("/app/home/novocliente");
      return;
    }
    const q = query(
      collection(db, "clientes"),
      where("userId", "==", user.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const clientesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClientes(clientesData);
    });
    return () => unsubscribe();
  }, [navigate, db]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Chama a função de busca se o campo for 'cpf'
    if (name === "cpf") {
      buscarCNPJ(value);
    }
  };

  const cadastrarCliente = async () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;

    const { nome, cpf, email } = formData;
    if (!isAllChecked) {
      setMensagem("Tenha certeza que os dados estão corretos");
    }
    try {
      await addDoc(collection(db, "clientes"), {
        ...formData,
        fotoEntrada: fotoPreview,
        userId: userId,
        createdAt: new Date().toISOString(),
      });

      setFormData({
        nome: "",
        email: "",
        fone: "",
        razao: "",
        cpf: "",
        cnpj: "",
        fantasia: "",
        data: "",
        cargo: "",
        cep: "",
        operador: "",
        venc: "",
        link: "",
        encaminharCliente: false,
        naoEncaminharCliente: false,
        encaminharClienteCobranca: false,
        naoEncaminharClienteCobranca: false,
        dataEncaminhamento: "",
        dataCobranca: "",
        vencimentoCobranca: "",
        estado: "",
        cidade: "",
        bairro: "",
        ramo: "",
        facebook: "",
        instagram: "",
        whatsapp: "",
        endereco: "",
        booking: "",
        numero: "",
        site: "",
        horario: "",
        tags: "",
        mapa: "",
        descricao: "",
        qrCode: "",
        cartaoDigital: "",
        linkPagina: "",
      });
      setFotoPreview("");
      setMensagem("");
      setSucesso("S");
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      setMensagem(
        "Ocorreu um erro ao cadastrar o cliente. Por favor, tente novamente."
      );
      setSucesso("N");
    }
  };

  const [checkboxes, setCheckboxes] = useState({
    razao: false,
    cpf: false,
    cnpj: false,
    fantasia: false,
    email: false,
    fone: false,
    nome: false,
    operador: false,
    data: false,
    venc: false,
    link: false,
    estado: false,
    cidade: false,
    bairro: false,
    ramo: false,
    facebook: false,
    mapa: false,
  });
  const isAllChecked = () => {
    const allFieldsFilled = Object.values(formData).every(
      (value) => value.trim() !== ""
    );

    // Verifica se os checkboxes obrigatórios estão marcados
    const requiredCheckboxes = ["razao", "cpf", "fantasia", "email", "nome"];
    const allCheckboxesChecked = requiredCheckboxes.every(
      (field) => checkboxes[field]
    );

    return allFieldsFilled && allCheckboxesChecked;
  };

  const handleCheckboxChange = (fieldName) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [fieldName]: !prevCheckboxes[fieldName],
    }));
  };

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
  const diasDaSemana = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];

  const camposPrincipais = [
    {
      label: "RAZÃO SOCIAL",
      name: "razao",
      type: "text",
      placeholder: "Insira a razão social",
    },
    { label: "CPF", name: "cpf", type: "text", placeholder: "Insira o CPF" },
    { label: "CNPJ", name: "cnpj", type: "text", placeholder: "Insira o CNPJ" },
    {
      label: "FANTASIA",
      name: "fantasia",
      type: "text",
      placeholder: "Insira o nome fantasia",
    },
    {
      label: "E-MAIL",
      name: "email",
      type: "text",
      placeholder: "Insira o e-mail",
    },
    {
      label: "TELEFONE",
      name: "fone",
      type: "text",
      placeholder: "Insira o telefone",
    },
    {
      label: "NOME",
      name: "nome",
      type: "text",
      placeholder: "Insira o nome do cliente",
    },
    {
      label: "CARGO",
      name: "cargo",
      type: "text",
      placeholder: "Insira o cargo do cliente",
    },
    {
      label: "OPERADOR",
      name: "operador",
      type: "text",
      placeholder: "Insira o operador",
    },
    {
      label: "Qr Code",
      name: "qrCode",
      type: "text",
      placeholder: "Insira o Qr Code",
    },
    {
      label: "Cartão Digital",
      name: "cartaoDigital",
      type: "text",
      placeholder: "Insira o link do cartão digital",
    },
    { label: "DATA", name: "data", type: "date", placeholder: "Insira a data" },
    {
      label: "VENCIMENTO",
      name: "venc",
      type: "date",
      placeholder: "Insira o vencimento",
    },
    {
      label: "LINK",
      name: "link",
      type: "text",
      placeholder: "Insira o link do contrato",
    },
    {
      label: "Link da página",
      name: "linkPagina",
      type: "text",
      placeholder: "Insira o link do da página do cliente",
    },
  ];

  const camposHorarioFuncionamento = diasDaSemana.flatMap((dia) => [
    {
      label: `${dia} - Abertura`,
      name: `abertura${dia}`,
      type: "time",
      placeholder: `Horário de abertura (${dia})`,
    },
    {
      label: `${dia} - Fechamento`,
      name: `fechamento${dia}`,
      type: "time",
      placeholder: `Horário de fechamento (${dia})`,
    },
  ]);

  const todosCampos = [...camposPrincipais, ...camposHorarioFuncionamento];

  return (
    <div>
      <div className="background add-novo-cliente">
        <div id="formId">
          {pagina === 1 && (
            <div className="quest row">
              {[
                {
                  label: "RAZÃO SOCIAL",
                  name: "razao",
                  type: "text",
                  placeholder: "Insira a razão social",
                },
                {
                  label: "CPF",
                  name: "cpf",
                  type: "text",
                  placeholder: "Insira o CPF",
                },
                {
                  label: "CNPJ",
                  name: "cnpj",
                  type: "text",
                  placeholder: "Insira o CNPJ",
                },
                {
                  label: "FANTASIA",
                  name: "fantasia",
                  type: "text",
                  placeholder: "Insira o nome fantasia",
                },
                {
                  label: "E-MAIL",
                  name: "email",
                  type: "text",
                  placeholder: "Insira o e-mail",
                },
                {
                  label: "TELEFONE",
                  name: "fone",
                  type: "text",
                  placeholder: "Insira o telefone",
                },
                {
                  label: "NOME",
                  name: "nome",
                  type: "text",
                  placeholder: "Insira o nome do cliente",
                },
                {
                  label: "CARGO",
                  name: "cargo",
                  type: "text",
                  placeholder: "Insira o cargo do cliente",
                },
                {
                  label: "OPERADOR",
                  name: "operador",
                  type: "text",
                  placeholder: "Insira o operador",
                },
                {
                  label: "Qr Code",
                  name: "qrCode",
                  type: "text",
                  placeholder: "Insira o Qr Code",
                },
                {
                  label: "Cartão Digital",
                  name: "cartaoDigital",
                  type: "text",
                  placeholder: "Insira o link do cartão digital",
                },
                {
                  label: "DATA",
                  name: "data",
                  type: "date",
                  placeholder: "Insira a data",
                },
                {
                  label: "VENCIMENTO",
                  name: "venc",
                  type: "date",
                  placeholder: "Insira o vencimento",
                },
                {
                  label: "LINK",
                  name: "link",
                  type: "text",
                  placeholder: "Insira o link do contrato",
                },
                {
                  label: "Link da página",
                  name: "linkPagina",
                  type: "text",
                  placeholder: "Insira o link do da página do cliente",
                },
              ].map((field, index) => (
                <div className="col-md-4" key={index}>
                  <label
                    className="d-flex align-items-center justify-content-center text-light"
                    htmlFor={field.name}
                  >
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
              <div className="col-md-12 text-center mt-4">
                <button
                  className="btn btn-danger"
                  onClick={() => window.history.go(-2)}
                >
                  Sair
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => setPagina(2)}
                >
                  Próximo
                </button>
              </div>
            </div>
          )}

          {pagina === 2 && (
            <div className="quest row">
              {[
                {
                  label: "ESTADO",
                  name: "estado",
                  type: "text",
                  placeholder: "Insira o estado neste campo",
                },
                {
                  label: "CIDADE",
                  name: "cidade",
                  type: "text",
                  placeholder: "Insira a cidade neste campo",
                },
                {
                  label: "BAIRRO",
                  name: "bairro",
                  type: "text",
                  placeholder: "Insira o bairro neste campo",
                },
                {
                  label: "RAMO",
                  name: "ramo",
                  type: "text",
                  placeholder: "Insira o ramo de atividade neste campo",
                },
                {
                  label: "FACEBOOK",
                  name: "facebook",
                  type: "text",
                  placeholder: "Insira o link do Facebook neste campo",
                },
                {
                  label: "INSTAGRAM",
                  name: "instagram",
                  type: "text",
                  placeholder: "Insira o link do Instagram neste campo",
                },
                {
                  label: "WHATSAPP",
                  name: "whatsapp",
                  type: "text",
                  placeholder: "Insira o número do WhatsApp neste campo",
                },
                {
                  label: "ENDEREÇO",
                  name: "endereco",
                  type: "text",
                  placeholder: "Insira o endereço neste campo",
                },
                {
                  label: "CEP",
                  name: "cep",
                  type: "text",
                  placeholder: "Insira o CEP neste campo",
                },
                {
                  label: "BOOKING",
                  name: "booking",
                  type: "text",
                  placeholder: "Insira o link de booking neste campo",
                },
                {
                  label: "NÚMERO",
                  name: "numero",
                  type: "text",
                  placeholder: "Insira o número neste campo",
                },
                {
                  label: "SITE",
                  name: "site",
                  type: "text",
                  placeholder: "Insira o site neste campo",
                },
                {
                  label: "DESCRIÇÂO",
                  name: "descricao",
                  type: "text",
                  placeholder: "Insira a descrição neste campo",
                },
                {
                  label: "TAGS",
                  name: "tags",
                  type: "text",
                  placeholder: "Insira as tags neste campo",
                },
                ...[
                  "Segunda",
                  "Terca",
                  "Quarta",
                  "Quinta",
                  "Sexta",
                  "Sabado",
                  "Domingo",
                  "Feriado"
                ].flatMap((dia) => [
                  {
                    label: `Horario de funcionamento ${dia}`,
                    name: `horario${dia}`,
                    type: "text",
                    placeholder: `Horário de funcionamento (${dia})`,
                  }
                ]),
              ].map((field, index) => (
                <div className="col-md-4" key={index}>
                  <label
                    className="d-flex align-items-center justify-content-center text-light"
                    htmlFor={field.name}
                  >
                    <b>{field.label}:</b>
                  </label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    onChange={handleChange}
                    value={formData[field.name] || ""}
                    className="form-control"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}

              <div className="col-md-4">
                <label className="text-light">
                  <b>MAPA:</b>
                </label>
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

              <div className="form-group col-md-12 input-img">
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
                      <p className="mt-2 text-sm text-gray-600 text-dark">
                        Clique para adicionar a foto
                      </p>
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

              <div className="col-md-12 text-center mt-4">
                <button
                  className="btn btn-secondary mr-2"
                  onClick={() => setPagina(1)}
                >
                  Voltar
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => setPagina(3)}
                >
                  Próximo
                </button>
              </div>
            </div>
          )}

          {pagina === 3 && (
            <div className="ver-infos">
              <h2 className="text-center">
                Veja se as informações estão certas
              </h2>
              <div className="row">
                {[
                  { label: "E-MAIL", name: "email", value: formData.email },
                  { label: "TELEFONE", name: "fone", value: formData.fone },
                  { label: "NOME", name: "nome", value: formData.nome },
                  { label: "ESTADO", name: "estado", value: formData.estado },
                  { label: "CIDADE", name: "cidade", value: formData.cidade },
                  { label: "BAIRRO", name: "bairro", value: formData.bairro },
                  { label: "RAMO", name: "ramo", value: formData.ramo },
                  {
                    label: "FACEBOOK",
                    name: "facebook",
                    value: formData.facebook,
                  },
                  {
                    label: "INSTAGRAM",
                    name: "instagram",
                    value: formData.instagram,
                  },
                  {
                    label: "WHATSAPP",
                    name: "whatsapp",
                    value: formData.whatsapp,
                  },
                  {
                    label: "ENDEREÇO",
                    name: "endereco",
                    value: formData.endereco,
                  },
                  {
                    label: "BOOKING",
                    name: "booking",
                    value: formData.booking,
                  },
                  { label: "NÚMERO", name: "numero", value: formData.numero },
                  { label: "SITE", name: "site", value: formData.site },
                  {
                    label: "HORÁRIO",
                    name: "horario",
                    value: formData.horario,
                  },
                  {
                    label: "DESCRIÇÃO",
                    name: "descricao",
                    value: formData.descricao,
                  },
                  { label: "TAGS", name: "tags", value: formData.tags },
                  { label: "MAPA", name: "mapa", value: formData.mapa },
                ].map((field, index) => (
                  <div className="col-md-4 mb-3" key={index}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="flex-grow-1 me-2">
                        <label className="form-label">
                          <b>{field.label}:</b>
                        </label>
                        <input
                          type="text"
                          name={field.name}
                          value={field.value}
                          className="form-control"
                          readOnly
                        />
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`checkbox-${field.name}`}
                          checked={checkboxes[field.name]}
                          onChange={() => handleCheckboxChange(field.name)}
                        />
                        <label
                          htmlFor={`checkbox-${field.name}`}
                          className="form-check-label"
                        >
                          Certo
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>MAPA:</b>
                  </label>
                  <input
                    type="text"
                    name="mapa"
                    value={formData.mapa}
                    className="form-control"
                    readOnly
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

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>FOTO:</b>
                  </label>
                  <div className="input-img">
                    {fotoPreview ? (
                      <img
                        src={fotoPreview}
                        alt="Preview"
                        className="img-fluid rounded"
                      />
                    ) : (
                      <p className="text-muted">Clique para adicionar a foto</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-12 text-center mt-4">
                <button
                  className="btn btn-secondary mr-2"
                  onClick={() => setPagina(2)}
                >
                  Voltar
                </button>
                <button
                  onClick={cadastrarCliente}
                  type="button"
                  className="btn btn-primary"
                  disabled={!isAllChecked}
                >
                  Salvar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {mensagem && (
        <div className="alert alert-danger mt-2" role="alert">
          {mensagem}
        </div>
      )}
      {sucesso === "S" && <Navigate to="/app/home" />}
    </div>
  );
}

export default NovoCliente;
