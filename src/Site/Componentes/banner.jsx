import React, { useEffect, useRef } from "react";
import './banner.css';
import VanillaTilt from 'vanilla-tilt';

function Banner() {
    const tiltRef = useRef(null);

    useEffect(() => {
        if (tiltRef.current) {
            VanillaTilt.init(tiltRef.current, {
                max: 25,
                speed: 400,
            });
        }
    }, []);

    return (
        <section className="banner" id="inicio">
            <div className="container">
                <div className="row itens-banner">
                    <div className="text-banner col-md-6">
                        <h1>Soluções Digitais e Serviços Empresariais</h1>
                        <p>Revolucione sua marca e conquiste o mercado com nossas soluções digitais poderosas. Expandimos os
                            horizontes da sua empresa com inovação e tecnologia de ponta, garantindo presença marcante e
                            resultados excepcionais. 
                            </p>
                        <div className="btn-banner">
                            <a href="#servicos" className="btn btn-banner1">Nossos Serviços</a>
                            <a href="https://wa.link/cibopv" className="btn btn-banner2">Contato</a>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3" ref={tiltRef} style={{
                        willChange: 'transform',
                        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                    }}>
                        <img src="img/img-banner.png" className="img-fluid" alt="Imagem do banner" />
                    </div>
                </div>
            </div>
            <svg className="onda-svg" viewBox="0 0 1100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path fill="#F0F0F2" d="M 0 66 C 174 0 320 50 530 50 C 740 50 880 0 1100 66 V 100 H 0 Z"></path>
            </svg>
            
        </section>
        
    );
}

export default Banner;
