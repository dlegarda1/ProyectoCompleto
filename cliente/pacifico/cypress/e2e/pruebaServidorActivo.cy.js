describe('Prueba de obtención de valor del servidor', () => {
  it('Obtener un valor del servidor sin mostrarlo en la página', () => {
    cy.request('GET', 'http://localhost:3001/inicio')
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.include('¡Hola, mundo!');
      });
  });
});