const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('Initial blogs', () => {
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('all blogs have unique identifier field named "id"', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.every(blog => blog.id)).toBeTruthy()
})

})

describe('Adding blogs', () => {
test('HTTP POST successfully creates a new blog post', async () => {
  const newBlog = {
    title: 'This is an added blog',
    author: 'Lukas Lundin',
    url: 'localhost',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const title = blogsAtEnd.map(blog => blog.title)
  expect(title).toContain(
    'This is an added blog'
  )
})

test('if the likes property is missing from the request, it will default to the value 0', async () => {
  const newBlog = {
    title: 'This is a blog without likes',
    author: 'Lukas Lundin',
    url: 'localhost'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const likes = blogsAtEnd.map(blog => blog.likes)
  expect(likes[likes.length - 1]).toBe(0)
})

test('blog without title and url is not added', async () => {
  const newBlog = {
    url: "localhost",
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})
})

describe('Edit a blog', () => {
  test('edit blog likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToEdit = blogsAtStart[0]

    const updatedBlog = {
      likes: 50
    }

    await api
      .put(`/api/blogs/${blogToEdit.id}`)
      .send(updatedBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    const likes = blogsAtEnd.map(blog => blog.likes)

    expect(likes[0]).toBe(updatedBlog.likes)
  })
})


describe('Delete a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const title = blogsAtEnd.map(blog => blog.title)

    expect(title).not.toContain(blogToDelete.title)
  })
})


afterAll(() => {
  mongoose.connection.close()
}) 