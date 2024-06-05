const express = require('express');
const router = express.Router();
const usuario = require('../controladores/controladorUser');

// Rutas
router.get('/mensaje', usuario.enviarMensaje);
router.post('/', usuario.ingresoUsuario);
router.get('/envio', usuario.enviarUsuarios);
router.get('/:id', usuario.enviarUsuario);
router.put('/aName/:id', usuario.actualizacionNombre);
router.put('/aUsuario/:id', usuario.actUsuario);
router.delete('/borrar/:id', usuario.eliminarUsuario);

module.exports = router;