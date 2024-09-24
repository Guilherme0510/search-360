import React from "react";
import './testemunho.css'

function Testemunho(){
  return (
    <section className="servicos" id="servicos">
      <div className="container">
        <div className="text-center pb-5">
          <h1>Nossos Serviços</h1>
        </div>
        <div>
          <div className="row col-md-12 serv text-center">
            <div className="col-md-4 box-serv col-10">
              <div className="info-serv my-4">
                <i className="fa-solid fa-globe"></i>
                <svg
                  className="onda-svg-serv"
                  viewBox="0 0 800 50"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  width="300"
                  height="40"
                >
                  <defs>
                    <linearGradient id="gradiente-onda" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#A240B6', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#374DDC', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#gradiente-onda)"
                    d="M 0 40 C 100 0, 200 20, 300 10 C 400 0, 500 20, 600 10 C 700 0, 800 20, 800 40 V 50 H 0 Z"
                  />
                </svg>
                <div className="head-serv">
                  <h4>Sites profissionais</h4>
                </div>
                <p>
                  Crie um site profissional e intuitivo, otimizado para todos os dispositivos. Utilizamos
                  JavaScript, WordPress, Bootstrap e React.js para garantir funcionalidade e design de
                  alta qualidade.
                </p>
              </div>
              <svg
                className="onda-svg-serv2"
                viewBox="0 0 800 50"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                width="300"
                height="40"
              >
                <defs>
                  <linearGradient id="gradiente-onda" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#A240B6', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#374DDC', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#gradiente-onda)"
                  d="M 0 40 C 100 0, 200 20, 300 10 C 400 0, 500 20, 600 10 C 700 0, 800 20, 800 40 V 50 H 0 Z"
                />
              </svg>
            </div>
            <div className="col-md-4 box-serv col-10">
              <div className="info-serv my-4">
                <i className="fa-solid fa-cart-shopping"></i>
                <svg
                  className="onda-svg-serv"
                  viewBox="0 0 800 50"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  width="300"
                  height="40"
                >
                  <defs>
                    <linearGradient id="gradiente-onda" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#A240B6', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#374DDC', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#gradiente-onda)"
                    d="M 0 40 C 100 0, 200 20, 300 10 C 400 0, 500 20, 600 10 C 700 0, 800 20, 800 40 V 50 H 0 Z"
                  />
                </svg>
                <div className="head-serv">
                  <h4>E-commerce</h4>
                </div>
                <p>
                  Criamos seu e-commerce seguro e escalável, com até 15 produtos grátis, controle de
                  estoque em tempo real, métodos de pagamento variados, e suporte técnico para aumentar
                  suas vendas online.
                </p>
                <svg
                  className="onda-svg-serv2"
                  viewBox="0 0 800 50"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  width="300"
                  height="40"
                >
                  <defs>
                    <linearGradient id="gradiente-onda" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#A240B6', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#374DDC', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#gradiente-onda)"
                    d="M 0 40 C 100 0, 200 20, 300 10 C 400 0, 500 20, 600 10 C 700 0, 800 20, 800 40 V 50 H 0 Z"
                  />
                </svg>
              </div>
            </div>
            <div className="col-md-4 box-serv col-10">
              <div className="info-serv my-4">
                <i className="fa-solid fa-pen-to-square"></i>
                <svg
                  className="onda-svg-serv"
                  viewBox="0 0 800 50"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  width="300"
                  height="40"
                >
                  <defs>
                    <linearGradient id="gradiente-onda" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#A240B6', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#374DDC', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#gradiente-onda)"
                    d="M 0 40 C 100 0, 200 20, 300 10 C 400 0, 500 20, 600 10 C 700 0, 800 20, 800 40 V 50 H 0 Z"
                  />
                </svg>
                <div className="head-serv">
                  <h4>Sistemas</h4>
                </div>
                <p>
                  Oferecemos sistemas personalizados avançados para automatizar processos, gerenciar CRM,
                  controlar acessos e fornecer funcionalidades essenciais às necessidades da sua empresa.
                </p>
                <svg
                  className="onda-svg-serv2"
                  viewBox="0 0 800 50"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  width="300"
                  height="40"
                >
                  <defs>
                    <linearGradient id="gradiente-onda" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#A240B6', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#374DDC', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#gradiente-onda)"
                    d="M 0 40 C 100 0, 200 20, 300 10 C 400 0, 500 20, 600 10 C 700 0, 800 20, 800 40 V 50 H 0 Z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="div-serv pt-5 mt-1">
            <a href="https://wa.link/cibopv" className="btn btn-serv btn-success">Saiba Mais</a>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Testemunho;