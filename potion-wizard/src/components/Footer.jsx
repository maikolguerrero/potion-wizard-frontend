import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';

export default function Footer() {
  return (
    <footer className="bg-dark text-light">
      <Container className="pb-1">
        <Row className="flex-column flex-md-row justify-content-center pt-2">
          <h4 id="contacto" className='text-center mt-3'>Contacto</h4>
          <Stack direction="horizontal" gap={3} className="flex-column flex-md-row justify-content-center my-3">
            <Col xs={12} md={6} lg={4} className="">
              <div className="d-flex flex-column align-items-center">
                <p><a href="https://github.com/maikolguerrero" target="_blank" rel="noopener noreferrer"><img src="/assets/github.svg" alt="GitHub" style={{ width: '50px', height: 'auto' }} /></a></p>
                <p><strong>Email:</strong> maikolguerrerop@gmail.com</p>
              </div>
            </Col>
            <Col xs={12} md={6} lg={4} className="d-flex flex-column align-items-center justify-center">
              <Image src="/images/Maikol.jpg" alt="foto-de-perfil" roundedCircle className="img-thumbnail" style={{ width: '150px', height: 'auto' }} />
            </Col>
          </Stack>
        </Row>
        <hr className="" />
        <p className="text-center">© 2023 Potion Wizard. Todos los derechos reservados.</p>
      </Container>
    </footer>
  );
}