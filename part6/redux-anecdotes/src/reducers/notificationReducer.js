import { createSlice } from "@reduxjs/toolkit";

const initialState ='Initial notification'
const messageSlice = createSlice({
  name:'message',
  initialState,
  reducers: {
    updateMessage(state, action) {
      const message = action.payload
      state= message
    },
  },
})
export const {updateMessage} = messageSlice.actions
export default messageSlice.reducer