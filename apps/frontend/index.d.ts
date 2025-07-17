export {}

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      /**
       * Attendre que l'application soit prête.
       * @example cy.waitForApp()
       */
      waitForApp(): Chainable<void>

      /**
       * Simuler un appui de touche sur <body>.
       * @param key La touche à presser (lettre ou spéciale)
       * @example cy.typeKey('A')
       */
      typeKey(key: string): Chainable<JQuery<HTMLElement>>
    }
  }
}
