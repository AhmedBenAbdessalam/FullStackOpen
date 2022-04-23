import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../Services/anecdotes'
const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const createAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    if (content)
    {
      const newAnecdote = await anecdoteService.createNew(content)
      console.log(newAnecdote)
      dispatch(addAnecdote(newAnecdote))
      e.target.anecdote.value = ''
      dispatch(setNotification('you added a new anecdote'))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000);
    }
    
  }
  return(
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name='anecdote' required /></div>
        <button type='submit'>create</button>
      </form>
      </>
  )
}

export default AnecdoteForm