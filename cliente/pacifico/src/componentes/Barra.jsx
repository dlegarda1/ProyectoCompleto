import React from 'react';
import { Link } from 'react-router-dom';
import styles from "../Estilos/barra.module.css";
import { NavDropdown } from 'react-bootstrap';


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
          <NavDropdown title="Tema" id="basic-nav-dropdown" data-theme={tema}>
            <NavDropdown.Item onClick={temaLigth}>claro</NavDropdown.Item>
            <NavDropdown.Item onClick={temaDark}>
              oscuro
            </NavDropdown.Item>
          </NavDropdown>
        </nav>

      </div>
    </header>    
  );
};
export default Barra;
