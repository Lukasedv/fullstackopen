import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { initializeBlogs } from './reducers/blogReducer'
import { timedNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(timedNotification('', 0))
  },[dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const blogs = useSelector(({ blogs }) => {
    return blogs
  })


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
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
      window.localStorage.removeItem('loggedBlogappUser')
      blogService.setToken(null)
      setUser(null)
      setUsername('')
      setPassword('')
      dispatch(timedNotification('User logged out', 5000))
    } catch (exception) {
      dispatch(timedNotification('Error logging out', 5000))
    }
  }

  const addBlog = () => {
    console.log('adding blog')
  }

  const likeBlog = () => {
    console.log('like blog')
    dispatch(timedNotification('Liked blog', 5000))
  }

  const removeBlog = () => {
    console.log('remove blog')
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

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog}/>
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


  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user === null ?
        loginForm() :
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout} type="logout">log out</button>
          </p>
          {blogForm()}
        </div>
      }
      {blogs.sort(function (a, b) {
        return b.likes - a.likes
      }).map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={removeBlog} user={user}/>
      )}
    </div>
  )
}

export default App