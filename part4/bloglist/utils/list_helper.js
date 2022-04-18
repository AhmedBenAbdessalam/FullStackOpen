const _ = require('lodash')
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const nbLikes = blogs.reduce((sum,blog) => sum + blog.likes,0)
  return nbLikes
}

const favoriteBlog =(blogs) => {
  const popularBlog = blogs.reduce((popular,blog) => {
    return (popular.likes > blog.likes) ? popular : blog
  },{})

  if (!popularBlog.title)
    return 0
  else
    return { title: popularBlog.title, author: popularBlog.author, likes:popularBlog.likes }
}

// get author with most blogs
const mostBlogs  = (blogs) => {
  const authors = _.chain(blogs)
    .groupBy('author')
    .map((value,key) => ({ author: key, blogs: value.length }))
    .value()
  const mostBlogs = _.maxBy(authors, 'blogs')
  return mostBlogs

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}