import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import API_ENDPOINT from '../../../config/api_endpoint.js';
import ConfirmationModal from '../ConfirmationModal.jsx';
import FormPocion from '../formularios/FormPocion.jsx';

export default function CardPotion({ pocion, eliminarPocion, fetchPotions, fetchIngredientes }) {
  const { id, nombre, descripcion, categoria, cantidad, precio, ingredientes, imagen } = pocion;
  const [showModal, setShowModal] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const handleEditPotionClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleEliminar = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    eliminarPocion(id);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
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
        <Card.Body className="d-flex text-center align-items-center justify-content-center">
          <Button variant="warning" onClick={handleEditPotionClick} className='mx-4'>
            <img src="../../assets/edit.svg" alt="icon-edit" style={{ width: '25px', height: 'auto' }} />
          </Button>
          <Button variant="danger" onClick={handleEliminar} className='mx-4'>
            <img src="../../assets/delete.svg" alt="icon-delete" style={{ width: '25px', height: 'auto' }} />
          </Button>
        </Card.Body>
      </Card>

      {showForm && <FormPocion
        handleClose={handleCloseForm}
        fetchPotions={fetchPotions}
        fetchIngredientes={fetchIngredientes}
        isEditing={true}
        editPotion={pocion}
      />}

      <ConfirmationModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmDelete}
      />
    </>
  );
}