const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const nbLikes = blogs.reduce((sum,blog) => sum + blog.likes,0)
  return nbLikes
}

const favoriteBlog =(blogs) => {
  const popularBlog = blogs.reduce((popular,blog) => {
    console.log(popular, blog)
    return (popular.likes > blog.likes) ? popular : blog
  },{})

  if (!popularBlog.title)
    return 0
  else
    return { title: popularBlog.title, author: popularBlog.author, likes:popularBlog.likes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}