const Usuario = require('../modelos/modeloMDB');

const autenticarDB = async (req, res, next) => {
   /* const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Se requiere autenticación' });
    }
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');*/
    const { username, password } = req.body;
    console.log(req.body);
    console.log('Usuario:', username);
    console.log('Password:', password);

    try {
        // Búsqueda del usuario en la base de datos
        const usuario = await Usuario.findOne({ username });
        console.log("Rol de bd: "+ usuario);
        if (!usuario) {
            return res.status(404).json({ message: `Usuario ${username} no encontrado` });
        }

        if (usuario.password !== password) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }       
                    
        rol=usuario.rol;        
        req.user = {username,rol};
        console.log(req.user);
        next();
    } catch (error) {
        console.error('Error en la autenticación:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


module.exports = autenticarDB;