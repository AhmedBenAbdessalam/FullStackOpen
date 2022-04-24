import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name:'notification',
  initialState: {message:''},
  reducers: {
    addNotification(state, action) {
      if (state.timeoutId) clearTimeout(state.timeoutId)
      const notification = action.payload
      return notification
    },
    clearNotification(state,action) {
      return {message:''}
    }
  },
})
export const { addNotification, clearNotification} = messageSlice.actions


export const setNotification = (message, timer) => {
  return async dispatch => {
    //set new timeout
    const timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, timer * 1000);
    //set new message
    const newNotification = {
      message: message,
      timeoutId: timeoutId,
    }
    dispatch(addNotification(newNotification))
  }
}

export default messageSlice.reducer