import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = () => {
    likeBlog({
      user: blog.user,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    },
    blog.id)
  }

  const removeBlog = () => {
    if (window.confirm(`Do you really want to delete ${blog.title}?`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <span>{blog.title}</span>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>Show</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <span>{blog.author}</span>
        <span>{blog.url}</span>
        <span>Likes: {blog.likes}</span>
        <button id="like-button" onClick={addLike}>Like</button>
        {user === null ? '' :
          <div>{user.username === blog.user.username ? <button onClick={removeBlog}>Remove</button>: ''}</div>
        }
        <button onClick={toggleVisibility}>Hide</button>
      </div>
    </div>
  ) }

export default Blog