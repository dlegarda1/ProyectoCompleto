import React, { useState, useEffect } from 'react';

function EliminacionDB() {
  const [formData, setFormData] = useState({ name: '' });
  const [opciones, setOpciones] = useState([]);

  useEffect(() => {
    fetchOpciones();
  }, []);

  const fetchOpciones = async () => {
    try {
      const response = await fetch('/api/mongoDB/datos');
      const data = await response.json();      
      const opcionesConId = data.map((opcion, index) => ({ ...opcion, id: index }));      
      setOpciones(opcionesConId);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDelete = async () => {
    try {
      const nameUsuario = formData.name;
      const response = await fetch(`/api/mongoDB/eNombre/${nameUsuario}`, { 
        method: 'DELETE',
      });
      console.log(`Eliminando usuario ${nameUsuario}`);
      const data = await response.json();
      console.log(data);
      
      const updatedOptions = opciones.filter(opcion => opcion.name !== nameUsuario);
      setOpciones(updatedOptions);
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  return (
    <div>
      <h2>Eliminación de Usuario</h2>
      <form>
        <select name="name" value={formData.name} onChange={handleChange}>
          {opciones.map(opcion => (
            <option key={opcion.id} value={opcion.name}>
              {opcion.name} - {opcion.age} años
            </option>
          ))}
        </select><br /><br />
        <button type="button" onClick={handleDelete} className="btn btn-danger">Eliminar</button>
      </form>
    </div>
  );
}

export default EliminacionDB;
