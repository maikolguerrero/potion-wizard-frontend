import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardPotion from './CardPotion';
import API_ENDPOINT from '../../config/api_endpoint';

export default function Pociones() {
  const [pociones, setPociones] = useState([]);

  useEffect(() => {
    fetchPotions();
  }, []);

  const fetchPotions = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/pociones`);
      const data = await response.json();

      setPociones(data.data);

    } catch (error) {
      console.error('Error al obtener las pociones:', error);
    }
  };

  return (
    <Container fluid className="my-5 pt-3 bg-secondary text-light" id="pociones" style={{ width: "100%" }}>
      <h1 className="text-center mb-4">Pociones</h1>
      <Row xs={1} sm={1} md={2} lg={3} xl={3} className="justify-content-center">
        {pociones.map((pocion) => (
          <Col key={pocion.id} className="mb-5 d-flex justify-content-center">
            <CardPotion pocion={pocion} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}