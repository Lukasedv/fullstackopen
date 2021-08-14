import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () => {

  const users = useSelector(state => state.users)

  if (!users) {
    return null
  }

  console.log(users)

  return(
    <div>
      <ul>
        {users.sort(function (a, b) {
          return b.blogs.length - a.blogs.length
        }).map(user =>
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
            <span> has {user.blogs.length} blogs</span>
          </li>
        )}
      </ul>
    </div>
  )
}

export default UserList