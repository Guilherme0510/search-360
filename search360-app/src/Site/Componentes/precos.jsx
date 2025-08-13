import React from "react";
import './precos.css'
function Precos() {
    return (
        <section id="sobre" className="pb-4 mt-1">
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
                    Na SEARCH 360, somos apaixonados por conectar pessoas e lugares através da tecnologia de geolocalização. Nossa missão é garantir que as informações sobre locais no Google Maps sejam precisas, atualizadas e confiáveis, proporcionando uma experiência de navegação sem igual para usuários em todo o mundo.
<br />
Com uma equipe de especialistas em geoinformação, tecnologia da informação e análise de dados, dedicamo-nos a corrigir e otimizar dados geográficos, ajudando empresas e usuários a encontrar o que precisam, quando precisam. Sabemos que informações incorretas podem levar a frustrações e perdas, por isso trabalhamos incansavelmente para oferecer soluções eficazes que melhorem a visibilidade e a acessibilidade de negócios locais.
<br />
Nosso compromisso com a qualidade é refletido em nossos processos rigorosos de verificação de dados, que garantem que cada entrada seja precisa e relevante. Além disso, utilizamos tecnologia de ponta e inteligência artificial para monitorar e atualizar constantemente as informações, adaptando-nos rapidamente às mudanças no ambiente urbano.
<br />
Acreditamos que a geolocalização não é apenas sobre coordenadas, mas sobre conectar pessoas a experiências. Seja você um pequeno comerciante buscando aumentar sua presença online ou um usuário que deseja explorar novos lugares, estamos aqui para transformar dados em descobertas. Junte-se a nós nessa jornada e descubra como podemos ajudar você a navegar pelo mundo de forma mais eficiente e eficaz. 
<br />
SEARCH 360– Geolocalização que faz a diferença.
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