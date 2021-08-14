import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const User = (filterUser) => {

  const blogs = useSelector(state => state.blogs)
  const filterBlogs = blogs.filter(blog => blog.username === filterUser.username)

  if (!filterBlogs) {
    return null
  }

  console.log('filteruser:', filterUser)

  return(
    <div>
      <h2>Blogs by {filterUser.user.name}</h2>
      <ul>
        {filterBlogs.sort(function (a, b) {
          return b.likes - a.likes
        }).map(blog =>
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default User