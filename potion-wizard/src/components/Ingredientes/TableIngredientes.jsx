import Table from 'react-bootstrap/Table';

export default function TableIngredientes({ ingredientes }) {
  return (
    <>
      {ingredientes.length === 0 ? (
        <p className="text-center pb-5 mb-0 d-flex justify-content-center fs-2">No hay ingredientes disponibles</p>
      ) : (
        <Table striped bordered hover variant="dark" responsive="md" className="text-center align-middle">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {ingredientes.map((ingrediente) => (
              <tr key={ingrediente.id}>
                <td>{ingrediente.nombre}</td>
                <td>{ingrediente.descripcion}</td>
                <td>{ingrediente.cantidad}</td>
              </tr>
            ))}

          </tbody>
        </Table>
      )}
    </>
  );
}