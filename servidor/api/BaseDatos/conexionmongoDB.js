const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/BaseUsuarios')
            .then(() => console.log('Conexión a MongoDB establecida'))            
    }
    catch(err) {
        console.error('Error al conectar a MongoDB:', err);
    }
}

module.exports = connectDB;