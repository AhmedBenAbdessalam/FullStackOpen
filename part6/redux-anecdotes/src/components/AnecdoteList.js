import { useSelector, useDispatch } from 'react-redux'
import { addLike } from '../reducers/anecdoteReducer'

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
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addLike(id))
  }
  return(
    <>
    {
      anecdotes.sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={()=>vote(anecdote.id)} />
        )
    }  
    </>
  )
}

export default AnecdoteList