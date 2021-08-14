import React, { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { login, logout } from './reducers/userReducer'
import BlogList from './components/BlogList'
import { initializeBlogs } from './reducers/blogReducer'
import { timedNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  Switch, Route, Link
} from 'react-router-dom'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(timedNotification('', 0))
    dispatch(login())
  },[dispatch])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(login({ username, password }))
      setUsername('')
      setPassword('')
      dispatch(timedNotification('User logged in', 5000))
    } catch (exception) {
      dispatch(timedNotification('Wrong username or password', 5000))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      dispatch(logout())
      setUsername('')
      setPassword('')
      dispatch(timedNotification('User logged out', 5000))
    } catch (exception) {
      dispatch(timedNotification('Error logging out', 5000))
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        {user === null && loginForm()}
      </div>
    )
  }

  const padding = { padding: 5 }

  return (
    <div>
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user === null ?
          loginForm() :
          <em> {user.name} logged in <button onClick={handleLogout} type="logout">log out</button></em>
        }
      </div>
      <Notification />
      <h2>blogs</h2>
      <Switch>
        <Route path="/">
          <BlogList />
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm />
          </Togglable>
        </Route>

      </Switch>
    </div>
  )
}

export default App