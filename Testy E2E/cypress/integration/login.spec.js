describe('Login page', () => {
    beforeEach(() => {
        cy.fixture('user1').as('user')
    })

    it('User can login and logout', function() {
        cy.visit('http://localhost:3000/')
        console.log(cy);
        cy.get('[data-cy=username]').type(this.user.email).should('have.value', this.user.email)
        cy.get('[data-cy=password]').type(this.user.password).should('have.value', this.user.password)
        cy.get('button[type=submit]').click()
        cy.url().should('include', '/trasy')
    })

    it('Should show errors if login and passwords are wrong', function() {
        cy.visit('http://localhost:3000/')
        cy.get('[data-cy=username]').type("wrong@user.pl")
        cy.get('[data-cy=password]').type("wrong-password")
        cy.get('button[type=submit]').click()
        cy.contains('Zły email lub hasło!')
    })

    it('Should not allow to add book without login', function() {
        cy.visit('http://localhost:3000/')
        cy.contains('Dodaj pojazd').click()
        cy.url().should('include', '/')
    })
})