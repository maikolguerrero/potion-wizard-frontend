import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardPotion from './CardPotion';
import API_ENDPOINT from '../../../config/api_endpoint';
import NavbarResponsive from '../Navbar';
import BuscarPociones from './BuscarPociones';
import CustomAlert from '../alertas/CustomAlert';

export default function Pociones({ fetchIngredientes }) {
  const [pociones, setPociones] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');

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
      setMessageAlert('Error al obtener las pociones:', error);
      setShowAlert(true);
    }
  };

  const fetchPotionsTerms = async (terms) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/pociones/buscar/${terms}`);
      const data = await response.json();

      if (data.status !== 200) {
        setMessageAlert(data.message);
        setShowAlert(true);
        return console.log(data.message);
      }
      setPociones(data.data);

    } catch (error) {
      console.error('Error al obtener las pociones por búsqueda:', error);
      setMessageAlert('Error al obtener las pociones por búsqueda:', error);
      setShowAlert(true);
    }
  };

  const eliminarPocion = async (id) => {
    try {
      // Eliminar del Backend
      const response = await fetch(`${API_ENDPOINT}/pociones/eliminar/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      setMessageAlert(data.message);
      setShowAlert(true);

      // Mostrar las pociones
      fetchPotions();

    } catch (error) {
      console.error('Error al eliminar la poción: ', error);
      setMessageAlert('Error al eliminar la poción: ', error);
      setShowAlert(true);
    }
  };

  const onSearch = async (searchTerm) => {
    fetchPotionsTerms(searchTerm);
  }

  const handleDismiss = () => {
    setShowAlert(false);
  };

  return (
    <>
      <NavbarResponsive fetchPotions={fetchPotions} fetchIngredientes={fetchIngredientes} />
      <Container fluid className="pt-5 bg-secondary text-light" id="pociones" style={{ width: "100%" }}>
        <h1 className="text-center mb-4">Pociones</h1>
        <BuscarPociones onSearch={onSearch} fetchPotions={fetchPotions} />

        {pociones.length === 0 ? (
          <p className="text-center pb-5 mb-0 d-flex justify-content-center fs-2">No hay pociones disponibles</p>
        ) : (
          <Row xs={1} sm={1} md={2} lg={3} xl={3} className="justify-content-center">
            {pociones.map((pocion) => (
              <Col key={pocion.id} className="mb-5 d-flex justify-content-center">
                <CardPotion
                  pocion={pocion}
                  eliminarPocion={eliminarPocion}
                  fetchPotions={fetchPotions}
                  fetchIngredientes={fetchIngredientes}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
      <CustomAlert
        message={messageAlert}
        show={showAlert}
        duration={3000}
        onDismiss={handleDismiss}
      />
    </>
  );
}