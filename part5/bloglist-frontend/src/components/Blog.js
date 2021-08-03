import React, {useState} from 'react' 

const Blog = ({blog}) => {
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
        <p>Likes: {blog.likes} <button>Like</button> </p>
        <button onClick={toggleVisibility}>Hide</button>
      </div>
    </div>
)}

export default Blog