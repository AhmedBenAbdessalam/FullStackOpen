import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  if (!blog) return null
  return (
    <div>
      <h1>{blog.title} {blog.author}</h1>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes <button onClick={() => { dispatch(likeBlog(blog)) }} >like</button></div>
      <div>added by {blog.user.name}</div>
    </div>
  )
}

export default Blog