import { applyStepOnPrice } from './cost';

Cypress.Commands.add('typeIntoSlider', (testID, value) => {
  cy.get(`input#${testID}`).clear();
  cy.get(`input#${testID}`).type(`${value}{enter}`).blur();
});

Cypress.Commands.add('costShouldBe', (step) => {
  const expectedPrice = applyStepOnPrice(step);
  cy.document().within(() => {
    cy.get('#SideContent').within(() => {
      cy.get('#nodes-cost')
        .find('.value')
        .contains(`${expectedPrice.Nodes.toFixed(2)} CU`);

      cy.get('#storage-cost')
        .find('.value')
        .contains(`${expectedPrice.Storage.toFixed(2)} CU`);

      cy.get('#additional-cost')
        .find('.value')
        .contains(`${expectedPrice.Additional.toFixed(2)} CU`);

      cy.get('#total-capacity-units')
        .find('.value')
        .contains(`${expectedPrice.TotalCost.CapacityUnits.toFixed(2)} CU`);

      cy.get('#total-in-currency')
        .find('.value')
        .contains(`${expectedPrice.TotalCost.Currency.toFixed(2)} €`);
    });
  });
});

Cypress.Commands.add('clickOnOption', (content) => {
  cy.get('ui5-option')
    .contains(content)
    .shadow()
    .find('li')
    .click({ force: true });
});
