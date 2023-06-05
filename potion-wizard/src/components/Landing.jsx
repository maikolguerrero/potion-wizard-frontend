import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from "react-bootstrap/Image";
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

export default function Landing({handleCreatePotionClick}) {
  return (
    <>
      <Container fluid className="pt-5" id="inicio" style={{ width: "100%" }}>
        <h1 className="text-center mb-4 text-primary" style={{ fontSize: "40px" }}>Potion Wizard</h1>
        <Stack direction="horizontal" gap={2} className="my-5">
          <Row xs={1} sm={1} md={2} lg={2} xl={2} className="d-flex justify-content-center align-item-center mx-5">
            <Image src="/images/wizard.jpg" alt="foto-wizard" style={{ width: '350px', height: 'auto' }} />
            <div className='d-flex flex-column justify-content-center text-center'>
              <strong className='align-self-center'>
                <p className="text-center px-1" style={{ fontSize: "25px" }}>¡Descubre un mundo de magia y sorpresas con nuestra aplicación de gestión de inventario mágico! Mantén tus pociones y ingredientes organizados de manera fácil y eficiente. ¡Haz tus sueños mágicos realidad!</p>
              </strong>
              <Button variant="danger" onClick={handleCreatePotionClick} ><strong>¡Empieza Ahora!</strong></Button>
            </div>
          </Row>
        </Stack>
      </Container>
    </>
  );
}