import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore'; // Importe a coleção e método de leitura
import { getFirestore, doc, getDoc } from "firebase/firestore";
import SearchInput from '../dash/components/SearchInput';
import SearchResult from '../dash/components/SearchResult';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './components/styles/Dash.css';

const Dash = () => {
  const db = getFirestore();

  const [query, setQuery] = useState('');
  const [selectedRamo, setSelectedRamo] = useState('');
  const [ramosOptions, setRamosOptions] = useState([]); // Aqui você pode carregar os ramos da base de dados
  const [filteredClients, setFilteredClients] = useState([]);
  const [currentClients, setCurrentClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allClients, setAllClients] = useState([]);

  useEffect(() => {
    // Função para buscar dados dos clientes do Firestore
    const fetchClients = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'clientes'));
        const clientsData = querySnapshot.docs.map(doc => doc.data());
  
        // Ordena os clientes por uma propriedade, por exemplo 'criadoEm'
        const sortedClients = clientsData.sort((a, b) => {
          return b.criadoEm - a.criadoEm; // Ordena do mais recente para o mais antigo
        });
  
        setAllClients(sortedClients);
      } catch (error) {
        console.error("Erro ao buscar clientes: ", error);
      }
    };
  
    fetchClients();
  }, []);

  useEffect(() => {
    // Filtrando clientes com base na consulta e ramo selecionado
    const filtered = allClients.filter(client =>
      (client.fantasia ? client.fantasia.toLowerCase().includes(query.toLowerCase()) : false) ||
      (client.ramo ? client.ramo.toLowerCase().includes(query.toLowerCase()) : false) ||
      (client.tags ? client.tags.toLowerCase().includes(query.toLowerCase()) : false) &&
      (selectedRamo ? client.ramo === selectedRamo : true)
    );
    setFilteredClients(filtered);
    setTotalPages(Math.ceil(filtered.length / 10));
    setCurrentClients(filtered.slice((currentPage - 1) * 10, currentPage * 10));
  }, [query, selectedRamo, currentPage, allClients]);

  const handleClearSearch = () => {
    setQuery('');
    setSelectedRamo('');
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }

    window.scrollTo(0,0)
  };

  return (

    <div className='bg-dash'>
      <div className="dash-container">
        <div className="container section-result">
          <SearchInput
            query={query}
            setQuery={setQuery}
            selectedRamo={selectedRamo}
            setSelectedRamo={setSelectedRamo}
            ramosOptions={ramosOptions}
            handleClearSearch={handleClearSearch}
          />
          <h2 className="my-4">Clientes Encontrados: {filteredClients.length}</h2>
          <div className="results-container">
            {currentClients.map((client, index) => (
              <SearchResult
                key={index}
                title={client.fantasia}
                subtitle={client.ramo}
                description={client.descricao || "Descrição não disponível"}
                mapUrl={client.mapa}
                fotoEntrada={client.fotoEntrada}
                endereco={client.endereco}
                horario={client.horario}
                numero={client.fone}
                iconFace={client.iconFace}
                iconInsta={client.iconInsta}
                iconWhats={client.iconWhats}
                iconIfood={client.iconIfood}
                iconBooking={client.iconBooking}
                iconSite={client.iconSite}
                tags={client.tags}
              />
            ))}
          </div>
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <span>
              {currentPage} - {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dash;
