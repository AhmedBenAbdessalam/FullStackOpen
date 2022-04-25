import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleNewBlog = async e => {
    e.preventDefault()
    try {
      dispatch(saveBlog({ title, author, url }))
      dispatch(setNotification(`a new blog ${title} by ${author} added`, 'valid', 5000))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      dispatch(setNotification('something went wrong when adding a new blog', 'invalid', 5000))
    }
  }
  return (
    <div id='blog-form'>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title:
          <input
            value={title}
            id='title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            value={author}
            id='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            value={url}
            id='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='submit-blog' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm