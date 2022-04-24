import { createSlice } from "@reduxjs/toolkit"; 
import anecdoteService from '../Services/anecdotes'
const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    addLike(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const newAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
      return state.map(a => a.id === id ? newAnecdote : a)
    },
    setAnecdotes(state,action){
      return action.payload
    }
  },
})
export const { addAnecdote, addLike, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () =>{
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer
