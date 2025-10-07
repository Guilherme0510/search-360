import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";
import "./Contrato.css";
import CaixaAmarela from "./CaixaAmarela";

const Contrato = () => {
  const { id } = useParams();
  const db = getFirestore();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [fone, setFone] = useState("");
  const [razao, setRazao] = useState("");
  const [operador, setOperador] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [data, setData] = useState("");
  const [fantasia, setFantasia] = useState("");
  const [venc, setVenc] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [ramo, setRamo] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cargo, setCargo] = useState("");
  const [numero, setNumero] = useState("");
  const [horarioSegunda, setHorarioSegunda] = useState("");
  const [horarioTerca, setHorarioTerca] = useState("");
  const [horarioQuarta, setHorarioQuarta] = useState("");
  const [horarioQuinta, setHorarioQuinta] = useState("");
  const [horarioSexta, setHorarioSexta] = useState("");
  const [horarioSabado, setHorarioSabado] = useState("");
  const [horarioDomingo, setHorarioDomingo] = useState("");
  const [horarioFeriado, setHorarioFeriado] = useState("");
  const [loading, setLoading] = useState(true);
  const [linkPagina, setLinkPagina] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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
          setCep(dados.cep || "");
          setFantasia(dados.fantasia || "");
          setOperador(dados.operador || "");
          setData(dados.data || "");
          setVenc(dados.venc || "");
          setEstado(dados.estado || "");
          setCargo(dados.cargo || "");
          setCidade(dados.cidade || "");
          setBairro(dados.bairro || "");
          setRamo(dados.ramo || "");
          setWhatsapp(dados.whatsapp || "");
          setEndereco(dados.endereco || "");
          setNumero(dados.numero || "");
          setHorarioSegunda(dados.horarioSegunda || "");
          setHorarioTerca(dados.horarioTerca || "");
          setHorarioQuarta(dados.horarioQuarta || "");
          setHorarioQuinta(dados.horarioQuinta || "");
          setHorarioSexta(dados.horarioSexta || "");
          setHorarioSabado(dados.horarioSabado || "");
          setHorarioDomingo(dados.horarioDomingo || "");
          setHorarioFeriado(dados.horarioFeriado || "");
          setLinkPagina(dados.linkPagina || "");
        } else {
          setMensagem("Cliente não encontrado");
        }
      } catch (error) {
        setMensagem("Erro ao obter dados do cliente");
        console.error("Erro ao obter dados do cliente:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [db, id]);

  const gerarPDF = () => {
    if (loading) return;
    const elemento = document.getElementById("contrato");
    const options = {
      margin: 0,
      filename: `contrato-${nome || "cliente"}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(options).from(elemento).save();
  };

  function formatarDate(data) {
    const novaData = new Date(`${data}T00:00:00-03:00`); // Força fuso horário de Brasília
    const dia = String(novaData.getDate()).padStart(2, "0");
    const mes = String(novaData.getMonth() + 1).padStart(2, "0");
    const ano = novaData.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  const limparNumeros = (str) => str?.replace(/\D/g, "");
  return (
    <section className="container-contrato">
      <div className="box-contrato">
        <div className="contrato" id="contrato">
          <img src="/img/contrato_1.png" alt="" className="contrato-img-1" />
          <div className="d-flex justify-content-center">
            <div className="itens-contrato">
              <div className="header-contrato">
                <p className="fw-semibold">
                  DATA: <span className="fw-normal">{formatarDate(data)}</span>
                  <br />
                  <p>
                    VIGÊNCIA:{" "}
                    <span className="fw-normal">2025 / 2026 / 2027</span>
                  </p>
                </p>
                <p className="fw-semibold">
                  OPERADOR: <span className="fw-normal">{operador}</span>
                </p>
                <p className="fw-semibold">
                  CONTRATO Nº :{" "}
                  <span className="fw-normal">
                    {limparNumeros(cnpj || cpf)?.slice(0, 5) ||
                      "Valor Inválido"}
                  </span>
                </p>
              </div>
              <CaixaAmarela text={"DADOS DA EMPRESA"} />
              <div className="info-empresa row">
                <div className="col-md-6">
                  <p className="fw-semibold">
                    RAZÃO SOCIAL:{" "}
                    <span className="fw-normal">
                      {razao || "Não informado"}
                    </span>
                  </p>
                  <p className="fw-semibold">
                    NOME FANTASIA:{" "}
                    <span className="fw-normal">
                      {fantasia || "Não informado"}
                    </span>
                  </p>
                  <p className="fw-semibold">
                    ENDEREÇO COMERCIAL:{" "}
                    <span className="fw-normal">
                      {endereco || "Não informado"}
                    </span>
                  </p>
                  <p className="fw-semibold">
                    BAIRRO:{" "}
                    <span className="fw-normal">
                      {bairro || "Não informado"}
                    </span>
                  </p>
                  <p className="fw-semibold">
                    CIDADE:{" "}
                    <span className="fw-normal">
                      {cidade || "Não informado"}
                    </span>
                  </p>
                  <p className="fw-semibold">
                    ESTADO:{" "}
                    <span className="fw-normal">
                      {estado || "Não informado"}
                    </span>
                  </p>
                </div>
                <div className="col-md-6">
                  <p className="fw-semibold">
                    CNPJ:{" "}
                    <span className="fw-normal">{cnpj || "Não informado"}</span>
                  </p>
                  <p className="fw-semibold">
                    TELEFONE:{" "}
                    <span className="fw-normal">{fone || "Não informado"}</span>
                  </p>
                  <p className="fw-semibold">
                    WHATSAPP:{" "}
                    <span className="fw-normal">
                      {whatsapp || "Não informado"}
                    </span>
                  </p>
                  <p className="fw-semibold">
                    CELULAR:{" "}
                    <span className="fw-normal">
                      {whatsapp || "Não informado"}
                    </span>
                  </p>
                </div>
              </div>
              <CaixaAmarela text={"VISUALIZE SUA PÁGINA NO GOOGLE"} />
              <div>
                <p className="fw-semibold">
                  LINK DA PÁGINA:{" "}
                  <a
                    href={linkPagina}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="fw-normal">
                      {linkPagina.length > 30
                        ? `${linkPagina.slice(0, 30)}...`
                        : linkPagina}
                    </span>
                  </a>
                </p>
                <p className="fw-semibold">
                  EMAIL: <span className="fw-normal">{email}</span>
                </p>
                <p>
                  <span>TIPO DE ATUALIZAÇÃO:</span> CRIAR QR AVALIATIVO INCLUSÃO
                  DE FOTO SITE DE BUSCAS CARTÃO DIGITAL. <span>CONDIÇÕES:</span>
                  NºPARC. POR VIGENCIA.(10) 399.90 TREZENTOS E NOVENTA E NOVE
                  REAIS E NOVENTA CENTAVOS (BOLETO)(MENSAL).
                  <span> OBSERVAÇÃO:</span> FAZER A OTIMIZAÇÃO DA PÁGINA ,
                  CLIENTE COM BAIXA VISIBILIDADE, INCLUIR FOTOS E VIDEOS,
                  ATUALIZAR MAPEAMENTO NO GPS, INCLUIR BOTÃO DIRECIONADOR
                  WHATSAPP
                </p>
              </div>
              <CaixaAmarela text={"HORÁRIO DE FUNCIONAMENTO"} />
              <div className="d-flex align-items-center gap-4">
                <i className="fa-solid fa-clock fs-2 text-danger mt-2"></i>

                <div className="d-flex flex-column gap-2 w-50">
                  <span className="fw-semibold">
                    Domingo: {horarioDomingo || "Não informado"}
                  </span>
                  <span className="fw-semibold">
                    Segunda: {horarioSegunda || "Não informado"}
                  </span>
                  <span className="fw-semibold">
                    Terça: {horarioTerca || "Não informado"}
                  </span>
                  <span className="fw-semibold">
                    Quarta: {horarioQuarta || "Não informado"}
                  </span>
                </div>

                <div className="d-flex flex-column gap-2 w-50">
                  <span className="fw-semibold">
                    Quinta: {horarioQuinta || "Não informado"}
                  </span>
                  <span className="fw-semibold">
                    Sexta: {horarioSexta || "Não informado"}
                  </span>
                  <span className="fw-semibold">
                    Sábado: {horarioSabado || "Não informado"}
                  </span>
                  <span className="fw-semibold">
                    Feriado: {horarioFeriado || "Não informado"}
                  </span>
                </div>
              </div>
              <div className="footer-contrato">
                <p className="footer-contrato-nome">{nome}</p>
                <p className="footer-contrato-cargo">{cargo}</p>
              </div>
            </div>
          </div>
          <div className="page-break" />
          <div className="termos-contrato">
            <img src="/img/contrato_2.jpg" alt="" className="contrato-img-1" />
            <div className="footer-contrato">
              <p className="footer-contrato-nome">{nome}</p>
              <p className="footer-contrato-cargo">{cargo}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3 text-end">
        <button
          className="btn btn-danger"
          onClick={gerarPDF}
          disabled={loading}
        >
          {loading ? "Carregando..." : "Baixar PDF"}
        </button>
      </div>
    </section>
  );
};

export default Contrato;
