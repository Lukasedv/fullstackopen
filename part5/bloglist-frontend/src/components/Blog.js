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
      <div style={hideWhenVisible}>
        <p>{blog.title}
          <button onClick={toggleVisibility}>Show</button>
        </p>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.title}</p>
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <p>Likes: {blog.likes} <button onClick={addLike}>Like</button> </p>
        {user === null ? '' :
          <div>{user.username === blog.user.username ? <button onClick={removeBlog}>Remove</button>: ''}</div>
        }
        <button onClick={toggleVisibility}>Hide</button>
      </div>
    </div>
  ) }

export default Blog