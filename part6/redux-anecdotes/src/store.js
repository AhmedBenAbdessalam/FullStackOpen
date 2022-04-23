import { configureStore } from "@reduxjs/toolkit"
import reducer from "./reducers/anecdoteReducer"
import notificationReducer from "./reducers/notificationReducer"

const store = configureStore({
  reducer: {
    anecdotes: reducer,
    message: notificationReducer
  }
})

export default store 