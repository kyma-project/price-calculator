import { applyStepOnPrice } from './cost';

Cypress.Commands.add('typeIntoSlider', (testID, value) => {
  cy.get(`ui5-step-input[id=${testID}]`)
    .shadow()
    .find('ui5-input')
    .shadow()
    .find('input')
    .clear();

  cy.get(`ui5-step-input[id=${testID}]`)
    .shadow()
    .find('ui5-input')
    .shadow()
    .find('input')
    .type(`${value} {enter}`);
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


/*
This is workaround for chromium based browser which has problem with clicking on ui5-option.
The solution is to find li in shadow root and force click on it
 */
Cypress.Commands.add('clickOnOption', (content) => {
  cy.get('ui5-option:visible')
    .contains(content)
    .shadow()
    .find('li')
    .click({ force: true });
})