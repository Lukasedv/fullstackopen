import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> calls the event handler it received as props with the right details when a new blog is created', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const form = component.container.querySelector('form')
  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')

  fireEvent.change(author, {
    target: { value: 'Lukas Lundin' }
  })

  fireEvent.change(title, {
    target: { value: 'Blog Title Goes Here' }
  })

  fireEvent.change(url, {
    target: { value: 'https://blogsite.com' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].author).toBe('Lukas Lundin' )
  expect(createBlog.mock.calls[0][0].url).toBe('https://blogsite.com' )
  expect(createBlog.mock.calls[0][0].title).toBe('Blog Title Goes Here' )
})