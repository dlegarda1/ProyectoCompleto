import React from 'react';
import Barra from "../componentes/Barra";
import Pie from "../componentes/Pie";
import { Outlet } from "react-router-dom";



function Estructura() {
    let tema = "ligth";
    const [darkMode, setDarkMode] = React.useState(false);
    const cambioEstado = () => {
        setDarkMode(!darkMode);
    }
    if (darkMode) {
        tema = "ligth";
    } else {
        tema = "dark";
    }
    console.log('cambio de estado ' + darkMode + " " + tema);
    return (
        <div>
            <Barra />            
                <main>
                    <div className='contenedorPrincipal'>
                        <Outlet />
                    </div>
                </main>
                <Pie />  

        </div>
    )
}

export default Estructura;