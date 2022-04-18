const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(response.body.length).toBe(helper.initialBlogs.length)
})

// test that the unique identifier property of the blog posts is named id
test('unique identifier property of blog posts is named id', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(response.body[0].id).toBeDefined()
})
// test that post create a new blog
test('post create a new blog', async () => {
  const newBlog = {
    title: 'cool blog 4',
    author: 'cool author 4',
    url: 'cool url 4',
    likes: 0
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const titles = response.body.map(r => r.title)
  expect(response.body.length).toBe(helper.initialBlogs.length + 1)
  expect(titles).toContain(newBlog.title)
})
// test that post create a new blog with likes set to 0 if not defined
test('post create a new blog with likes set to 0 if not defined', async () => {
  const newBlog = {
    title: 'cool blog 4',
    author: 'cool author 4',
    url: 'cool url 4'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const likes = response.body.map(r => r.likes)
  expect(likes).toContain(0)
})
// test that post return error if title or url is missing
test('post return error if title or url is missing', async () => {
  const newBlog = {
    author: 'cool author 4'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})
//test delete a blog
test('delete a blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)
  const titles = blogsAtEnd.map(r => r.title)
  expect(titles).not.toContain(blogToDelete.title)
})
// test that put update a blog
test('put update a blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  const updatedBlog = {
    title: 'cool blog 4',
    author: 'cool author 4',
    url: 'cool url 4',
    likes: 10
  }
  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(blogsAtStart.length)
  const likes = blogsAtEnd.map(r => r.likes)
  expect(likes).toContain(updatedBlog.likes)
})

afterAll(() => {
  mongoose.connection.close()
})