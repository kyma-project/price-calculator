import { Step } from './cost';

context('Go through calculator', () => {
  it('Visit Base Configuration', () => {
    cy.visit('/');

    cy.get('ui5-wizard-step[title-text="Base Configuration"]:visible').within(
      () => {
        cy.get('[id="vm-size-select"]').click();

        cy.clickOnOption('4 CPU');
        cy.costShouldBe(Step.BASE_VM_SIZE_INCREASE);

        cy.typeIntoSlider('autoscaler-input', 10);
        cy.costShouldBe(Step.BASE_AUTOSCALER_INCREASE);

        cy.get('ui5-button').contains('Next').click();
      },
    );

    cy.get('ui5-wizard-step[title-text="Worker Node Pools"]:visible').within(
      () => {
        cy.get('ui5-button').contains('Add Worker Node Pool').click();
        cy.costShouldBe(Step.WORKER_ADD_NODE);

        cy.get('#machine-setup-0').find('[id=machine-type-select]').click();
        cy.clickOnOption('Compute Optimized');
        cy.costShouldBe(Step.WORKER_TYPE_CHANGE);

        cy.get('#machine-setup-0').find('[id="vm-size-select"]').click();
        cy.clickOnOption('16GB');
        cy.costShouldBe(Step.WORKER_SIZE_CHANGE);

        cy.get('#machine-setup-0').within(() => {
          cy.typeIntoSlider('autoscaler-input', 5);
        });
        cy.costShouldBe(Step.WORKER_AUTOSCALER_INCREASE);
        cy.get('ui5-button').contains('Next Step').click();
      },
    );

    cy.get('ui5-wizard-step[title-text="Storage"]:visible').within(() => {
      cy.typeIntoSlider('gb-quantity-input', 160); //Value should be divided by 32
      cy.costShouldBe(Step.STORAGE_GB_INCREASE);

      cy.typeIntoSlider('premium-gb-quantity-input', 160); //Value should be divided by 32
      cy.costShouldBe(Step.STORAGE_PREMIUM_GB_INCREASE);

      cy.get('ui5-button').contains('Next Step').click();
    });

    cy.get(
      'ui5-wizard-step[title-text="Additional Configuration"]:visible',
    ).within(() => {
      cy.get('[id=redis-select]').click();
      cy.clickOnOption('Standard4'); //When value is outside UI5wizard step, click is not possible.
      cy.costShouldBe(Step.ADDITIONAL_REDIS_INCREASE);

      cy.get('ui5-button').contains('CSV File').click();
      cy.readFile('cypress/downloads/Kyma-Price-Calculations.csv').should(
        'exist',
      );

      cy.get('ui5-button').contains('XLSX File').click();
      cy.readFile('cypress/downloads/Kyma-Price-Calculations.xlsx').should(
        'exist',
      );
    });
  });
});
