const jwt = require('jsonwebtoken');
const secretKey = 'Bootcamp';


const envioToken = (req, res) => {
    const authHeader = req.headers['authorization'];
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [userName, password] = credentials.split(':');

    // Generar un token JWT con información del usuario autenticado
    const token = jwt.sign({ username: userName }, secretKey, { expiresIn: '1h' });
    res.json({ token });
    console.log(token);    
}

//funcion para enviar el token como cookie
const envioTokenCookie = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [userName, password] = credentials.split(':');

    // Generar un token JWT con información del usuario autenticado
    const token = jwt.sign({username: userName }, secretKey, { expiresIn: '1h' });
    res.cookie('tokenCookie', token, { httpOnly: true, maxAge: 3600000 });
    next();
}

const verificacionToken = (req, res, next) => {
    const tokenrecibido = req.headers['authorization'];
    const token = tokenrecibido.replace(/^Bearer\s/, '');
    console.log("token:"+token);
    if (!token) {
        return res.status(401).json({ message: 'Se requiere token de autenticación' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        console.log(user);
        if (err) {
            console.error('Error de verificación de token:', err);
            return res.status(403).json({ message: 'Token no válido' });
        }

        req.user = user;
        next();
    });
};

const verificacionTokenCookie = (req, res, next) => {
    const tokenrecibido = req.headers.cookie;
    const cookieParts = tokenrecibido.split('=');
    token=cookieParts[1];
    console.log("token:"+token);
    if (!token) {
        return res.status(401).json({ message: 'Se requiere token de autenticación' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        console.log(user);
        if (err) {
            console.error('Error de verificación de token:', err);
            return res.status(403).json({ message: 'Token no válido' });
        }

        req.user = user;
        next();
    });
};

module.exports = {
    envioToken,
    envioTokenCookie,
    verificacionToken,
    verificacionTokenCookie}