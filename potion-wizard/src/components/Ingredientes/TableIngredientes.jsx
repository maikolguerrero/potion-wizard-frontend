import Table from 'react-bootstrap/Table';

export default function TableIngredientes({ ingrediente }) {
  return (
    <Table striped bordered hover variant="dark" responsive="md" className="text-center align-middle">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Cantidad</th>
        </tr>
      </thead>
      <tbody>
        {ingrediente.map((ingrediente) => (
          <tr key={ingrediente.id}>
            <td>{ingrediente.nombre}</td>
            <td>{ingrediente.descripcion}</td>
            <td>{ingrediente.cantidad}</td>
          </tr>
        ))}

      </tbody>
    </Table>
  );
}