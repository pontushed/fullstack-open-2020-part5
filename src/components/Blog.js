import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, handleBlogUpdate, handleBlogRemoval, username }) => {
  const [showFull, setShowFull] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleView = () => {
    setShowFull(!showFull)
  }

  const addLike = () => {
    const updatedBlog = { ...blog }
    updatedBlog.likes = updatedBlog.likes + 1
    blogService
      .update(updatedBlog.id, updatedBlog)
      .then(handleBlogUpdate(updatedBlog))
  }

  const removeBlog = () => {
    const confirm = window.confirm(`Remove blog ${blog.title} ?`)
    if (confirm) {
      blogService.remove(blog.id).then(handleBlogRemoval(blog))
    }
  }

  const RemoveButton = () => {
    return username === blog.user.username ? (
      <button onClick={removeBlog}>Remove</button>
    ) : null
  }

  if (showFull) {
    return (
      <div style={blogStyle}>
        <div>
          Title: {blog.title} <button onClick={toggleView}>Hide</button>
          <br />
          Author: {blog.author}
          <br />
          URL: {blog.url}
          <br />
          Likes: {blog.likes} <button onClick={addLike}>Like</button>
          <br />
          {blog.user.name}
          <RemoveButton />
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleView}>View</button>
      </div>
    </div>
  )
}
export default Blog
