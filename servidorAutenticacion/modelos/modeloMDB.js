const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  
  username: {
    type: String,
    required: true,
    unique: true    
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  rol: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // Validar el formato del correo electrónico
        return /\S+@\S+\.\S+/.test(v);
      },
      message: props => `${props.value} no es un correo electrónico válido`
    }
  }
});

module.exports = mongoose.model('Users', UserSchema); 
