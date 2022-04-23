import { addLike, addAnecdote } from './anecdoteReducer'
import reducer from './anecdoteReducer'
describe('anecdote reducer tests',()=>{
  test('like anecdote',()=>{
    const state = [{
      content: 'If it hurts, do it more often',
      id: 0,
      votes: 0
    }]
    const newState = reducer(state,addLike(0))
    expect(newState[0]).toStrictEqual({
      content: 'If it hurts, do it more often',
      id: 0,
      votes: 1
    })
  })
  test('add a new anecdote',()=>{
    const newState = reducer([],addAnecdote('a new anecdote'))
    expect(newState).toHaveLength(1)
    expect(newState[0].content).toBe('a new anecdote')

  })
})