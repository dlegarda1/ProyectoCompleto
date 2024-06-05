import React from 'react'
import Saludo from './saludoBoton'

describe('<Saludo />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Saludo />)
  })
})