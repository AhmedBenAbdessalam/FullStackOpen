import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/blogForm'
import Togglable from './components/toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({})

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON)
    {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser',JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotification({style: "invalid", message:"wrong username or password"})
      setTimeout(() => {
        setNotification({})
      }, 5000)
    } 
  }
  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }
  
  const addBlog = async (blogObj) => {
    const returnedObj = await blogService.create(blogObj)
    setBlogs(blogs.concat(returnedObj))
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification style={notification.style} message={notification.message} />
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor='username'>username</label>
            <input
              value={username}
              id='username'
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <label htmlFor='password'>password</label>
            <input
              value={password}
              id='password'
              type='password'
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification style={notification.style} message={notification.message} />
      <p>
        {user.name} logged in 
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="create new blog">
        <BlogForm
          createBlog={addBlog}
          setNotification={setNotification}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App