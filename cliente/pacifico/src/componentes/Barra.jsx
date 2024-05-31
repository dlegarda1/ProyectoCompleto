import React from 'react';
import { Link } from 'react-router-dom';
import styles from "../Estilos/barra.module.css";



const Barra = () => {

  const [tema, setTema] = React.useState("ligth");

  const temaLigth = () => {
    setTema("ligth");
  }

  const temaDark = () => {
    setTema("dark");
  }

  return (
    
    <header>
      <div className={styles.contenedor}>
        <div className={styles.logo}>
          <img src="/icono.png" alt="Logo de la página" />
        </div>
        <nav>
          <Link to="/inicio">Inicio</Link>
          <Link to="/acerca">Acerca</Link>
          <Link to="/registro">Registro</Link>
          <Link to="/entrada">Entrar</Link>
          <Link to="/prueba">prueba</Link>          
        </nav>

      </div>
    </header>    
  );
};
export default Barra;
