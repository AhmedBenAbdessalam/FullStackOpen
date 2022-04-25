import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog: (state, action) => {
      state.push(action.payload)
    },
    setBlog: (state, action) => {
      return action.payload
    },
    updateBlog: (state, action) => {
      const blog = action.payload
      const blogToUpdate = state.find(b => b.id === blog.id)
      const blogIndex = state.indexOf(blogToUpdate)
      state[blogIndex] = blog

    }
  }
})

export const { addBlog, setBlog, updateBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlog(blogs))
  }
}
export const saveBlog = (blogObj) => {
  return async dispatch => {
    const returnedObj = await blogService.create(blogObj)
    dispatch(addBlog(returnedObj))
  }
}
export const likeBlog = (blogObj) => {
  return async dispatch => {
    const updatedBlog = { ...blogObj, like: blogObj.like + 1 }
    const sentBlog = { id: updatedBlog.id, title: updatedBlog.title, author: updatedBlog.author, url: updatedBlog.url, likes: updatedBlog.likes + 1 }
    const returnedObj = await blogService.update(sentBlog)
    dispatch(updateBlog(returnedObj))
  }
}
export const removeBlog = (blogObj) => {
  return async dispatch => {
    if (window.confirm(`remove blog ${blogObj.title} by ${blogObj.author}`)) {
      await blogService.remove(blogObj.id)
      dispatch(initializeBlogs())
    }
  }
}

export const addComment = (blogId, comment) => {
  return async dispatch => {
    const returnedObj = await blogService.addComment(blogId, comment)
    dispatch(updateBlog(returnedObj))
  }
}

export default blogSlice.reducer