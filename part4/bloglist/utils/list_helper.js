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
    .map((value,key) => {
     return { author: key, blogs: value.length }
    })
    .value()
    console.log('authors',authors)
  const result = _.maxBy(authors, 'blogs')
  console.log('result',result)
  return result
}

const mostLikes =(blogs) => {
  const authors = _.chain(blogs)
    .groupBy('author')
    .map((value,key) => ({ author: key, likes: totalLikes(value) }))
    .value()
  const result = _.maxBy(authors, 'likes')
  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}