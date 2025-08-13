import React from 'react';
import './Galeria.css'; // Adicione seu arquivo CSS correspondente

const Galeria = () => {
  return (
    <section>
      <div className="container galeria">
        <div className="text-center">
          <small>Serviços recentes</small>
          <h1>Nosso Portifólio</h1>
        </div>
        <div className="row text-center gale col-md-12">
          <div className="col-md-4 box-galeria col-6">
            <div className="info-galeria">
                <div className="galeria-img01">
                  <img src="img/img-galeria01.png" alt="" className="img-fluid" />
                </div>
            </div>
          </div>
          <div className="col-md-4 box-galeria col-6">
            <div className="info-galeria">
                <div className="galeria-img02">
                  <img src="img/img-galeria02.png" alt="" className="img-fluid" />
                </div>
            </div>
          </div>
          <div className="col-md-4 box-galeria col-6">
            <div className="info-galeria">
                <div className="galeria-img03">
                  <img src="img/img-galeria03.png" alt="" className="img-fluid" />
                </div>
            </div>
          </div>
        </div>
        <div className="row text-center gale col-md-12">
          <div className="col-md-4 box-galeria col-6">
            <div className="info-galeria">
                <div className="galeria-img01">
                  <img src="img/img-galeria04.png" alt="" className="img-fluid" />
                </div>
            </div>
          </div>
          <div className="col-md-4 box-galeria col-6">
            <div className="info-galeria">
                <div className="galeria-img02">
                  <img src="img/img-galeria05.png" alt="" className="img-fluid" />
                </div>
            </div>
          </div>
          <div className="col-md-4 box-galeria col-6">
            <div className="info-galeria">
                <div className="galeria-img03">
                  <img src="img/img-galeria06.png" alt="" className="img-fluid" />
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Galeria;
