import { applyStepOnPrice } from './cost';

// Must match formatCost in src/components/ResultStatistics/formatCost.ts
const formatCost = (num) =>
  num.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

Cypress.Commands.add('typeIntoSlider', (testID, value) => {
  // Wait until the UI5 input is enabled before interacting; it is briefly
  // disabled while the component (re)renders, which otherwise makes
  // clear()/type() flake with "targeted a disabled element".
  cy.get(`input#${testID}`).should('not.be.disabled').clear();
  cy.get(`input#${testID}`).type(`${value}{enter}`);
  // Pressing {enter} commits the value and the UI5 input drops focus on its
  // own, so an unconditional .blur() flakes with "no currently focused
  // element". Only blur when something is actually focused.
  cy.document().then((doc) => {
    if (doc.activeElement && doc.activeElement !== doc.body) {
      cy.wrap(doc.activeElement).blur();
    }
  });
});

Cypress.Commands.add('costShouldBe', (step) => {
  const expectedPrice = applyStepOnPrice(step);
  cy.document().within(() => {
    cy.get('#SideContent').within(() => {
      cy.get('#nodes-cost')
        .find('.value')
        .contains(`${formatCost(expectedPrice.Nodes)} CU`);

      cy.get('#storage-cost')
        .find('.value')
        .contains(`${formatCost(expectedPrice.Storage)} CU`);

      cy.get('#additional-cost')
        .find('.value')
        .contains(`${formatCost(expectedPrice.Additional)} CU`);

      cy.get('#total-capacity-units')
        .find('.value')
        .contains(`${formatCost(expectedPrice.TotalCost.CapacityUnits)} CU`);

      cy.get('#total-in-currency')
        .find('.value')
        .contains(`${formatCost(expectedPrice.TotalCost.Currency)} €`);
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
