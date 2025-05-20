context('Go through calculator', () => {
  it('', () => {
    cy.visit('/');

    cy.get('[data-test-id="vm-size-select"]').click()

    cy.get('ui5-option:visible')
      .contains('4 CPU')
      .click();
  });
});
