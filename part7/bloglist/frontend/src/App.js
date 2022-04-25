import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/blogForm'
import Togglable from './components/toggable'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { login, logout } from './reducers/userReducer'
import { Route, Routes, useMatch } from 'react-router-dom'
import UserList from './components/UserList'
import userService from './services/users'
import User from './components/User'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const blogs = [...useSelector(state => state.blogs)]
  const user = useSelector(state => state.user)
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(login(user))
    }
  }, [])
  const [users, setUsers] = useState([])
  useEffect(() => {
    userService.getAll().then(users => setUsers(users))
  }, [])
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      dispatch(login(user))
      dispatch(setNotification(`Hello ${user.name}`, 'valid', 5000))
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(setNotification('wrong username or password', 'invalid', 5000))
    }
  }
  const handleLogout = () => {
    dispatch(logout())
  }

  const match = useMatch('/users/:id')
  const linkUser = match ? users.find(user => user.id === match.params.id) : null
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user === null ?
        <div>
          <h2>Log in to application</h2>
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
        :
        <div>
          <p>
            {user.name} logged in
          </p>
          <button onClick={handleLogout}>logout</button>
        </div>
      }
      <Routes>
        <Route path='/users' element={<UserList users={users} />} />
        <Route path='/users/:id' element={<User user={linkUser} />} />
        <Route path='/' element={
          <div>
            {user === null
              ? null
              : <div>
                <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                  <BlogForm />
                </Togglable>
                {
                  blogs.sort((a, b) => b.likes - a.likes)
                    .map(blog => {
                      return (<Blog
                        key={blog.id}
                        blog={blog}
                        name={user.name}
                      />)
                    }
                    )
                }
              </div>
            }
          </div>
        } />
      </Routes>
    </div>
  )


}

export default App