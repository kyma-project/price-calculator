import { Step } from './cost';

context('Go through calculator', () => {
  it('', () => {
    cy.visit('/');

    cy.get('ui5-wizard-step[title-text="Base Configuration"]:visible').within(
      () => {
        cy.get('[id="vm-size-select"]').click();

        cy.get('ui5-option:visible').contains('4 CPU').click();

        cy.costShouldBe(Step.BASE_VM_SIZE_INCREASE);

        cy.typeIntoSlider('autoscaler-input', 10);
        cy.get('ui5-button').contains('Next').click();
      },
    );

    cy.get('ui5-wizard-step[title-text="Worker Node Pools"]:visible').within(
      () => {
        cy.get('ui5-button').contains('Add Worker Node Pool').click();

        cy.get('#machine-setup-0').find('[id=machine-type-select]').click();
        cy.get('ui5-option:visible').contains('Compute Optimized').click();

        cy.get('#machine-setup-0').find('[id="vm-size-select"]').click();
        cy.get('ui5-option:visible').contains('16GB').click();

        cy.get('#machine-setup-0').within(() => {
          cy.typeIntoSlider('autoscaler-input', 5);
        });
        cy.get('ui5-button').contains('Next Step').click();
      },
    );

    cy.get('ui5-wizard-step[title-text="Storage"]:visible').within(() => {
      cy.typeIntoSlider('gb-quantity-input', 5);
      cy.typeIntoSlider('premium-gb-quantity-input', 7);
      cy.get('ui5-button').contains('Next Step').click();
    });

    cy.get(
      'ui5-wizard-step[title-text="Additional Configuration"]:visible',
    ).within(() => {
      //   TODO: move slider of conversion rate
      cy.get('[id=redis-select]').click();
      // cy.get('ui5-select.redis-select').click();
      cy.get('ui5-option:visible').contains('Standard4').click(); //Click is not visible!?
    });
  });
});
