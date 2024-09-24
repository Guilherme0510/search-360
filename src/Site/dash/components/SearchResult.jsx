import React, { useState } from 'react';
import whatsapp_icon from '../../assets/whatsapp.png';
import facebook_icon from '../../assets/facebook.png';
import instagram_icon from '../../assets/instagram.png';
import ifood_icon from '../../assets/ifood.jpg';
import booking_icon from '../../assets/booking.png';
import site_icon from '../../assets/site.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCopy, faLocationDot, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';

const SearchResult = ({
  title,
  subtitle,
  description,
  mapUrl,
  endereco,
  iconFace,
  iconInsta,
  iconWhats,
  iconIfood,
  iconBooking,
  iconSite,
  iconFone,
  fotoEntrada,
  numero,
  horario,
  tags,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(endereco);
      alert('Endereço copiado para área de transferência!');
    } catch (err) {
      console.error('Erro ao copiar texto: ', err);
      alert('Erro ao copiar endereço.');
    }
  };

  const hasIcons =
    iconFace ||
    iconInsta ||
    iconWhats ||
    iconIfood ||
    iconBooking ||
    iconSite ||
    iconFone;

  return (
    <div className="search-result">
      <div className="text-content">
        <h3>{title}</h3>
        <h4>{subtitle}</h4>
        <p className="result-description">
          <FontAwesomeIcon icon={faLocationDot} className="icon_location" /> 
          {endereco} 
          <FontAwesomeIcon
            onClick={copyText}
            className="icon_copy"
            icon={faCopy}
          />
        </p>
        <p className="result-description">
          <FontAwesomeIcon icon={faClock} className="icon_clock" />
          {horario}
        </p>
        <p>
          {numero ? (
            <>
              <FontAwesomeIcon icon={faPhoneAlt} className="icon_telefone" />
              <a href={`tel:${numero}`}>{numero}</a>
            </>
          ) : (
            'Número não disponível'
          )}
        </p>

        <p>
          {isExpanded ? description : truncateText(description, 20)}
          <span
            onClick={toggleDescription}
            style={{ color: 'blue', cursor: 'pointer' }}
          >
            {isExpanded ? ' Ver menos' : ' Ver mais'}
          </span>
        </p>

        {hasIcons && (
          <div className="icons">
            {iconFone && (
              <a
                className="btn btn-primary"
                href={`tel:${numero}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faPhoneAlt}
                  className="fontawesome_tel"
                />
              </a>
            )}
            {iconFace && (
              <a href={iconFace} target="_blank" rel="noopener noreferrer">
                <img src={facebook_icon} alt="Facebook" />
              </a>
            )}
            {iconInsta && (
              <a href={iconInsta} target="_blank" rel="noopener noreferrer">
                <img src={instagram_icon} alt="Instagram" />
              </a>
            )}
            {iconWhats && (
              <a href={iconWhats} target="_blank" rel="noopener noreferrer">
                <img src={whatsapp_icon} alt="WhatsApp" />
              </a>
            )}
            {iconBooking && (
              <a href={iconBooking} target="_blank" rel="noopener noreferrer">
                <img src={booking_icon} alt="Booking" />
              </a>
            )}
            {iconIfood && (
              <a href={iconIfood} target="_blank" rel="noopener noreferrer">
                <img src={ifood_icon} alt="Ifood" />
              </a>
            )}
            {iconSite && (
              <a href={iconSite} target="_blank" rel="noopener noreferrer">
                <img src={site_icon} alt="Site" />
              </a>
            )}
          </div>
        )}
      </div>
      <div className="map-container">
        {fotoEntrada && (
          <div className="foto">
            <img src={fotoEntrada} alt="Foto de Entrada" className="img-dash" />
          </div>
        )}
        {mapUrl && (
          <div className="map">
            <iframe src={mapUrl} title={title} allowFullScreen></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
