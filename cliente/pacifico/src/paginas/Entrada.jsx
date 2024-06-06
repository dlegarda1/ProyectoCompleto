import React from 'react';
import { useContext } from 'react';
import { temaContexto } from '../componentes/Tema';
import FormLogin from '../componentes/formLogin';
import Formulario from '../componentes/formulario';
import FormProtegido from '../componentes/formProtegido';
import FormProtegidoBD from '../componentes/formManejoBaseDatos';
import ContadorClicks from '../componentes/contadorClicks';


function Entrada() {
  const [autenticacion, setAutenticacion] = React.useState(false);

  const handleLogin = () => {
    setAutenticacion(true);
  };

  const tema = useContext(temaContexto);
  return (
    <div>
      <h1>Entrada</h1>                 
        {autenticacion ? (
          <FormProtegidoBD />
        ) : (
          <FormLogin onLogin={handleLogin} />
        )}
      
    </div>
  );
}

export default Entrada;