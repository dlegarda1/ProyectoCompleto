import React, { useState } from 'react';

function FormularioDB() {
  const [formData, setFormData] = useState({ name: '', age: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/mongoDB', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
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
    </div>
  );
}

export default FormularioDB;