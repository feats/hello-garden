/* eslint-env mocha */
/* global cy */

describe('Landing page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('heading', () => {
    cy.get('h1')
      .should('have.text', 'The Oracle')
  })

  it('answer', () => {
    cy.get('p')
      .contains(/The answer is [0-9]+/)
  })
})
