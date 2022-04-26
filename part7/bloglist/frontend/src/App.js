import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/blogForm'
import Togglable from './components/toggable'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { login } from './reducers/userReducer'
import { Link, Route, Routes, useMatch } from 'react-router-dom'
import UserList from './components/UserList'
import userService from './services/users'
import User from './components/User'
import Navigation from './components/Navigation'
import { Button, Container, Table, TableBody, TableCell, TableRow, TextField, Typography } from '@mui/material'

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
      dispatch(setNotification(`Hello ${user.name}`, 'success', 5000))
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(setNotification('wrong username or password', 'error', 5000))
    }
  }

  const matchUser = useMatch('/users/:id')
  const linkUser = matchUser ? users.find(user => user.id === matchUser.params.id) : null
  const matchBlog = useMatch('/blogs/:id')
  const linkBlog = matchBlog ? blogs.find(blog => blog.id === matchBlog.params.id) : null
  return (
    <Container>
      {user === null ?
        <div>
          <Typography variant='h2' mb={5}>Log in to application</Typography>
          <form onSubmit={handleLogin}>
            <div>
              <TextField
                variant='standard'
                label='username'
                value={username}
                id='username'
                name='Username'
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              <TextField
                variant='standard'
                label='password'
                value={password}
                id='password'
                type='password'
                name='Password'
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <Button variant='outlined' type='submit' sx={{ mt: 2 }} >login</Button>
          </form>
        </div>
        :
        <div>
          <Navigation message={`${user.name} logged in`} />
        </div>
      }

      <Notification />

      <Routes>
        <Route path='/users' element={user ? <UserList users={users} /> : null} />
        <Route path='/users/:id' element={user ? <User user={linkUser} /> : null} />
        <Route path='/blogs/:id' element={user ? <Blog blog={linkBlog} /> : null} />
        <Route path='/' element={
          <div>
            {user === null
              ? null
              : <div>
                <Typography variant='h2' pb={5} pt={5}>Blogs</Typography>
                <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                  <BlogForm blogFormRef={blogFormRef} />
                </Togglable>
                <Table>
                  <TableBody >
                    {
                      blogs.sort((a, b) => b.likes - a.likes)
                        .map(blog => {
                          return (
                            <TableRow key={blog.id}  >
                              <TableCell>
                                <Link
                                  key={blog.id}
                                  to={`/blogs/${blog.id}`} >
                                  {blog.title} {blog.author}
                                </Link>
                              </TableCell>
                            </TableRow>
                          )
                        }
                        )
                    }
                  </TableBody>
                </Table>
              </div>
            }
          </div>
        } />
      </Routes>
    </Container>
  )


}

export default App