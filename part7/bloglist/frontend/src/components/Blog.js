import { useDispatch } from 'react-redux'
import { addComment, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const handleComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    try {
      dispatch(addComment(blog.id, comment))
      dispatch(setNotification('a new comment added', 'valid', 5000))
    } catch (error) {
      dispatch(setNotification('something went wrong when adding a new comment', 'invalid', 5000))
    }
  }
  if (!blog) return null
  return (
    <div>
      <h1>{blog.title} {blog.author}</h1>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes <button onClick={() => { dispatch(likeBlog(blog)) }} >like</button></div>
      <div>added by {blog.user.name}</div>
      <h2>comments</h2>
      <form onSubmit={handleComment}>
        <div>
          <input
            id='comment'
            name='comment'
          />
          <button type='submit'>add comment</button>
        </div>
      </form>

      <ul>
        {blog.comments.map(comment => <li key={comment.id}>{comment.comment}</li>)}
      </ul>
    </div>
  )
}

export default Blog