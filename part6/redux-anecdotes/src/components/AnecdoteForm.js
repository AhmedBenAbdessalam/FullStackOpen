import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'
const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const createAnecdote = (e) => {
    e.preventDefault()
    dispatch(addAnecdote(e.target.anecdote.value))
    e.target.anecdote.value = ''
    dispatch(setNotification('you added a new anecdote'))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000);
  }
  return(
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
      </>
  )
}

export default AnecdoteForm