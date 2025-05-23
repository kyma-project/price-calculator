Cypress.Commands.add(
  'typeIntoSlider', (testID, value) => {
    cy.get(`ui5-step-input[id=${testID}]`).shadow()
      .find('ui5-input').shadow()
      .find('input')
      .clear();

    cy.get(`ui5-step-input[id=${testID}]`).shadow()
      .find('ui5-input').shadow()
      .find('input')
      .type(value);
  },
);

Cypress.Commands.add(
  'CostShouldBe', (costID, expectedValue) => {
    cy.document().within(() => {
      cy.get('#SideContent').find(`#${costID}`)
        .find('.value')
        .contains(expectedValue)
    })
  },
);