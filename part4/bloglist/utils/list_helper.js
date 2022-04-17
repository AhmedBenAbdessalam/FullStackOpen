const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  const nbLikes = blogs.reduce((sum,blog) => sum + blog.likes,0)
  return nbLikes
}

module.exports = {
  dummy,
  totalLikes
}