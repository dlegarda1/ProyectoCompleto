const express = require('express');
//const autenticacion = require('./Intermediarios/autenticacion.js'); 
const autenticarDB = require('./Intermediarios/autenticacionDB.js');
const connectDB = require('./BaseDatos/conexionmongoDB');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rutasMongoDB = require('./rutas/rutasMongoDB');
//const Token = require('./Intermediarios/token.js');
const TokenDB = require('./Intermediarios/tokenDB.js');
const multer = require('multer');
const path = require('path');


const router = express.Router();

const app = express();
const puerto = process.env.PORT || 3002;

// Middleware para parsear el body de la solicitud
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  credentials: true,
  origin: ['http://localhost:5173']
}))
app.use(cookieParser());

// Rutas

app.get('/home', async (req, res) => {
  res.cookie('seraCookie', 'token', { secure: true, sameSite: 'None', maxAge: 3600000 });
  res.send('cookie enviada');
})
//ruta para login
app.post('/login', autenticarDB, TokenDB.envioTokenCookieDB)
//ruta para direccionamiento
app.post('/direccionada', (req, res) => {
  res.redirect('/nueva-ruta');
});
app.get('/nueva-ruta', (req, res) => {
  res.cookie('nuevoCookie', 'token', { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 3600000 });
  res.send('Esta es la nueva ruta');
});

// Ruta protegida
app.use('/basedatos', TokenDB.verificacionTokenCookieDB, rutasMongoDB);

//ruta normal para registro de nuevos usuarios
app.use('/acceso', rutasMongoDB);
//conexión base de datos MongoDB
connectDB();

//***************************************************** */
//    Método para enviar script en cookie
// Endpoint para enviar el script en una cookie
app.get('/envioScript', (req, res) => {
  const script = `
  (function() {
    document.addEventListener('DOMContentLoaded', () => {
      let clickCount = 0;  
      const countButton = document.getElementById('countButton');
      if (countButton) {
        countButton.addEventListener('click', () => {
          clickCount++;
          localStorage.setItem('contador', clickCount);
          document.cookie = 'clickCount=' + clickCount + '; path=/';
        });
      } else {
        console.error('El botón con id "countButton" no se encontró en el DOM.');
      }
    });
  })();
  `;
  res.cookie('clickScript', script, { httpOnly: false, sameSite: 'Lax' });
  res.send('Script enviado en la cookie.');
});

// Endpoint para recibir el número de clicks
app.post('/recepcionInfo', (req, res) => {
  const contador = req.body.contador;
  const  clickCount = req.cookies.cookieInfo;  
  console.log('Número de clicks recibidos:', clickCount);
  console.log('Número de clicks recibidos en el body',  contador);
  res.send('Número de clicks recibidos.');
});


//********************************************* */
//  Para recibir y enviar archivos

// Configurar almacenamiento de multer
const almacenamiento = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: almacenamiento });


// Ruta para subir imágen
app.post('/upload/imagen', upload.single('image'), (req, res) => {
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

// Ruta para subir documento
app.post('/upload/documento', upload.single('document'), (req, res) => {
  res.json({ filePath: `/uploads/${req.file.filename}` });
});


// Servir documentos estáticas
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Iniciar el servidor
app.listen(puerto, () => {
  console.log(`Servidor autorizacion iniciado en http://localhost:${puerto}`);
});

