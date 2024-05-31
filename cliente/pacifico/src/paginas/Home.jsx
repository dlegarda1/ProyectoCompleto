import React, { useState } from 'react';
import CardCompra from '../componentes/cardcompra';
import FormLogin from '../componentes/formLogin';
import Formulario from '../componentes/formulario';
import FormProtegido from '../componentes/formProtegido';
import FormProtegidoBD from '../componentes/formManejoBaseDatos';
import ContadorClicks from '../componentes/contadorClicks';
import ImagenForm from '../componentes/imagenForm'
import DocumentoForm from '../componentes/documentoForm'
function Home() {
  const [autenticacion, setAutenticacion] = useState(false);

  const handleLogin = () => {
    setAutenticacion(true);
  };
  return (
    <div className="container">
      <ImagenForm />
      <DocumentoForm />
    </div>
  )
  /*
  return (
    <div className="App">
      <header className="App-header" />
      <h1>Home</h1>
      {autenticacion ? (
        <FormProtegidoBD />
      ) : (
        <FormLogin onLogin={handleLogin} />
      )}    
    </div>
  );*/
}

export default Home;