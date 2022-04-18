const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'cool blog 1',
    author: 'cool author 1',
    url: 'cool url 1',
    likes: 7
  },
  {
    title: 'cool blog 2',
    author: 'cool author 2',
    url: 'cool url 2',
    likes: 3
  },
  {
    title: 'cool blog 3',
    author: 'cool author 2',
    url: 'cool url 3',
    likes: 1
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(response.body.length).toBe(initialBlogs.length)
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
  expect(response.body.length).toBe(initialBlogs.length + 1)
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

afterAll(() => {
  mongoose.connection.close()
})