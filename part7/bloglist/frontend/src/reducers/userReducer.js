import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    login: (state, action) => {
      blogService.setToken(action.payload.token)
      return action.payload
    },
    logout: () => {
      window.localStorage.removeItem('loggedBlogappUser')
      return null
    }
  }
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer