describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const newUser = {
      username: 'tester',
      name: 'Tester Tester',
      password: 'tester',
    }
    cy.request('POST', 'http://localhost:3001/api/users', newUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('Login').click()
      cy.get('#username').type('tester')
      cy.get('#password').type('tester')
      cy.get('#login-button').click()

      cy.contains('Tester Tester logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('Login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.get('.error').contains('Wrong credentials')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'tester', password: 'tester' })
    })

    it('A blog can be created', function () {
      cy.get('#create-blog').click()
      cy.get('#title').type('Test Blog')
      cy.get('#author').type('Author')
      cy.get('#url').type('https://www.mooc.fi')
      cy.get('#submit-blog').click()
      cy.contains('Test Blog Author')
    })

    it('A blog can be liked', function () {
      cy.get('#create-blog').click()
      cy.get('#title').type('Test Blog')
      cy.get('#author').type('Author')
      cy.get('#url').type('https://www.mooc.fi')
      cy.get('#submit-blog').click()
      cy.contains('Test Blog Author')
      cy.contains('Test Blog Author').contains('View').click()
      cy.contains('Title: Test Blog').contains('Hide')
      cy.contains('Likes: 0').contains('Like').click()
      cy.contains('Likes: 1')
    })

    it('A blog can be removed', function () {
      cy.get('#create-blog').click()
      cy.get('#title').type('Test Blog')
      cy.get('#author').type('Author')
      cy.get('#url').type('https://www.mooc.fi')
      cy.get('#submit-blog').click()
      cy.contains('Test Blog Author')
      cy.contains('Test Blog Author').contains('View').click()
      cy.contains('Title: Test Blog').contains('Hide')
      cy.contains('Remove').click()
    })

    it('Blogs are sorted by likes', function () {
      cy.get('#create-blog').click()
      cy.get('#title').type('Test Blog')
      cy.get('#author').type('Author')
      cy.get('#url').type('https://www.mooc.fi')
      cy.get('#submit-blog').click()
      cy.get('#create-blog').click()
      cy.get('#title').type('Test Blog 2')
      cy.get('#author').type('Author')
      cy.get('#url').type('https://www.mooc.fi')
      cy.get('#submit-blog').click()
      cy.contains('Test Blog 2 Author').contains('View').click()
      cy.contains('Likes: 0').contains('Like').click()
      cy.contains('Title: Test Blog 2').contains('Hide').click()
      cy.contains('Test Blog 2 Author').parent().next().contains('Test Blog')
    })
  })
})
