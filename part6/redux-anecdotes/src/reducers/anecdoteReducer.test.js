import { addLike } from './anecdoteReducer'
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
})