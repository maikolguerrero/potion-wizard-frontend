import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function ({ onSearch, fetchPotions }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermError, setSearchTermError] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      setSearchTermError("");
      return onSearch(searchTerm);
    }
    setSearchTermError("Ingresa un valor válido");
  };

  const handleReset = () => {
    setSearchTerm("");
    setSearchTermError("");
    fetchPotions();
  }

  return (
    <Form onSubmit={handleSubmit} className='d-flex justify-content-center mb-5 mt-2'>
      <Form.Group controlId="searchForm" className='w-50'>
        <Form.Control
          type="text"
          placeholder="Buscar pociones..."
          value={searchTerm}
          onChange={handleChange}
          isInvalid={searchTermError !== ''}
        />
        {searchTermError && <Form.Control.Feedback type="invalid" className='text-light'>{searchTermError}</Form.Control.Feedback>}
      </Form.Group>
      <Button variant="primary" type="submit" className="h-50 mx-1">
        <img src="/assets/search.svg" alt="search-icon" style={{ width: '24px', height: 'auto' }} />
      </Button>
      <Button variant="warning" onClick={handleReset} className="h-50">
        <img src="/assets/reset.svg" alt="reset-icon" style={{ width: '24px', height: 'auto' }} />
      </Button>
    </Form>
  );
};