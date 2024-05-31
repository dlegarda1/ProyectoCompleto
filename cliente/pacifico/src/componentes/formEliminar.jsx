import React, { useState, useEffect } from 'react';

function FormEliminar() {
  const [userId, setUserId] = useState('');  
  const [opciones, setOpciones] = useState([]);

  useEffect(() => {
    fetchOpciones();
  }, []);

  const fetchOpciones = async () => {
    try {
      const response = await fetch('/api/user/envio');
      const data = await response.json();
      setOpciones(data);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  const handleChange = (e) => {
    setUserId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log(data); 

      const updatedOptions = opciones.filter(opcion => opcion.id !== parseInt(userId));
      setOpciones(updatedOptions);
      setUserId(''); 
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  

return (
  <div>
    <h2>Eliminar Usuario</h2>
    <form onSubmit={handleSubmit}>
      <label htmlFor="userId">Seleccionar usuario:</label>
      <select id="userId" value={userId} onChange={handleChange} required>
        <option value="">Seleccionar usuario...</option>
        {opciones.map(opcion => (
          <option key={opcion.id} value={opcion.id}>
            {opcion.id} - {opcion.name}
          </option>
        ))}
      </select><br /><br />
      <button type="submit" className="btn btn-primary">Eliminar</button>
    </form>
  </div>
);
}

export default FormEliminar;
