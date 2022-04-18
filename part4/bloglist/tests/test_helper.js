const Blog = require('../models/blog')

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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}