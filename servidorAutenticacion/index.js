// authorization-server.js
const express = require('express');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const puerto=3002;
const autenticar =require('./intermediarios/autenticacion.js');
const Token = require('./intermediarios/token.js');
const jwt = require('jsonwebtoken');
const app = express();
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');



passport.use('jwt',new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
  }, (jwtPayload, done) => {
    // Verificar si el token ha expirado
    if (Date.now() >= jwtPayload.exp * 1000) {
      // Token ha expirado, generar un nuevo token de acceso válido
      const newToken = generateAccessToken(jwtPayload.user);
      return done(null, jwtPayload.user, { newToken });
    } else {
      // Token aún es válido, continuar con la autenticación
      return done(null, jwtPayload.user);
    }
  }));
  
  // Middleware para proteger rutas con Passport
  const requireAuth = passport.authenticate('jwt', { session: false });
  
  // Ruta protegida
  app.get('/protected', requireAuth, (req, res) => {
    res.send('Esta ruta está protegida');
  });
  
  // Ruta para renovar el token
  app.post('/refreshToken', (req, res) => {
    const refreshToken = req.body.refreshToken;
    console.log('tokenrefresco',refreshToken);
    // Verificar la validez del token de refresco
    if (verificacionToken(refreshToken)) {
      // Generar un nuevo token de acceso válido
      const newToken = generateAccessToken(req.user);
      res.json('token acceso',{ newToken });
      res.json({ accessToken: newToken });
    } else {
      res.status(401).json({ message: 'Token de refresco inválido' });
    }
  });
  
    // Función para generar un nuevo token de acceso
app.post('/login',autenticar,(req,res)=>{
    Token.envioToken(req,res,secretKey);    
    res.send('Usuario autenticado correctamente');
});
  
  
function verificacionToken(token){    
    console.log("token:"+token);
    if (!token) {
        return res.status(401).json({ message: 'Se requiere token de autenticación' });
    }
    jwt.verify(token, secretKey, (err, user) => {
        //console.log(user);
        if (err) {
            console.error('Error de verificación de token:', err);
            return false;
        }        
        return true;
    });
};
// Función para enviar un token JWT como respuesta
const envioToken = (req, res,secretKey) => {
  const authHeader = req.headers['authorization'];
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [userName, password] = credentials.split(':');
  // Generar un token JWT con información del usuario autenticado
  const token = jwt.sign({ username: userName }, secretKey, { expiresIn: '1000' });
  res.json({ token });
  console.log('token enviado'+token);
  req.user = userName;
  console.log("user: "+req.user);      
}
// Definir las rutas   

app.get('/home',(req,res)=>{
    res.redirect(`http://localhost:3001/prueba`);
});
//funcion de generador de token de refresco
function generateAccessToken(user) {
    return jwt.sign(user, secretKey, { expiresIn: '15m' });
}


app.listen(puerto, () => {
    console.log(`Servidor de autorización escuchando en el puerto http://localhost:${puerto}`);
});