import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import API_ENDPOINT from '../../../config/api_endpoint.js';

export default function CardPotion({ pocion }) {
  const { nombre, descripcion, categoria, cantidad, precio, ingredientes, imagen } = pocion;
  return (
    <Card style={{ width: '18rem' }} bg="primary" text="white" border="primary">
      <Card.Img variant="top" src={`${API_ENDPOINT}/images/${imagen}`} alt="imágen_poción" />
      <Card.Body>
        <Card.Title>{nombre}</Card.Title>
        <Card.Text>{descripcion}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item variant="primary"><strong>Categoria:</strong> {categoria}</ListGroup.Item>
        <ListGroup.Item variant="primary"><strong>Cantidad:</strong> {cantidad}</ListGroup.Item>
        <ListGroup.Item variant="primary"><strong>Precio:</strong> {precio}</ListGroup.Item>
        <ListGroup.Item variant="info">
          <ListGroup className="list-group-flush">
            <strong>Ingredientes:</strong>
            {ingredientes.map((ingrediente, index) => (
              <ListGroup.Item variant="info" key={index}>◉ {ingrediente}</ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}