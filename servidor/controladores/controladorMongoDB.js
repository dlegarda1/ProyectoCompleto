const mongoose = require('mongoose');
const Usuario = require('../modelos/modeloMDB');


const enviarMensaje = (req, res) => {
    res.status(200).send('Hola desde MongoDB');
};

const usuarioNuevo = async (req, res) => {
    try {
        const { name, age } = req.body;


        if (!name || !age) {
            return res.status(400).json({ error: 'Se requiere nombre y edad del usuario' });
        }

        const edad = parseInt(age);
        const user = new Usuario({ name, age: edad });
        await user.save();

        res.status(201).json({ message: 'Usuario creado exitosamente', user });
    } catch (error) {
        console.error('Error al crear usuario en MongoDB:', error);
        res.status(500).json({ error: 'Error al crear usuario' });
    }
};

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
        console.log("acceso a base"+usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios en MongoDB:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};

const obtenerUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        console.error('Error al obtener usuario por ID en MongoDB:', error);
        res.status(500).json({ error: 'Error al obtener usuario por ID' });
    }
};


const obtenerUsuarioPorNombre = async (req, res) => {
    try {
        const { name } = req.params;
        const usuario = await Usuario.findOne({ name });
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        console.error('Error al obtener usuario por nombre en MongoDB:', error);
        res.status(500).json({ error: 'Error al obtener usuario por nombre' });
    }
};


const actualizarUsuarioPorNombre = async (req, res) => {
    try {
        const { name } = req.params;
        const {newName,newAge} = req.body
        console.log(`actualizando servidor ${newName} y ${newAge}`);
        if (!newName || !newAge) {
            return res.status(400).json({ error: 'Se requiere nombre y edad del usuario' });
        }
        const edad = parseInt(newAge);
        
        const usuario = await Usuario
        .findOneAndUpdate({ name }, { name: newName, age: edad }, { new: true });   
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario actualizado exitosamente', usuario });
    } catch (error) {
        console.error('Error al actualizar usuario por nombre en MongoDB:', error);
        res.status(500).json({ error: 'Error al actualizar usuario por nombre' });
    }
};

        
     

const actualizarUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age } = req.body;


        if (!name || !age) {
            return res.status(400).json({ error: 'Se requiere nombre y edad del usuario' });
        }

        const edad = parseInt(age);
        const usuario = await Usuario.findByIdAndUpdate(id, { name, age: edad }, { new: true });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json({ message: 'Usuario actualizado exitosamente', usuario });
    } catch (error) {
        console.error('Error al actualizar usuario en MongoDB:', error);
        res.status(500).json({ error: 'Error al actualizar usuario' });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndDelete(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado exitosamente', usuario });
    } catch (error) {
        console.error('Error al eliminar usuario en MongoDB:', error);
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
};


const eliminarUsuarioPorNombre = async (req, res) => {
    try {
        const { name } = req.params;
        console.log(name);
        const usuario = await Usuario.findOneAndDelete({ name });
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado exitosamente', usuario });
    }
    catch (error) {
        console.error('Error al eliminar usuario en MongoDB:', error);
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
};


const eliminarUsuarios = async (req, res) => {
    try {
        await Usuario.deleteMany();
        res.json({ message: 'Todos los usuarios han sido eliminados' });
    } catch (error) {
        console.error('Error al eliminar todos los usuarios en MongoDB:', error);
        res.status(500).json({ error: 'Error al eliminar todos los usuarios' });
    }
};


module.exports = {
    enviarMensaje,
    usuarioNuevo,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    obtenerUsuarioPorNombre,
    actualizarUsuarioPorId,
    actualizarUsuarioPorNombre,
    eliminarUsuario,
    eliminarUsuarioPorNombre,
    eliminarUsuarios
};
