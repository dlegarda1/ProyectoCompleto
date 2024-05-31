describe('Prueba de formulario Registro', () => {
  beforeEach(() => {
    cy.visit('/registro');
  });
  it('Se carga el formulario de registro', () => {
      
    cy.get('h2').contains('Formulario POST')  
    cy.wait(2000); 
  })
  it('tenemos el boton enviar', () => {
      
    cy.get('button').contains('Enviar');
    cy.wait(2000); 
  })
  it('tenemos el campo nombre', () => {

    cy.get('#name')
      .should('be.visible');
      cy.wait(2000); 
  })
  it('tenemos el campo edad', () => {    
    cy.get('#age')
      .should('be.visible');
      cy.wait(2000); 
  })
  it('No existe respuesta inicial del servidor', () => {    
    cy.get('#respuesta')
      .should('not.exist');
      cy.wait(2000); 
  })
  it('Enviamos el formulario', () => {       
    cy.get('#name').type('Juan');
    cy.get('#age').type('25');
    cy.get('button').click();
    cy.wait(2000);
    cy.get('#respuesta')
      .should('contain', 'Formulario enviado con éxito');
      cy.screenshot()
  });


})