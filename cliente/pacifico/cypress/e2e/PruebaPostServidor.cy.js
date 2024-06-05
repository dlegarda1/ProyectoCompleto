describe('Prueba de envío de datos mediante POST', () => {
  it('Enviar datos al servidor con name: Juan y age: 25', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3001/api/user',
      body: {
        name: 'Juan',
        age: 30
      }
    }).then((response) => {
        expect(response.status).to.equal(200);       
      });
  });
});