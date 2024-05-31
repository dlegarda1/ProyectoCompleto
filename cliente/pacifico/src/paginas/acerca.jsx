import React from 'react';
import {Button, Card, Container } from 'react-bootstrap';


function Acerca() {
    /*let tema="ligth";
    const [darkMode, setDarkMode] = React.useState(false);
    const cambioEstado = () => {
        setDarkMode(!darkMode);        
    }    
    if(darkMode){
        tema="ligth";
    }else{
        tema="dark";
    }

    console.log('cambio de estado '+darkMode+" "+tema);*/

    const [tema, setTema]= React.useState("ligth");

    const temaLigth = () => {
            setTema("ligth");        
    }

    const temaDark = () => {
        setTema("dark");        
    }

    return (
        <>
        <Container data-bs-theme={tema}>
            <Button data-bs-theme={tema} onClick={temaLigth}>
                claro
            </Button>
            <Button data-bs-theme={tema} onClick={temaDark}>
                oscuro
            </Button>
            <Card data-bs-theme={tema}>
                Esto es una tarjeta
            </Card>            
        </Container>
        </> 
    );
}
export default Acerca;