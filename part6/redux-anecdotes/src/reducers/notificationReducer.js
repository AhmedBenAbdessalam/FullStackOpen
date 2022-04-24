import { createSlice } from "@reduxjs/toolkit";

const initialState =''
const messageSlice = createSlice({
  name:'message',
  initialState,
  reducers: {
    addNotification(state, action) {
      const message = action.payload
      return message
    },
    clearNotification(state,action) {
      return ''
    },
  },
})
export const { addNotification, clearNotification} = messageSlice.actions

export const setNotification = (message, timer) => {
  return async dispatch => {
    dispatch(addNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timer*1000)
  }
}

export default messageSlice.reducer