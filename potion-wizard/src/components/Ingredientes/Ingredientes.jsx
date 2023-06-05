import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TableIngredientes from './TableIngredientes';
import API_ENDPOINT from '../../../config/api_endpoint';
import Pociones from '../pociones/Pociones';

export default function Ingredientes() {
  const [ingredientes, setIngredientes] = useState([]);

  useEffect(() => {
    fetchIngredientes();
  }, []);

  const fetchIngredientes = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/ingredientes`);
      const data = await response.json();

      setIngredientes(data.data);

    } catch (error) {
      console.error('Error al obtener los ingredientes:', error);
    }
  };

  return (
    <>
      <Pociones fetchIngredientes={fetchIngredientes} />
      <Container fluid className="pt-5 bg-info text-light" id="ingredientes" style={{ width: "100%" }}>
        <h1 className="text-center mb-4">Ingredientes</h1>
        <Row xs={1} sm={1} md={1} lg={1} xl={1} className="justify-content-center mx-1">
          <Col className="mb-5 d-flex justify-content-center">
            <TableIngredientes ingredientes={ingredientes} />
          </Col>
        </Row>
      </Container>
    </>
  );
}