import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import AddIcon from '@mui/icons-material/Add'

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleNewBlog = async e => {
    e.preventDefault()
    try {
      dispatch(saveBlog({ title, author, url }))
      dispatch(setNotification(`a new blog ${title} by ${author} added`, 'success', 5000))
      blogFormRef.current.toggleVisibility()
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      dispatch(setNotification('something went wrong when adding a new blog', 'error', 5000))
    }
  }
  return (
    <div id='blog-form'>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          <TextField
            label='title'
            variant='standard'
            value={title}
            id='title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            label='author'
            variant='standard'
            value={author}
            id='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            label='url'
            variant='standard'
            value={url}
            id='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button sx={{ mt: 2, mb: 2 }} variant='outlined' id='submit-blog' type="submit" endIcon={<AddIcon />}>create</Button>
      </form>
    </div>
  )
}

export default BlogForm