describe('Pojazdy should list', () => {
    it('User can see pojazdy', function() {
        cy.visit('http://localhost:3000/pojazdy')
        cy.url().should('include', '/pojazdy')
    })

    it('Pojazd list should render properly', function() {
        cy.visit('http://localhost:3000/pojazdy')
        cy.get('tr')
            .should('have.length.gt', 1)
            .first()
            .should('contain.text', 'ID pojazduNumer rejestracyjny')
    })

    it('Pojazd GET response should return correct pojazd list', function () {
        // Mozna przechwytywac zapytania
        cy.intercept('GET', 'api/v1/pojazdy').as('getPojazdy')
        cy.visit('http://localhost:3000/pojazdy')
        cy.wait('@getPojazdy').its('response.statusCode')
            .should('be.oneOf', [200, 304])

        // Lub emulowac je i sprawdzac zawartosc
        cy.request('http://localhost:4000/api/v1/pojazdy')
            .its('body')
            .its('0')
            .then((user) => {
                expect(user).property('ID_pojazdu').to.be.a('number')
                expect(user).property('nr_rejestracyjny').to.be.a('string')
                expect(user).property('spalanie').to.be.a('number')
                expect(user).property('stawka').to.be.a('number')
            })
    })
})
