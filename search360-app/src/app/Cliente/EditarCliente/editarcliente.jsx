import React, { useState, useEffect } from "react";
import { Link, useNavigate, Navigate, useParams } from "react-router-dom";
import "./editarcliente.css";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

function EditarCliente() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [fone, setFone] = useState("");
  const [razao, setRazao] = useState("");
  const [operador, setOperador] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [cargo, setCargo] = useState("");
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
  const [linkPagina, setLinkPagina] = useState("");
  const [tags, setTags] = useState("");
  const [mapa, setMapa] = useState("");
  const [descricao, setDescricao] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [cep, setCep] = useState("");
  const [cartaoDigital, setCartaoDigital] = useState("");
  const [fotoEntrada, setFotoEntrada] = useState(null);
  const [fotoPreview, setFotoPreview] = useState("");
  const [horarioSegunda, setHorarioSegunda] = useState("");
  const [horarioTerca, setHorarioTerca] = useState("");
  const [horarioQuarta, setHorarioQuarta] = useState("");
  const [horarioQuinta, setHorarioQuinta] = useState("");
  const [horarioSexta, setHorarioSexta] = useState("");
  const [horarioSabado, setHorarioSabado] = useState("");
  const [horarioDomingo, setHorarioDomingo] = useState("");
  const [horarioFeriado, setHorarioFeriado] = useState("");
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
          setCnpj(dados.cnpj || "");
          setFantasia(dados.fantasia || "");
          setData(dados.data || "");
          setOperador(dados.operador || "");
          setVenc(dados.venc || "");
          setLink(dados.link || "");
          setEstado(dados.estado || "");
          setCep(dados.cep || "");
          setCidade(dados.cidade || "");
          setBairro(dados.bairro || "");
          setRamo(dados.ramo || "");
          setCargo(dados.cargo || "");
          setFacebook(dados.facebook || "");
          setInstagram(dados.instagram || "");
          setWhatsapp(dados.whatsapp || "");
          setEndereco(dados.endereco || "");
          setBooking(dados.booking || "");
          setNumero(dados.numero || "");
          setSite(dados.site || "");
          setHorarioSegunda(dados.horarioSegunda || "");
          setHorarioTerca(dados.horarioTerca || "");
          setHorarioQuarta(dados.horarioQuarta || "");
          setHorarioQuinta(dados.horarioQuinta || "");
          setHorarioSexta(dados.horarioSexta || "");
          setHorarioSabado(dados.horarioSabado || "");
          setHorarioDomingo(dados.horarioDomingo || "");
          setHorarioFeriado(dados.horarioFeriado || "");
          setTags(dados.tags || "");
          setMapa(dados.mapa || "");
          setDescricao(dados.descricao || "");
          setCartaoDigital(dados.cartaoDigital || "");
          setQrCode(dados.qrCode || "");
          setLinkPagina(dados.linkPagina || "");
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
          cnpj,
          fantasia,
          data,
          operador,
          venc,
          link,
          cargo,
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
          horarioDomingo,
          horarioFeriado,
          horarioQuarta,
          horarioQuinta,
          horarioSabado,
          horarioSegunda,
          horarioSexta,
          horarioTerca,
          tags,
          mapa,
          descricao,
          cartaoDigital,
          qrCode,
          linkPagina,
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
                label: "CPF",
                name: "cpf",
                setter: setCpf,
                value: cpf,
                type: "text",
                placeholder: "Insira o CPF neste campo",
              },
              {
                label: "CNPJ",
                name: "cnpj",
                setter: setCnpj,
                value: cnpj,
                type: "text",
                placeholder: "Insira o CNPJ neste campo",
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
                label: "CARGO",
                name: "cargo",
                setter: setCargo,
                value: cargo,
                type: "text",
                placeholder: "Insira o cargo do cliente neste campo",
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
                label: "CEP",
                name: "cep",
                setter: setCep,
                value: cep,
                type: "text",
                placeholder: "Insira o cep neste campo",
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
                label: "Cartão Digital",
                name: "cartaoDigital",
                setter: setCartaoDigital,
                value: cartaoDigital,
                type: "text",
                placeholder: "Insira o link do cartao digital",
              },
              {
                label: "Qr Code",
                name: "qrCode",
                setter: setQrCode,
                value: qrCode,
                type: "text",
                placeholder: "Insira o link do Qr Code",
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
                label: "DESCRIÇÂO",
                name: "descricao",
                setter: setDescricao,
                value: descricao,
                type: "text",
                placeholder: "Insira as descrição neste campo",
              },
              {
                label: "Horário Segunda",
                name: "horarioSegunda",
                setter: setHorarioSegunda,
                value: horarioSegunda,
              },
              {
                label: "Horário Terça",
                name: "horarioTerca",
                setter: setHorarioTerca,
                value: horarioTerca,
              },
              {
                label: "Horário Quarta",
                name: "horarioQuarta",
                setter: setHorarioQuarta,
                value: horarioQuarta,
              },
              {
                label: "Horário Quinta",
                name: "horarioQuinta",
                setter: setHorarioQuinta,
                value: horarioQuinta,
              },
              {
                label: "Horário Sexta",
                name: "horarioSexta",
                setter: setHorarioSexta,
                value: horarioSexta,
              },
              {
                label: "Horário Sábado",
                name: "horarioSabado",
                setter: setHorarioSabado,
                value: horarioSabado,
              },
              {
                label: "Horário Domingo",
                name: "horarioDomingo",
                setter: setHorarioDomingo,
                value: horarioDomingo,
              },
              {
                label: "Horário Feriado",
                name: "horarioFeriado",
                setter: setHorarioFeriado,
                value: horarioFeriado,
              },

              {
                label: "TAGS",
                name: "tags",
                setter: setTags,
                value: tags,
                type: "text",
                placeholder: "Insira as tags neste campo",
              },
              {
                label: "Link da página",
                name: "linkPagina",
                setter: setLinkPagina,
                value: linkPagina,
                type: "text",
                placeholder: "Insira o link da pagina",
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
                  onChange={handleChange(field.setter)}
                  placeholder={field.placeholder}
                />
              </div>
            ))}

            <div className="form-group col-md-6 d-flex justify-content-center input-img mt-5">
              <label
                htmlFor="img-input"
                className="flex flex-col items-center justify-center w-full max-w-sm h-72 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition"
              >
                <div className="flex flex-col items-center justify-center w-full h-full p-4 ">
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
