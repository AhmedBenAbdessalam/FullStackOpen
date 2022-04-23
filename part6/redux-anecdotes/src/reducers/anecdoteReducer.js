import { createSlice } from "@reduxjs/toolkit"; 

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
export default anecdoteSlice.reducer
