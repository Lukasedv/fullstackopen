const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        "title": "This is a blog",
        "author": "Lukas Lundin",
        "url": "http:google.com",
        "likes": 1
      },
      {
        "title": "This is another blog",
        "author": "Donald E",
        "url": "http:google.com",
        "likes": 3
      }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'unknown', url: 'http', likes: 0 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}