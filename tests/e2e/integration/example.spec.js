describe('Example Spec', () => {
    const bannerClassName = 'banner';

    beforeEach(() => {
        cy.visit('/');
    });

    it('shows the greeting message on the home page', () => {
        cy.contains(/Hello\s.+!/);
    });

    it('shows the banner on the home page', () => {
        cy.get(`.${ bannerClassName }`)
            .find('h1')
            .should('have.class', `${ bannerClassName }__title`);
    });
});
