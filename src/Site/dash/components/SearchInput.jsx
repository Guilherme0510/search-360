import React, { useState, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';

const SearchInput = ({
  query,
  setQuery,
  selectedRamo,
  setSelectedRamo,
  ramosOptions,
  handleClearSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const filteredOptions = ramosOptions.filter(ramo =>
    ramo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectChange = (value) => {
    setSelectedRamo(value);
    setSearchTerm(value);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClearAndResetSearch = () => {
    handleClearSearch();
    setSearchTerm('');
    setIsOpen(false);
  };

  const isClearButtonDisabled = !query && !searchTerm && !selectedRamo;

  return (
    <Form className="search">
      <Form.Group className="inputs-search">
        <Form.Control
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nome, Ramo ou Localização"
          className="input-search"
        />
        <div ref={selectRef} className="custom-select-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={() => setIsOpen(!isOpen)}
            placeholder="Selecione uma Categoria"
            className="input-search form-control"
          />
          {isOpen && (
            <ul className="custom-select-dropdown">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((ramo, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectChange(ramo)}
                    className={selectedRamo === ramo ? 'selected' : ''}
                  >
                    {ramo}
                  </li>
                ))
              ) : (
                <li>Nenhum ramo encontrado</li>
              )}
            </ul>
          )}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleClearAndResetSearch();
          }}
          className={`btn-clear ${isClearButtonDisabled ? 'disabled' : ''}`}
          disabled={isClearButtonDisabled}
        >
          Limpar
        </button>
      </Form.Group>
    </Form>
  );
};

export default SearchInput;
