import { ThumbUp } from '@mui/icons-material'
import { Button, Container, Divider, IconButton, Link, Paper, TextField, Typography } from '@mui/material'
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
      dispatch(setNotification('a new comment added', 'success', 5000))
    } catch (error) {
      dispatch(setNotification('something went wrong when adding a new comment', 'error', 5000))
    }
  }
  if (!blog) return null
  return (
    <div>
      <Typography variant='h2' pt={3} pb={5}>{blog.title} {blog.author}</Typography>
      <Link href={blog.url}>{blog.url}</Link>
      <Typography variant='body1'>{blog.likes} likes <IconButton size="small" color='primary' onClick={() => { dispatch(likeBlog(blog)) }} ><ThumbUp /></IconButton></Typography>
      <Typography variant='body1'>added by {blog.user.name}</Typography>
      <Typography variant='h4' pt={2} pb={2}>comments</Typography>
      <form onSubmit={handleComment}>
        <div style={{ display: 'flex' }}>
          <TextField
            variant='outlined'
            id='comment'
            name='comment'
          />
          <Button type='submit'>add comment</Button>
        </div>
      </form>

      <Paper variant='outlined' sx={{ mt: 2 }}>
        {blog.comments.map(comment => (<Container key={comment.id}>
          <Typography sx={{ mt: 3, mb: 3 }} variant='body1' >{comment.comment}</Typography>
          <Divider variant="fullWidth" />
        </Container>))}
      </Paper>

    </div>
  )
}

export default Blog