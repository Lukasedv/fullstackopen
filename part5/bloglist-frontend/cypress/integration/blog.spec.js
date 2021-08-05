describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Lukas Lundin ',
      username: 'lukasedv',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('lukasedv')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Lukas Lundin logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('lukasedv')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.message')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Lukas Lundin logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'lukasedv', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('https://cypress')
      cy.get('#submit-button').click()
      cy.contains('a blog created by cypress')
    })

    describe('and several blog exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'a blog to like by cypress', author: 'cypress', url: 'localhost:cypress' })
        cy.createBlog({ title: 'a second blog to like by cypress', author: 'cypress', url: 'localhost:cypress' })
        cy.createBlog({ title: 'a third blog to like by cypress', author: 'cypress', url: 'localhost:cypress' })
      })

      it('one of those can be liked', function () {
        cy.contains('a second blog to like by cypress').parent().contains('Show').click()
        cy.contains('a second blog to like by cypress').parent().contains('button', 'Like').click()
        cy.contains('Likes: 1')
      })
    })
  })
})