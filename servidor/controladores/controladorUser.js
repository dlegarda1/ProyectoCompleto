//arreglos con datos predefinidos
let users = [
  { id: 1, name: 'Carlos', age: 20 },
  { id: 2, name: 'Maria', age: 50 },
];

const enviarMensaje = (req, res) => {
  res.json({ mensaje: "Hola desde el servidor!" });
}


const enviarUsuarios = (req, res) => {
  res.json(users);
};


const ingresoUsuario = (req, res) => {
  const { name, age } = req.body;
  const edad = parseInt(age);
  console.log(req.body);
  console.log('Nombre:', name);
  console.log('Edad:', age);
  id = users.length + 1;
  users.push({ id, name, age: edad });
  res.status(200).json({ id: users[users.length - 1].id, name: users[users.length - 1].name, age: users[users.length - 1].age });
  console.log(users);
}


const actualizacionNombre = (req, res) => {
  const { id } = req.params;
  const { newName } = req.body;
  console.log("Actualizando...")
  const userId = parseInt(id);
  const user = users.find(user => user.id === userId);
  if (user) {
    user.name = newName;
    res.json({ message: `Usuario ${id} actualizado` });
  } else {
    res.status(404).json({ message: `Usuario ${id} no encontrado` });
  }
  console.log(users);
}


const actUsuario = (req, res) => {
  const { id } = req.params;
  const { newName, newAge } = req.body;
  console.log("Actualizando...")
  const userId = parseInt(id);
  const user = users.find(user => user.id === userId);

  if (!newName || !newAge) {
    res.status(400).json({ message: `Falta el nombre o la edad` });
  }
  else {
    if (user) {
      user.name = newName;
      user.age = newAge;
      res.json({ message: `Usuario ${id} actualizado` });
    } else {
      res.status(404).json({ message: `Usuario ${id} no encontrado` });
    }
  }
  console.log(users);
}

const eliminarUsuario = (req, res) => {
  const { id } = req.params;
  const userId = parseInt(id);
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.json({ message: `Usuario ${id} eliminado` });
  } else {
    res.status(404).json({ message: `Usuario ${id} no encontrado` });
  }
  console.log(users);
}


const enviarUsuario = (req, res) => {
  const { id } = req.params;
  const userId = parseInt(id);
  const user = users.find(user => user.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(410).json({ message: `Usuario ${id} no encontrado` });
  }
}

//exportamos las funciones
module.exports = {
  enviarMensaje,
  enviarUsuarios,
  ingresoUsuario,
  actUsuario,
  actualizacionNombre,
  eliminarUsuario,
  enviarUsuario
};
