describe('Example Spec', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('shows the greeting message on the home page', () => {
        cy.contains(/Hello\s.+!/);
    });

    it('shows the banner on the home page', () => {
        cy.get('.banner');
    });
});
