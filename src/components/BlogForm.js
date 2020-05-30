import React, { useState } from 'react'
const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = { title, author, url }
    setTitle('')
    setAuthor('')
    setUrl('')
    createBlog(newBlog)
  }

  return (
    <form onSubmit={addBlog}>
      <h2>Create a new blog entry</h2>
      <div>
        Title:
        <input
          id='title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author:
        <input
          id='author'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        URL:
        <input
          id='url'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type='submit'>Create</button>
    </form>
  )
}

export default BlogForm
