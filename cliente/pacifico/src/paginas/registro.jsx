import React from 'react';
import { useContext } from 'react';
import { temaContexto } from '../componentes/Tema';
import Formulario from '../componentes/formulario';


function Registro() {
    const tema = useContext(temaContexto);
    return (
        <>
        <Formulario>            
        </Formulario>
        </>
        

    );
}

export default Registro;