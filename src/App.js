import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage({ text: 'Login successful.', type: 'success' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage({ text: 'Login error: Wrong credentials', type: 'error' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logoutUser = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const blogFormRef = React.createRef()
  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const addBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create(blog)
      if (newBlog) blogService.getAll().then((blogs) => setBlogs(blogs))
      setErrorMessage({
        text: `${newBlog.title} by ${newBlog.author} added`,
        type: 'success',
      })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage({ text: 'Something went wrong', type: 'error' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const loginFormRef = React.createRef()
  const loginForm = () => (
    <>
      <Notification message={errorMessage} />
      <Togglable buttonLabel='Login' ref={loginFormRef}>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    </>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  const handleBlogUpdate = (blog) => {
    const updatedBlogs = [...blogs]
    updatedBlogs[updatedBlogs.findIndex((b) => b.id === blog.id)].likes++
    setBlogs([...updatedBlogs])
  }

  const handleBlogRemoval = (blog) => {
    const updatedBlogs = [...blogs].filter((b) => b.id !== blog.id)
    setBlogs([...updatedBlogs])
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        <p>{user.name} logged in.</p>
        <button onClick={logoutUser}>Logout</button>
      </div>
      <Notification message={errorMessage} />
      {blogForm()}
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleBlogUpdate={handleBlogUpdate}
            handleBlogRemoval={handleBlogRemoval}
            username={user.username}
          />
        ))}
    </div>
  )
}

export default App
