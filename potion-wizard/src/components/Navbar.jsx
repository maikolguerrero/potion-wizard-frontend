import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import FormCrearPocion from './formularios/FormPocion';

export default function NavbarResponsive({ fetchPotions }) {
  const [showForm, setShowForm] = useState(false);

  const handleCreatePotionClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#inicio">Potion Wizard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#pociones">Pociones</Nav.Link>
            <Nav.Link href="#ingredientes">Ingredientes</Nav.Link>
            <Nav.Link onClick={handleCreatePotionClick}>Crear Poción</Nav.Link>
            <Nav.Link href="#contacto">Contacto</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      {showForm && <FormCrearPocion handleClose={handleCloseForm} fetchPotions={fetchPotions} />}
    </Navbar>
  );
}