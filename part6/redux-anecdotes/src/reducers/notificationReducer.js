import { createSlice } from "@reduxjs/toolkit";

const initialState =''
const messageSlice = createSlice({
  name:'message',
  initialState,
  reducers: {
    setNotification(state, action) {
      const message = action.payload
      return message
    },
    removeNotification(state,action) {
      return ''
    },
  },
})
export const { setNotification, removeNotification} = messageSlice.actions
export default messageSlice.reducer