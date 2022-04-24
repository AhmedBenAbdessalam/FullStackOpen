import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeAnecdotes, like } from '../reducers/anecdoteReducer'
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
  useEffect(() => {
    dispatch(initializeAnecdotes())
  },[dispatch])
  const vote = anecdote => {
    dispatch(like(anecdote))
  }
  return(
    <>
    {
        anecdotes.filter(a => a.content.toLowerCase().includes(filter))
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <Anecdote key={anecdote.id} anecdote={anecdote} 
          handleVote={()=>{
            vote(anecdote)
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