import React, { useState, useEffect } from "react";
import { Link, useNavigate, Navigate, useParams } from "react-router-dom";
import "./editarcliente.css";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

function EditarCliente() {
  // Estados para novos campos
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [fone, setFone] = useState("");
  const [razao, setRazao] = useState("");
  const [operador, setOperador] = useState("");
  const [cpf, setCpf] = useState("");
  const [data, setData] = useState("");
  const [fantasia, setFantasia] = useState("");
  const [venc, setVenc] = useState("");
  const [link, setLink] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [ramo, setRamo] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [endereco, setEndereco] = useState("");
  const [booking, setBooking] = useState("");
  const [numero, setNumero] = useState("");
  const [site, setSite] = useState("");
  const [horario, setHorario] = useState("");
  const [tags, setTags] = useState("");
  const [mapa, setMapa] = useState("");
  const [descricao, setDescricao] = useState("");
  const [fotoEntrada, setFotoEntrada] = useState(null);
  const [fotoPreview, setFotoPreview] = useState("");

  const db = getFirestore();
  const { id } = useParams();

  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate(-1); 
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clienteDocRef = doc(db, "clientes", id);
        const docSnapshot = await getDoc(clienteDocRef);
        if (docSnapshot.exists()) {
          const dados = docSnapshot.data();
          setNome(dados.nome || "");
          setEmail(dados.email || "");
          setFone(dados.fone || "");
          setRazao(dados.razao || "");
          setCpf(dados.cpf || "");
          setFantasia(dados.fantasia || "");
          setData(dados.data || "");
          setOperador(dados.operador || "");
          setVenc(dados.venc || "");
          setLink(dados.link || "");
          setEstado(dados.estado || "");
          setCidade(dados.cidade || "");
          setBairro(dados.bairro || "");
          setRamo(dados.ramo || "");
          setFacebook(dados.facebook || "");
          setInstagram(dados.instagram || "");
          setWhatsapp(dados.whatsapp || "");
          setEndereco(dados.endereco || "");
          setBooking(dados.booking || "");
          setNumero(dados.numero || "");
          setSite(dados.site || "");
          setHorario(dados.horario || "");
          setTags(dados.tags || "");
          setMapa(dados.mapa || "");
          setDescricao(dados.descricao || "");
          // Adicione a lógica para a imagem
          if (dados.fotoEntrada) {
            setFotoPreview(dados.fotoEntrada);
          }
        } else {
          setMensagem("Cliente não encontrado");
        }
      } catch (error) {
        setMensagem("Erro ao obter dados do cliente");
        console.error("Erro ao obter dados do cliente:", error);
      }
    };
    fetchData();
  }, [db, id]);

  const AlterarCliente = async () => {
    try {
      if (nome.length === 0) {
        setMensagem("Informe o nome");
      } else if (email.length === 0) {
        setMensagem("Informe o e-mail");
      } else {
        await updateDoc(doc(db, "clientes", id), {
          nome,
          email,
          fone,
          razao,
          cpf,
          fantasia,
          data,
          operador,
          venc,
          link,
          estado,
          cidade,
          bairro,
          ramo,
          facebook,
          instagram,
          whatsapp,
          endereco,
          booking,
          numero,
          site,
          horario,
          tags,
          mapa,
          descricao,
          fotoEntrada: fotoPreview,
        });
        setMensagem("");
        setSucesso("S");
      }
    } catch (erro) {
      setMensagem("Erro ao atualizar cliente");
      setSucesso("N");
      console.error("Erro ao atualizar cliente:", erro);
    }
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

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  return (
    <div>
      <div className="background">
        <div id="formId">
          <div className="quest row">
            {[
              {
                label: "RAZÃO SOCIAL",
                name: "razao",
                setter: setRazao,
                value: razao,
                type: "text",
                placeholder: "Insira a razão social neste campo",
              },
              {
                label: "CNPJ/CPF",
                name: "cpf",
                setter: setCpf,
                value: cpf,
                type: "text",
                placeholder: "Insira o CNPJ/CPF neste campo",
              },
              {
                label: "FANTASIA",
                name: "fantasia",
                setter: setFantasia,
                value: fantasia,
                type: "text",
                placeholder: "Insira o nome fantasia neste campo",
              },
              {
                label: "E-MAIL",
                name: "email",
                setter: setEmail,
                value: email,
                type: "text",
                placeholder: "Insira o e-mail neste campo",
              },
              {
                label: "TELEFONE",
                name: "fone",
                setter: setFone,
                value: fone,
                type: "text",
                placeholder: "Insira o telefone neste campo",
              },
              {
                label: "NOME",
                name: "nome",
                setter: setNome,
                value: nome,
                type: "text",
                placeholder: "Insira o nome do cliente neste campo",
              },
              {
                label: "OPERADOR",
                name: "operador",
                setter: setOperador,
                value: operador,
                type: "text",
                placeholder: "Insira o nome do operador neste campo",
              },
              {
                label: "DATA",
                name: "data",
                setter: setData,
                value: data,
                type: "date",
                placeholder: "Insira a data",
              },
              {
                label: "VENCIMENTO",
                name: "venc",
                setter: setVenc,
                value: venc,
                type: "date",
                placeholder: "Insira o vencimento",
              },
              {
                label: "LINK",
                name: "link",
                setter: setLink,
                value: link,
                type: "text",
                placeholder: "Insira o link do contrato neste campo",
              },
              {
                label: "ESTADO",
                name: "estado",
                setter: setEstado,
                value: estado,
                type: "text",
                placeholder: "Insira o estado neste campo",
              },
              {
                label: "CIDADE",
                name: "cidade",
                setter: setCidade,
                value: cidade,
                type: "text",
                placeholder: "Insira a cidade neste campo",
              },
              {
                label: "BAIRRO",
                name: "bairro",
                setter: setBairro,
                value: bairro,
                type: "text",
                placeholder: "Insira o bairro neste campo",
              },
              {
                label: "RAMO",
                name: "ramo",
                setter: setRamo,
                value: ramo,
                type: "text",
                placeholder: "Insira o ramo de atividade neste campo",
              },
              {
                label: "FACEBOOK",
                name: "facebook",
                setter: setFacebook,
                value: facebook,
                type: "text",
                placeholder: "Insira o link do Facebook neste campo",
              },
              {
                label: "INSTAGRAM",
                name: "instagram",
                setter: setInstagram,
                value: instagram,
                type: "text",
                placeholder: "Insira o link do Instagram neste campo",
              },
              {
                label: "WHATSAPP",
                name: "whatsapp",
                setter: setWhatsapp,
                value: whatsapp,
                type: "text",
                placeholder: "Insira o número do WhatsApp neste campo",
              },
              {
                label: "ENDEREÇO",
                name: "endereco",
                setter: setEndereco,
                value: endereco,
                type: "text",
                placeholder: "Insira o endereço neste campo",
              },
              {
                label: "BOOKING",
                name: "booking",
                setter: setBooking,
                value: booking,
                type: "text",
                placeholder: "Insira o link do Booking neste campo",
                className: "ola",
              },
              {
                label: "NÚMERO",
                name: "numero",
                setter: setNumero,
                value: numero,
                type: "text",
                placeholder: "Insira o número neste campo",
              },
              {
                label: "SITE",
                name: "site",
                setter: setSite,
                value: site,
                type: "text",
                placeholder: "Insira o site neste campo",
              },
              {
                label: "HORÁRIO",
                name: "horario",
                setter: setHorario,
                value: horario,
                type: "text",
                placeholder: "Insira o horário de funcionamento neste campo",
              },
              {
                label: "DESCRIÇÂO",
                name: "descricao",
                setter: setDescricao,
                value: descricao,
                type: "text",
                placeholder: "Insira as descrição neste campo",
              },
              {
                label: "TAGS",
                name: "tags",
                setter: setTags,
                value: tags,
                type: "text",
                placeholder: "Insira as tags neste campo",
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
                  name={field.name}
                  value={field.value || ""}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                />
              </div>
            ))}

            <div className="form-group col-md-6 d-flex justify-content-center input-img mt-5">
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

            {mensagem && (
              <div className="alert alert-danger" role="alert">
                {mensagem}
              </div>
            )}
          </div>
        </div>
      <div id="btn-form " className="d-flex justify-content-center">
        <button className="btn btn-danger mr-4" onClick={handleVoltar}>
          Voltar
        </button>
        <button className="btn btn-primary" onClick={AlterarCliente}>
          Salvar
        </button>
        {sucesso === "S" && <Navigate to="/app/home" />}
      </div>
      </div>
    </div>
  );
}

export default EditarCliente;
