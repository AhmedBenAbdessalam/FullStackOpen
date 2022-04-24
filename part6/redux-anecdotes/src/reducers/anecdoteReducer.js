import { createSlice } from "@reduxjs/toolkit"; 
import anecdoteService from '../Services/anecdotes'
const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      const newAnecdote = action.payload
      return state.map(a => a.id === newAnecdote.id ? newAnecdote : a)
    },
    setAnecdotes(state,action){
      return action.payload
    }
  },
})
export const { addAnecdote, updateAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () =>{
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(anecdote))
  }
}
export const like = anecdote =>{
  return async dispatch =>{
    const updatedAnecdote = await anecdoteService.updateAnecdote(anecdote)
    dispatch(updateAnecdote(updatedAnecdote))
  }

}

export default anecdoteSlice.reducer
