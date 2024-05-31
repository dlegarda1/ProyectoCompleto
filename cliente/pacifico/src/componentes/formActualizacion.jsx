import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FormActualizacion() {
  const [formData, setFormData] = useState({ id: '', newName: '' });
  const [opciones, setOpciones] = useState([]);

  
  useEffect(() => {
    const fetchData = async () => {
      const token = document.cookie;
      const axiosInstance = axios.create({
        withCredentials: true
    });
      //const token = localStorage.getItem('token');
      console.log(token);
      try {
        /*const response = await axios.get('http://localhost:3002/basedatos/datos', {
          headers: { Authorization: `Bearer ${token}` }
        });*/      
        
        const response = await axiosInstance.get('http://localhost:3002/basedatos/datos',{withCredentials: true});
        setOpciones(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error al obtener los datos protegidos:', error.message);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/user/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newName: formData.newName }),
      });
      const data = await response.json();
      console.log(data); 

      // Actualizar la lista de opciones después de la actualización
      const updatedOptions = opciones.map(opcion => {
        if (opcion.id === parseInt(formData.id)) { // Convertir formData.id a número para comparación
          return { ...opcion, name: formData.newName }; // Actualizar el nombre
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
        <select name="id" value={formData.id} onChange={handleChange}>
          {opciones.map(opcion => (
            <option key={opcion.id} value={opcion.id}>
             {opcion.name} - {opcion.username} - {opcion.rol} 
            </option>
          ))}
        </select><br /><br />
        <label htmlFor="newName">Nuevo nombre:</label>
        <input type="text" id="newName" name="newName" value={formData.newName} onChange={handleChange} required /><br /><br />
        <button type="submit" className="btn btn-primary">Actualizar</button>
      </form>
    </div>
  );
}

export default FormActualizacion;
