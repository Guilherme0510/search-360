import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import { collection, getDocs } from 'firebase/firestore'; 
import { getFirestore } from "firebase/firestore";
import SearchInput from '../dash/components/SearchInput';
import SearchResult from '../dash/components/SearchResult';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './components/styles/Dash.css';

const Dash = () => {
  const db = getFirestore();
  const location = useLocation();

  const [query, setQuery] = useState(new URLSearchParams(location.search).get('query') || '');
  const [selectedRamo, setSelectedRamo] = useState(''); // Estado para o ramo selecionado
  const [ramosOptions, setRamosOptions] = useState([]); // Opções de ramos
  const [filteredClients, setFilteredClients] = useState([]);
  const [currentClients, setCurrentClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allClients, setAllClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'clientes'));
        const clientsData = querySnapshot.docs.map(doc => doc.data());

        const sortedClients = clientsData.sort((a, b) => b.criadoEm - a.criadoEm);
        setAllClients(sortedClients);

        const ramos = [...new Set(clientsData.map(client => client.ramo))];
        setRamosOptions(ramos);
      } catch (error) {
        console.error("Erro ao buscar clientes: ", error);
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    const filtered = allClients.filter(client =>
      (client.fantasia ? client.fantasia.toLowerCase().includes(query.toLowerCase()) : false) ||
      (client.ramo ? client.ramo.toLowerCase().includes(query.toLowerCase()) : false) ||
      (client.tags ? client.tags.toLowerCase().includes(query.toLowerCase()) : false)
    ).filter(client => 
      selectedRamo ? client.ramo === selectedRamo : true // Aplica o filtro por ramo
    );

    setFilteredClients(filtered);
    setTotalPages(Math.ceil(filtered.length / 10));
    setCurrentClients(filtered.slice((currentPage - 1) * 10, currentPage * 10));
  }, [query, selectedRamo, currentPage, allClients]);

  const handleClearSearch = () => {
    setQuery('');
    setSelectedRamo(''); // Reseta o ramo selecionado
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
    window.scrollTo(0, 0);
  };

  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate(-1);
  }

  return (
    <div className="bg-dash">
      <button onClick={handleVoltar} className='btn btn-danger m-3 '><i className='fa-solid fa-arrow-left'></i></button>
      <div className="container-fluid dash-container">
        <div className="container section-result">
          <div className="row">
            <div className="col-12">
              <SearchInput
                query={query}
                setQuery={setQuery}
                selectedRamo={selectedRamo}
                setSelectedRamo={setSelectedRamo}
                ramosOptions={ramosOptions}
                handleClearSearch={handleClearSearch}
              />
              <h2 className="my-4">Clientes Encontrados: {filteredClients.length}</h2>
            </div>
          </div>

          <div className="row">
            {currentClients.map((client, index) => (
              <div key={index} className="col-md-6 col-lg-12 mb-4">
                <SearchResult
                  title={client.fantasia}
                  subtitle={client.ramo}
                  description={client.descricao || "Descrição não disponível"}
                  mapUrl={client.mapa}
                  fotoEntrada={client.fotoEntrada}
                  endereco={client.endereco}
                  horario={client.horario}
                  numero={client.fone}
                  iconFace={client.facebook}
                  iconInsta={client.instagram}
                  iconWhats={client.whatsapp}
                  iconBooking={client.booking}
                  iconSite={client.site}
                  tags={client.tags}
                />
              </div>
            ))}
          </div>

          <div className="row">
            <div className="col-12 text-center">
              <div className="pagination d-flex justify-content-center align-items-center">
                <button
                  className="btn btn-primary"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <span className="mx-3">
                  Página {currentPage} de {totalPages}
                </span>
                <button
                  className="btn btn-primary"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dash;
