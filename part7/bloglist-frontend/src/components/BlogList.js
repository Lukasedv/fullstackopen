import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { timedNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)

  const like = (blog) => {
    dispatch(likeBlog(blog))
    dispatch(timedNotification(`Voted for blog "${blog.title}"`, 5000))
  }

  const remove = (blog) => {
    dispatch(deleteBlog(blog))
    dispatch(timedNotification(`Deleted blog "${blog.title}"`, 5000))
  }

  if (!blogs) {
    return null
  }

  return(
    <div>
      <ul>
        {blogs.sort(function (a, b) {
          return b.likes - a.likes
        }).map(blog =>
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            <span> has {blog.likes} likes</span>
            <button onClick={() => like(blog)}>like</button>
            <button onClick={() => remove(blog)}>remove</button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default BlogList