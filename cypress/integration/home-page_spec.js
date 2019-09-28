/* eslint-env mocha */
/* global cy */

describe('Web app', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('landing page', () => {
    cy.get('h1')
      .should('have.text', 'The Oracle')
    cy.get('p')
      .should('have.text', 'Do you want to know the meaning of everything?')
  })

  it('question', () => {
    cy.get('button')
      .contains('Please tell me')
      .click()
    cy.get('p')
      .contains(/The answer is [0-9]+/)
  })
})
