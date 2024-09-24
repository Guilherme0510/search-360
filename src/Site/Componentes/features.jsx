import React, { useState, useEffect, useRef } from 'react';
import './features.css'; // Certifique-se de criar um arquivo CSS com o estilo necessário

const Avaliacao = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef(null);
  const intervalRef = useRef(null);

  const slides = [
    {
      id: 'carousel__slide1',
      title: 'Facilidade na Localização',
      text: 'A empresa G Realize foi fundamental na criação do nosso site, integrando de forma eficiente facilitando a localização do google. Agora, nossos clientes encontram facilmente nossa localização e podem nos visitar sem problemas.',
      user: 'Ana Silva',
      imgSrc: 'img/img-user.png'
    },
    {
      id: 'carousel__slide2',
      title: 'Visibilidade Aumentada',
      text: 'Graças aos serviços da empresa de marketing, nosso site foi otimizado com o Google Maps, o que resultou em uma visibilidade muito maior online. Isso nos ajudou a atrair novos clientes e expandir nossa presença digital.',
      user: '',
      imgSrc: 'img/img-user.png'
    },
    {
      id: 'carousel__slide3',
      title: 'Integração Perfeita',
      text: 'Estamos muito satisfeitos com a integração do Google Maps no nosso site. A empresa de marketing fez um excelente trabalho em tornar a experiência do usuário intuitiva, permitindo que nossos clientes encontrem nossos escritórios e pontos de venda de maneira rápida e fácil.',
      user: '',
      imgSrc: 'img/img-user.png'
    },
    {
      id: 'carousel__slide4',
      title: 'Suporte Profissional',
      text: 'Recebemos um suporte excepcional da empresa de marketing durante todo o processo de criação do site e integração do Google Maps. Sua equipe foi proativa e sempre esteve disponível para responder nossas dúvidas e garantir que todas as funcionalidades estivessem operando perfeitamente.',
      user: '',
      imgSrc: 'img/img-user.png'
    }
  ];

  const showSlide = (index) => {
    if (slidesRef.current) {
      const viewport = slidesRef.current;
      viewport.classList.remove('slide-next', 'slide-prev');
      
      setCurrentIndex(index);

      viewport.classList.add(index > currentIndex ? 'slide-next' : 'slide-prev');

      setTimeout(() => {
        viewport.classList.remove('slide-next', 'slide-prev');
      }, 500); // Tempo deve corresponder ao tempo de transição do CSS
    }
  };

  const goToNextSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    intervalRef.current = setInterval(goToNextSlide, 3000); // Troca a cada 3 segundos

    return () => clearInterval(intervalRef.current); // Limpa o intervalo ao desmontar o componente
  }, []);

  useEffect(() => {
    showSlide(currentIndex);
  }, [currentIndex]);

  return (
    <section className="carousel py-5 mt-3" aria-label="Feedbacks">
      <div className="text-center py-4">
        <small>O que andam dizendo?</small>
        <h1>Avaliações de Clientes</h1>
      </div>
      <ol className="carousel__viewport" ref={slidesRef}>
        {slides.map((slide, index) => (
          <li key={slide.id} className={`carousel__slide ${index === currentIndex ? 'active' : ''}`}>
            <div className="feedback py-5 mx-3">
              <h3 className="pb-3">{slide.title}</h3>
              <p>{slide.text}</p>
              <div className="user text-center">
                {slide.imgSrc && <img src={slide.imgSrc} alt={slide.user} />}
                {slide.user && <h4>{slide.user}</h4>}
              </div>
            </div>
          </li>
        ))}
      </ol>
      <aside className="carousel__navigation">
        <button className="carousel__prev" onClick={goToPrevSlide}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <button className="carousel__next" onClick={goToNextSlide}>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </aside>
    </section>
  );
};

export default Avaliacao;
