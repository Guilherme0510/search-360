import React from "react";
import './precos.css'
function Precos() {
    return (
        <section id="sobre" className="py-5 mt-1">
          <div className="linha-branca"></div>
          <div className="container pb-5 sobre col-10">
            <div className="dados-sobre row">
              <div className="img-sobre col-md-5 col-lg-5 col-sm-2 col-12">
                <img src="img/img-sobre.png" alt="Sobre nós" className="img-sobre1 img-fluid" />
              </div>
              <div className="text-sobre col-md-7 col-12 text-white">
                <div className="titulo-caixa text-center">
                  <h1 className="text-center py-4 mb-2">Sobre Nós</h1>
                  <div className="text-center">
                    <p className="text-white">
                    G Realize é uma empresa especializada em criação e desenvolvimento de websites. Nossa missão é ajudar empresas a se destacarem no ambiente digital através de estratégias eficazes e soluções personalizadas.
<br />
Com uma equipe dedicada de profissionais, oferecemos serviços de otimização para Google Maps para aumentar sua visibilidade local e atrair mais clientes. Além disso, criamos sites modernos e funcionais que refletem a identidade da sua marca e melhoram sua presença online.
<br />
Nossa Visão é ser a referência em marketing digital e desenvolvimento web, proporcionando resultados excepcionais e impulsionando o crescimento dos nossos clientes.
<br />
Nossos Valores incluem inovação, qualidade e compromisso com o sucesso dos nossos clientes. Trabalhamos com paixão para entregar soluções que atendam às suas necessidades e superem suas expectativas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
}
export default Precos;