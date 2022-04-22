import {React, useState} from 'react'
const Blog = ({ blog, handleLike}) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const showWhenVisible = { display: visible ? '' : 'none' }
  return(
  <div style={blogStyle}>
    {blog.title} {blog.author} <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
    <div style={showWhenVisible}>
      <div>{blog.url}</div>
        <div>{blog.likes} likes <button onClick={() => { handleLike(blog)}} >like</button></div>
      <div>added by {blog.user.name}</div>
    </div>
  </div>  
)}
export default Blog