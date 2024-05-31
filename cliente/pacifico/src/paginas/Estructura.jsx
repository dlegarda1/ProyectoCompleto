import React from 'react';
import Barra from "../componentes/Barra";
import Pie from "../componentes/Pie";
import { Outlet } from "react-router-dom";
import { Button, Card } from 'react-bootstrap';
import { temaContexto } from "../componentes/Tema";


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
            <Button data-bs-theme={tema} onClick={cambioEstado}>
                Cambio General
            </Button>
            <Card data-bs-theme={tema}>
                El nuevo tema es: {tema}
            </Card>
            <temaContexto.Provider value={tema}>
                <main>
                    <div className='contenedorPrincipal'>
                        <Outlet />
                    </div>
                </main>
                <Pie />
            </temaContexto.Provider>

        </div>
    )
}

export default Estructura;