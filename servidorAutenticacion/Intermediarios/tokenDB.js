const jwt = require('jsonwebtoken');
const secretKey = 'Bootcamp';
const Usuario = require('../modelos/modeloMDB');
const cookieParser = require('cookie-parser');



const envioTokenDB = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }
    if (!req.user) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }
    
    // Accediendo a las propiedades de usuario
    const username = req.user.username;
    const rol = req.user.rol;
    console.log("username "+username+ " rol "+rol);
    const payload = { rol: rol, username: username };
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    res.json({ token, username: req.user.username, rol: req.user.rol });
};


//funcion para enviar el token como cookie
const envioTokenCookieDB = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }    
    const username = req.user.username;
    const rol = req.user.rol;
    console.log("username " + username + " rol " + rol);
    const payload = { rol: rol, username: username };
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    console.log("token enviado "+token);
    res.cookie('nuevoCookie', token, { httpOnly: true, secure:true, sameSite:'None',maxAge: 3600000 });
    res.cookie('seraCookie', 'token', { secure: true, sameSite: 'None', maxAge: 3600000 }); 
    res.json({ message: 'Token generado con éxito', username: username, rol: rol });
    next();
}

const verificacionTokenDB = (req, res, next) => {
    const tokenrecibido = req.headers['authorization'];
    const token = tokenrecibido.replace(/^Bearer\s/, '');
    if (!token) {
        return res.status(401).json({ message: 'Se requiere token de autenticación' });
    }
    jwt.verify(token, secretKey, (err, decodedToken) => {
        if (err) {
            console.error('Error de verificación de token:', err);
            return res.status(403).json({ message: 'Token no válido' });
        }
        // Extraer nombre de usuario y rol del payload decodificado
        console.log(decodedToken);
        const username = decodedToken.username;
        const rol = decodedToken.rol;
        // Pasar el nombre de usuario y el rol a la siguiente función
        req.user = { username, rol }; 

        next();
    });
};

const verificacionTokenCookieDB = (req, res, next) => {
    const tokenrecibido = req.cookies.nuevoCookie;
    console.log("este es el cookie: "+tokenrecibido);
    if(!tokenrecibido){
        console.log("token no recibido");
        return res.status(403).json({ error: 'Se requiere token de autenticación' });
    }
    //const cookieParts = tokenrecibido.split('=');
    token = tokenrecibido;
    console.log("token:" + token);
    if (!token) {
        return res.status(401).json({ message: 'Se requiere token de autenticación' });
    }

    jwt.verify(token, secretKey, (err, decodedToken) => {
        console.log(decodedToken);
        if (err) {
            console.error('Error de verificación de token:', err);
            return res.status(403).json({ message: 'Token no válido' });
        }

        // Extraer nombre de usuario y rol del payload decodificado
        console.log(decodedToken);
        const username = decodedToken.username;
        const rol = decodedToken.rol;
        // Pasar el nombre de usuario y el rol a la siguiente función
        req.user = { username, rol }; 
        next();
    });
};

module.exports = {
    envioTokenDB,
    envioTokenCookieDB,
    verificacionTokenDB,
    verificacionTokenCookieDB
}