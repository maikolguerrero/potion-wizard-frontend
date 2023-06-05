import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import API_ENDPOINT from '../../../config/api_endpoint';

export default function FormPocion({ handleClose, fetchPotions, fetchIngredientes, isEditing, editPotion }) {
  const [titulo, setTitulo] = useState('');

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [imagen, setImagen] = useState('');

  const [nombreError, setNombreError] = useState('');
  const [descripcionError, setDescripcionError] = useState('');
  const [precioError, setPrecioError] = useState('');
  const [cantidadError, setCantidadError] = useState('');
  const [categoriaError, setCategoriaError] = useState('');
  const [ingredienteError, setIngredienteError] = useState('');
  const [imagenError, setImagenError] = useState('');

  useEffect(() => {
    obtenerCategorias();
    obtenerIngredientes();
    setTitulo(isEditing ? 'Editar Poción' : 'Crear Poción');

    if (isEditing) {
      llenarFormEdit();
    }
  }, [isEditing]);

  const obtenerCategorias = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/categorias`);
      const data = await response.json();
      setCategorias(data.data);
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
    }
  };

  const obtenerIngredientes = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/ingredientes`);
      const data = await response.json();
      setIngredientes(data.data);
    } catch (error) {
      console.error('Error al obtener los ingredientes:', error);
    }
  };

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    const ingredientId = parseInt(value, 10); // Convertir el id a número

    if (ingredientesSeleccionados.includes(ingredientId)) {
      setIngredientesSeleccionados(ingredientesSeleccionados.filter((ingrediente) => ingrediente !== ingredientId));
    } else {
      setIngredientesSeleccionados([...ingredientesSeleccionados, ingredientId]);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
    setShowModal(false);
    if (isEditing) {
      llenarFormEdit();
    }
  };

  const vaciarForm = () => {
    // Restablecer los campos del formulario
    setNombre('');
    setDescripcion('');
    setPrecio('');
    setCantidad('');
    setImagen('');
    setCategoria('');
    setIngredientesSeleccionados([]);
  }

  // Obtener el id de una categoría por nombre
  const obtenerCategoriaPorNombre = async (nombre) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/categorias/nombre/${nombre}`);
      const data = await response.json();

      if (data && data.data) {
        setCategoria(data.data.id);
      }
    } catch (error) {
      console.error('Error al obtener la categoría:', error);
    }
  };

  const obtenerIngredientesPorNombre = async (nombres) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/ingredientes/nombres/${nombres}`);
      const data = await response.json();

      if (data && data.data) {
        const ingredientesSeleccionados = [];
        for (const key in data.data) {
          const id = data.data[key].id;
          ingredientesSeleccionados.push(id);
        }
        setIngredientesSeleccionados(ingredientesSeleccionados);
      }
    } catch (error) {
      console.error('Error al obtener la categoría:', error);
    }
  };

  const llenarFormEdit = () => {
    setNombre(editPotion.nombre);
    setDescripcion(editPotion.descripcion);
    setPrecio(editPotion.precio);
    setCantidad(editPotion.cantidad);
    obtenerCategoriaPorNombre(editPotion.categoria);
    obtenerIngredientesPorNombre(editPotion.ingredientes);
  };


  const handleCancel = () => {
    vaciarForm();
    // Cerrar el modal
    setShowModal(false);
    handleClose();
  };

  const validarText = (text) => {
    return text.trim() !== '';
  };
  const validarFloat = (num) => {
    return parseFloat(num) > 0;
  };
  const validarInt = (num) => {
    return parseInt(num) > 0;
  };
  const validarCategoria = () => {
    return categoria !== "";
  };
  const validarIngredientes = () => {
    return ingredientesSeleccionados.length >= 2;
  };

  // Agregar la nueva poción al backend
  const agregarPocion = async (formData) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/pociones/crear`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Respuesta del backend:', data.message);

      vaciarForm();
      await fetchPotions();
      await fetchIngredientes();
      handleClose();
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  }

  // Función para editar una poción
  const editarPocion = async (formData) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/pociones/editar`, {
        method: 'PUT',
        body: formData,
      });

      const data = await response.json();
      console.log('Respuesta del backend:', data.message);

      vaciarForm();
      await fetchPotions();
      await fetchIngredientes();
      handleClose();
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar campos
    const esNombreValido = validarText(nombre);
    const esDescripcionValido = validarText(descripcion);
    const esPrecioValido = validarFloat(precio);
    const esCantidadValido = validarInt(cantidad);
    const esCategoriaValido = validarCategoria(categoria);
    const esIngredientesValido = validarIngredientes(ingredientesSeleccionados);


    // Si está mal llenado el campo, agregar mensaje para notificar al usuario
    setNombreError(!esNombreValido ? 'Por favor, ingresa un nombre válido.' : '');
    setDescripcionError(!esDescripcionValido ? 'Por favor, ingresa una descipción válida.' : '');
    setPrecioError(!esPrecioValido ? 'Por favor, ingresa un precio válido.' : '');
    setCantidadError(!esCantidadValido ? 'Por favor, ingresa una cantidad válida.' : '');
    setCategoriaError(!esCategoriaValido ? 'Por favor, seleccione una categoría.' : '');
    setIngredienteError(!esIngredientesValido ? 'Por favor, seleccione por lo menos 2 ingredientes.' : '');

    if (!isEditing) {
      setImagenError(!imagen ? 'Por favor, seleccione una imagen.' : '');
    }

    if (!esNombreValido || !esDescripcionValido || !esCantidadValido || !esCantidadValido
      || !esCategoriaValido || !esIngredientesValido) {
      return;
    }

    // Colocar todos los ingredientes en una misma constante separadas por comos (",")
    const ingredientesIDs = ingredientesSeleccionados.join(',');

    // Agregar datos al form-data
    const formData = new FormData();
    if (isEditing) {
      formData.append('id', editPotion.id);
    }

    formData.append('nombre', nombre.trim());
    formData.append('descripcion', descripcion.trim());
    formData.append('precio', precio);
    formData.append('cantidad', cantidad);
    formData.append('categoriaID', categoria);
    formData.append('ingredientesIDs', ingredientesIDs);

    if (!isEditing) {
      if (imagen) {
        formData.append('imagen', imagen);
      }
    } else {
      if (imagen) {
        formData.append('imagenNueva', "true");
        formData.append('imagen', imagen);
      } else {
        formData.append('imagenNueva', "false");
      }

    }

    if (!isEditing) {
      // Se agrega la poción al backend
      agregarPocion(formData);
    } else {
      // Se actualiza la poción al backend
      editarPocion(formData);
    }
  };

  return (
    <Modal show={true} onHide={handleClose} centered className='m-0 p-0'>
      <Modal.Header closeButton>
        <Modal.Title>{titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group controlId="nombre" className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              isInvalid={nombreError !== ''}
            />
            <Form.Control.Feedback type="invalid" className="error-message">
              {nombreError}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="descripcion" className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
              isInvalid={descripcionError !== ''}
            />
            <Form.Control.Feedback type="invalid" className="error-message">
              {descripcionError}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="precio" className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              isInvalid={precioError !== ''}
            />
            {precioError && <Form.Control.Feedback type="invalid">{precioError}</Form.Control.Feedback>}
          </Form.Group>

          <Form.Group controlId="cantidad" className="mb-3">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              isInvalid={cantidadError !== ''}
            />
            {cantidadError && <Form.Control.Feedback type="invalid">{cantidadError}</Form.Control.Feedback>}
          </Form.Group>

          <Form.Group controlId="categoria" className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              as="select"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              isInvalid={categoriaError !== ''}
            >
              <option value="">Seleccionar categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </Form.Control>
            {categoriaError && <Form.Control.Feedback type="invalid">{categoriaError}</Form.Control.Feedback>}
          </Form.Group>

          <Form.Group controlId="ingredientes" className="mb-3">
            <Form.Label>Ingredientes</Form.Label>
            <div style={{ maxHeight: '100px', overflowY: 'scroll' }}>
              {ingredientes.map((ingrediente) => (
                <Form.Check
                  key={ingrediente.id}
                  type="checkbox"
                  id={ingrediente.id}
                  label={ingrediente.nombre}
                  value={ingrediente.id}
                  checked={ingredientesSeleccionados.includes(ingrediente.id)}
                  onChange={handleCheckboxChange}
                  isInvalid={ingredienteError !== ''}
                />
              ))}
            </div>
            {ingredienteError && <div className="text-danger">{ingredienteError}</div>}
          </Form.Group>

          <Form.Group controlId="imagen" className="mb-3">
            <Form.Label>Imagen</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} accept="image/*" />
            {imagenError && <div className="text-danger">{imagenError}</div>}
          </Form.Group>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {titulo}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}