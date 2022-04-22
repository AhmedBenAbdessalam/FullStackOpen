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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login',
      {username:'test', password:'password'})
      .then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
      })
      cy.visit('http://localhost:3000')
    })

    it('A blog can be created', function () {
      const blog ={
        title:'test blog',
        author:'test author',
        url: 'www.testblog.com'
      }
      cy.get('button').contains('create new blog').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#submit-blog').click()
      cy.get('.blog').contains('test blog test author')
    })
    describe('when there\'s a list of blogs', function(){

      beforeEach(function(){
        const blogList = [
        {
          title: 'test blog 1',
          author: 'test author 1',
          url: 'www.testblog.com 1'
        },
        {
           title: 'test blog 2',
           author: 'test author 2',
           url: 'www.testblog.com 2'
        },
         {
           title: 'test blog 3',
           author: 'test author 3',
           url: 'www.testblog.com 3'
         },
        ]
        blogList.forEach((blog, index) =>{
          cy.get('button').contains('create new blog').click()
          cy.get('#title').type(blog.title)
          cy.get('#author').type(blog.author)
          cy.get('#url').type(blog.url)
          cy.get('#submit-blog').click()
          cy.get(`#blog-${index}`).contains(`${blog.title} ${blog.author}`, { timeout: 10000 })
        })
      })
      it('user can like a blog', function () {
        cy.get('#blog-1 button').contains('view').click()
        cy.get('#blog-1 button').contains('like').click()
        cy.get('#blog-1').contains('1 likes')
      })
    })
   
  })
})