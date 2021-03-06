import propTypes from 'prop-types'
import { React, useState } from 'react'
const Blog = ({ blog, handleLike, handleRemove, name }) => {
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
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author} <button id='visibility-btn' onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible} className='blog-info'>
        <div>{blog.url}</div>
        <div>{blog.likes} likes <button id='like-btn' onClick={() => { handleLike(blog)}} >like</button></div>
        <div>added by {blog.user.name}</div>
        {name === blog.user.name ? <button id='remove-btn' onClick={() => { handleRemove(blog) }}>remove</button> : null}
      </div>
    </div>
  )}

Blog.propTypes = {
  blog: propTypes.object.isRequired,
  handleLike: propTypes.func.isRequired,
  handleRemove: propTypes.func.isRequired,
  name: propTypes.string.isRequired
}

export default Blog