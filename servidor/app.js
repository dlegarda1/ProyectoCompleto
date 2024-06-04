const express = require('express');
const rutasUsuario = require('./rutas/rutasUser');
const connectDB = require('./BaseDatos/conexionmongoDB');
const rutasMongoDB = require('./rutas/rutasMongoDB');
const autenticacion = require('./Intermediarios/autenticacion.js'); 
const Token = require('./Intermediarios/token.js');
const cors = require('cors');

const router = express.Router();

const app = express();
const puerto = 3001;

// Middleware para parsear el body de la solicitud
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  credentials: true,
  origin: ['http://localhost:5173']
}))

//escribir un metodo get
app.get('/inicio', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Rutas
app.use('/api/user',rutasUsuario);
app.use('/api/mongoDB', rutasMongoDB);

/*
app.get('/api/login',autenticacion,Token.envioToken,async(req,res)=>{
  res.json({ mensaje: "acceso concedido" });
});
*/
app.get('/api/login',autenticacion,Token.envioTokenCookie,async(req,res)=>{
  res.json({ mensaje: "acceso concedido" });
});
// Conectar a la base de datos
connectDB();

// Iniciar el servidor
app.listen(puerto, () => {
  console.log(`Servidor iniciado en http://localhost:${puerto}`);
});

