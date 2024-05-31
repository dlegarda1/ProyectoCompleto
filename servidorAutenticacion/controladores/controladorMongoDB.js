const mongoose = require('mongoose');
const Usuario = require('../modelos/modeloMDB');


const enviarMensaje = (req, res) => {
    res.status(200).send('Hola desde MongoDB');
};

const usuarioNuevo = async (req, res) => {
    console.log(req.body);
    try {
        const { name,username, password, rol, email } = req.body;
        console.log(name,username, password, rol, email);
        if (!username || !password || !rol) {
            return res.status(400).json({ error: 'Se requiere nombre y edad del usuario' });
        }
        const usuario = new Usuario({ name,username, password, rol, email });
        await usuario.save();
        res.status(201).json({ message: 'Usuario creado exitosamente', usuario });
    } catch (error) {
        console.error('Error al crear usuario en MongoDB:', error);
        res.status(500).json({ error: 'Error al crear usuario' });
    }
};

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
        console.log("acceso a base" + usuarios);
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
        const { userName } = req.params;
        const usuario = await Usuario.findOne({ userName });
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
        const { userName } = req.params;
        const { newName, newPassword, newRol } = req.body
        console.log(`actualizando servidor ${newName}  ${newPassword} y ${newRol}`);
        if (!userName || !password || !rol) {
            return res.status(400).json({ error: 'Se requiere nombre y edad del usuario' });
        }


        const usuario = await Usuario.findOneAndUpdate({ userName }, { userName: newName, password: newPassword, rol: newRol }, { new: true });
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
        const { newName, newPassword, newRol } = req.body;
        userName = newName;
        password = newPassword;
        rol = newRol;

        if (!userName || !password || !rol) {
            return res.status(400).json({ error: 'Se requiere nombre,password y rol del usuario' });
        }
        const usuario = await Usuario.findByIdAndUpdate(id, { userName, password, rol }, { new: true });
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
        const { userName } = req.params;
        console.log(userName);
        const usuario = await Usuario.findOneAndDelete({ userName });
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
