import React, { useState } from 'react';
import axios from 'axios';






function Formulario() {
  const [formData, setFormData] = useState({ name: '', age: '' });
  const [successMessage, setSuccessMessage] = useState('');
  
  //********************************* */
  //carga de variable de entorno para servidor
  const API_URL = import.meta.env.VITE_API_URL;
  console.log(API_URL);
  const endpoint=`${API_URL}/api/user`;
    console.log("endpoint desarrollo",endpoint);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setSuccessMessage('Formulario enviado con éxito');
      console.log(response.data);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <div>
      <h2>Formulario POST</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required /><br /><br />
        <label htmlFor="age">Edad:</label>
        <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} min="1" required /><br /><br />
        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
      {successMessage && <p id="respuesta">{successMessage}</p>}
    </div>
  );
}

export default Formulario;
