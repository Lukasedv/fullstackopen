import React, { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

const BlogForm = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    dispatch(createBlog({
      title: title,
      author: author,
      url: url,
      likes: 0,
      user: user.username
    }))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className="formDiv">
      <h2>Create a new blog</h2>

      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            id='title'
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
          <Form.Label>Title:</Form.Label>
          <Form.Control
            id='author'
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
          <Form.Label>Url:</Form.Label>
          <Form.Control
            id='url'
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm