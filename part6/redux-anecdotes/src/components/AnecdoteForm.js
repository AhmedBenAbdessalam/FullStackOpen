import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const handleAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    if (content)
    {
      dispatch(createAnecdote(content))
      e.target.anecdote.value = ''
      dispatch(setNotification(`new anecdote '${content}'`),5)
    }
    
  }
  return(
    <>
      <h2>create new</h2>
      <form onSubmit={handleAnecdote}>
        <div><input name='anecdote' required /></div>
        <button type='submit'>create</button>
      </form>
      </>
  )
}

export default AnecdoteForm