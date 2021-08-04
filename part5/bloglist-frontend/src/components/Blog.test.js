import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog =   {
    title: 'Component testing is done with react-testing-library',
    author: 'Lukas',
    url: 'https://blogaddress.com',
    likes: 1,
    user: {
      username: 'lukasedv',
      name: 'Lukas Lundin',
      id: '60fb24e98c07182ce9972f77'
    },
    id: '610a879e0a1b050528dd5cef'
  }

  const user = {
    username: 'lukasedv',
    name: 'Lukas Lundin',
    id: '60fb24e98c07182ce9972f77'
  }

  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user}/>
    )
  })

  test('component displaying a blog renders the blogs title and author', () => {

    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )


  })

  test('at start the details are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, details are displayed', () => {
    const button = component.getByText('Show')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })



})

