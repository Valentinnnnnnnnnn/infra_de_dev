/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

Cypress.Commands.add('waitForApp', () => {
  cy.contains('Find The Word').should('be.visible')
  cy.get('[data-testid="game-board"]', { timeout: 5000 })
    .should('be.visible')
    .and('not.be.empty')
  cy.get('[data-testid="keyboard"]', { timeout: 5000 }).should('be.visible')
})

Cypress.Commands.add('typeKey', (key: string) => {
  const code =
    key.length === 1 && /^[A-Za-z]$/.test(key) ? `Key${key.toUpperCase()}` : key

  return cy
    .get('body')
    .trigger('keydown', {
      key,
      code,
      force: true,
    }) as unknown as Cypress.Chainable<JQuery<HTMLElement>>
})
