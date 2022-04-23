import { useSelector, useDispatch } from 'react-redux'
import { addLike } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification  } from '../reducers/notificationReducer'

const Anecdote = ({anecdote, handleVote}) =>{
  return(
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )

}

const AnecdoteList = () =>{
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state=> state.filter)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addLike(id))
  }
  return(
    <>
    {
        anecdotes.filter(a => a.content.toLowerCase().includes(filter))
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <Anecdote key={anecdote.id} anecdote={anecdote} 
          handleVote={()=>{
            vote(anecdote.id)
            dispatch(setNotification(`you voted '${anecdote.content}'`))
            setTimeout(() => {
              dispatch(removeNotification())
            }, 5000);
          }} />
        )
    }  
    </>
  )
}

export default AnecdoteList