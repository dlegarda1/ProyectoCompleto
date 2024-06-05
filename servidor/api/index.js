const express = require('express');
const rutasUsuario = require('./rutas/rutasUser');
const connectDB = require('./BaseDatos/conexionmongoDB');
const rutasMongoDB = require('./rutas/rutasMongoDB');
const autenticacion = require('./Intermediarios/autenticacion.js'); 
const Token = require('./Intermediarios/token.js');
const cors = require('cors');
const router = express.Router();

const app = express();
const puerto = process.env.PORT || 3001;

// Middleware para parsear el body de la solicitud
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  credentials: true,
  origin: ['http://localhost:5173','https://ejemplodesplieguereact.vercel.app'],  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

//  Para evaluar servidor iniciado
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Rutas
app.use('/api/user', rutasUsuario);
app.use('/api/mongoDB', rutasMongoDB);

/*
app.get('/api/login',autenticacion,Token.envioToken,async(req,res)=>{
  res.json({ mensaje: "acceso concedido" });
});
*/
app.get('/api/login', autenticacion, Token.envioTokenCookie, async (req, res) => {
  res.json({ mensaje: "acceso concedido" });
});

app.get('/home', (req, res) => {
  res.send('¡esto es un home!');
});

//arreglos con datos predefinidos
let users = [
  { id: 1, name: 'Carlos', age: 20 },
  { id: 2, name: 'Maria', age: 50 },
];



// Rutas para manejar las solicitudes GET
// Ruta api  
app.get("/api", (req, res) => {
  res.json({ mensaje: "Hola desde el servidor!" });
});

// Ruta nuevo
app.get("/nuevo", (req, res) => {
  res.json({ mensaje: "Mensaje Cargado" });
});

app.get("/api/user/envio", (req, res) => {
  res.json(users);
});




// Ruta para manejar la solicitud POST
app.post('/api/user', (req, res) => {
  const { name, age } = req.body;
  const edad = parseInt(age);
  console.log(req.body);
  console.log('Nombre:', name);
  console.log('Edad:', age);
  res.json({ message: 'Datos recibidos correctamente' });
  users.push({ id: users.length + 1, name, age: edad });
  console.log(users);
});


// Manejador para PUT /api/user/:id
app.put('/api/user/:id', (req, res) => {
  const { id } = req.params;
  const { newName } = req.body;

  const userIndex = users.findIndex(user => user.id === parseInt(id));
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  users[userIndex].name = newName;
  console.log(users);
  res.json({ message: 'Nombre actualizado correctamente' });
});

app.get('/prueba', (req, res) => {
  res.send('Esto es una prueba');
});

// Manejador para DELETE /api/user/:id
app.delete('/api/user/:id', (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex(user => user.id === parseInt(id));
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  users.splice(userIndex, 1);
  res.json({ message: 'Usuario eliminado correctamente' });
  console.log(users);
});



// Servidor en espera de instrucciones
app.listen(puerto, () => {
  console.log(`escuchando en http://localhost:${puerto}`);
  console.log("escuchando en http://localhost:" + puerto);
});
