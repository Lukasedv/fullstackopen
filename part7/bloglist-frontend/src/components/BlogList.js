import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { timedNotification } from '../reducers/notificationReducer'

const BlogList = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)

  const like = (blog) => {
    dispatch(likeBlog(blog))
    dispatch(timedNotification(`Voted for blog "${blog.title}"`, 5000))
  }
  if (!blogs) {
    return null
  }

  return(
    <div>
      {blogs.sort(function (a, b) {
        return b.likes - a.likes
      }).map(blog =>
        <div key={blog.id}>
          <div>
            {blog.title}
          </div>
          <div>
            has {blog.likes}
            <button onClick={() => like(blog)}>like</button>
          </div>
        </div>

      )}
    </div>
  )
}

export default BlogList