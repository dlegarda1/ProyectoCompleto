describe('Prueba de obtención de valor del servidor', () => {
  it('Evaluar si el servidor esta activo y respuesta cierta', () => {
    cy.request('GET', 'http://localhost:3001/inicio')
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.include('¡Hola, mundo!');
      });
  });
});

