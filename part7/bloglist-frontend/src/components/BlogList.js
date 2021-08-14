import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { timedNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'

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
      <Table striped>
        <tbody>
          {blogs.sort(function (a, b) {
            return b.likes - a.likes
          }).map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                <span> has {blog.likes} likes</span>
                <Button variant="primary" onClick={() => like(blog)}>
                  Like
                </Button>
                <Button variant="secondary" onClick={() => remove(blog)}>
                  Remove
                </Button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList