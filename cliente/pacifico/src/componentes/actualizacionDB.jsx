import React, { useState, useEffect } from 'react';

function FormActualizacionDB() {
  const [formData, setFormData] = useState({ name: '', newName: '', newAge: '' });
  const [opciones, setOpciones] = useState([]);

  useEffect(() => {
    fetchOpciones();
  }, []);

  const fetchOpciones = async () => {
    try {
      const response = await fetch('/api/mongoDB/datos');
      const data = await response.json();

      // Agregar una identificación única a cada opción
      const opcionesConId = data.map((opcion, index) => ({ ...opcion, id: index }));

      // Establecer las opciones en el estado
      setOpciones(opcionesConId);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nameUsuario = formData.name;
      const response = await fetch(`/api/mongoDB/aNombre/${nameUsuario}`, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newName: formData.newName, newAge: formData.newAge }),
      });
      console.log(`actualizando ${formData.newName} y ${formData.newAge}`);
      const data = await response.json();
      console.log(data);

      // Actualizar la lista de opciones después de la actualización
      const updatedOptions = opciones.map(opcion => {
        if (opcion.name === nameUsuario) { // Usamos el nombre seleccionado
          return { 
            ...opcion, 
            name: formData.newName !== '' ? formData.newName : opcion.name,
            age: formData.newAge !== '' ? parseInt(formData.newAge) : opcion.age,
          };
        } else {
          return opcion;
        }
      });
      setOpciones(updatedOptions);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <div>
      <h2>Formulario PUT</h2>
      <form onSubmit={handleSubmit}>
        <select name="name" value={formData.name} onChange={handleChange}>
          {opciones.map(opcion => (
            <option key={opcion.id} value={opcion.name}>
              {opcion.name} - {opcion.age} años
            </option>
          ))}
        </select><br /><br />
        <label htmlFor="newName">Nuevo nombre:</label>
        <input type="text" id="newName" name="newName" value={formData.newName} onChange={handleChange} /><br /><br />
        <label htmlFor="newAge">Nueva edad:</label>
        <input type="text" id="newAge" name="newAge" value={formData.newAge} onChange={handleChange} /><br /><br />
        <button type="submit" className="btn btn-primary">Actualizar</button>
      </form>
    </div>
  );
}

export default FormActualizacionDB;

