describe('Example Spec', () => {
    const bannerClassName = 'banner';

    beforeEach(() => {
        cy.visit('/');
    });

    it("returns 200 HTTP response when visiting the home page", () => {
        cy.request({
            url: '/'
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
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
