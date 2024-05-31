import React from 'react';
import { useContext } from 'react';
import { temaContexto } from '../componentes/Tema';


function Registro() {
    const tema = useContext(temaContexto);
    return (
        <>
        <p>este es otro texto</p>
        </>
        

    );
}

export default Registro;