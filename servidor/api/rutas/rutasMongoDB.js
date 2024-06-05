const express = require('express');
const router = express.Router();
const MongoDB = require('../controladores/controladorMongoDB');

// Rutas
router.get('/mensaje', MongoDB.enviarMensaje);
router.post('/', MongoDB.usuarioNuevo);
router.get('/datos', MongoDB.obtenerUsuarios);
router.get('/:id', MongoDB.obtenerUsuarioPorId);
router.get('/:name', MongoDB.obtenerUsuarioPorNombre);
router.put('/:id', MongoDB.actualizarUsuarioPorId);
router.put('/aNombre/:name', MongoDB.actualizarUsuarioPorNombre);
router.delete('/:id', MongoDB.eliminarUsuario);
router.delete('/eNombre/:name', MongoDB.eliminarUsuarioPorNombre);
router.delete('/limpiar', MongoDB.eliminarUsuarios);

module.exports = router;