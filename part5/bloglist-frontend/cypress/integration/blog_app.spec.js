describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'test user',
      username: 'test',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  describe('Login form is shown', function () {
    it('successful login should show test user logged in', function() {

      cy.get('#username').type('test')
      cy.get('#password').type('password')
      cy.get('button').click()
      cy.contains('test user logged in')
    })
    it('failed login should show an error message', function(){
      cy.get('#username').type('test')
      cy.get('#password').type('wrongPassword')
      cy.get('button').click()
      cy.get('.invalid').should('contain', 'wrong username or password')
      cy.get('.invalid').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.invalid').should('have.css', 'border-style', 'solid')

    })
  })
})