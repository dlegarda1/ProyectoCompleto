import React from 'react';
import { Form } from 'react-bootstrap';
import { useContext } from 'react';
import { temaContexto } from '../componentes/Tema';


function Registro() {
    const tema = useContext(temaContexto);
    return (

        <div>
            <div>El nuevo tema es: {tema}</div>
            <h1>Registro</h1>
            <p>Esta es la página de registro</p>
            <Form data-bs-theme={tema}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
            </Form>
        </div>

    );
}

export default Registro;