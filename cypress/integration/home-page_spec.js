/* eslint-env mocha */
describe('Landing page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:5000')
  })
})
