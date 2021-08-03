import React from 'react'
import Togglable from './Togglable'

const Blog = ({blog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
  <div style={blogStyle}>
    {blog.title} {blog.author}
  <Togglable buttonLabel='Show More'>
    <p>Likes: {blog.likes}</p>
    <p>Url: {blog.url}</p>
  </Togglable>
  </div>
)}

export default Blog