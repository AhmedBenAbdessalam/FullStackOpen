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
    .post('/api/blogs')
    .expect(201)
    .expect('Content-Type', /application\/json/)
  expect(response.body.id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})