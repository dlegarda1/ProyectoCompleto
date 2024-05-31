import React, { useState } from 'react';
import axios from 'axios';

const RegistroUsuarioForm = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        username: '',
        rol: 'usuario'
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('URL_DE_TU_ENDPOINT', formData);
            console.log('Respuesta del servidor:', response.data);
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Nombre:</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

            <label>Correo electrónico:</label>
            <input type="email" name="correo" value={formData.correo} onChange={handleChange} required />

            <label>Nombre de usuario:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />

            <label>Rol:</label>
            <select name="rol" value={formData.rol} onChange={handleChange}>
                <option value="usuario">Usuario</option>
                <option value="admin">Administrador</option>
            </select>

            <button type="submit">Registrarse</button>
        </form>
    );
};

export default RegistroUsuarioForm;