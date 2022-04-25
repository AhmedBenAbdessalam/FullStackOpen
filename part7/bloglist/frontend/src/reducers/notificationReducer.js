import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '' },
  reducers: {
    addNotification(state, action) {
      if (state.timeoutId) clearTimeout(state.timeoutId)
      const notification = action.payload
      return notification
    },
    clearNotification() {
      return { message: '' }
    }
  },
})
export const { addNotification, clearNotification } = notificationSlice.actions
export const setNotification = (message, style, timer) => {
  return dispatch => {
    //set new timeout
    const timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, timer)
    //set new message
    const newNotification = {
      message: message,
      style,
      timeoutId: timeoutId,
    }
    dispatch(addNotification(newNotification))
  }
}

export default notificationSlice.reducer
