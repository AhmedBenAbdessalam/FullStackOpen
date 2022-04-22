import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './blogForm'

test('the event handler it received as props with the right details when a new blog is created',
  async () => {
    const blog = {
      title: 'test title',
      author: 'test author',
      url: 'test url',
      likes: 0,
      user: {
        name: 'test name'
      }
    }
    const user = userEvent.setup()
    const mockHandler = jest.fn()
    const { container } = render(<BlogForm
      createBlog={mockHandler}
      setNotification={mockHandler}
    />)
    const titleInput = container.querySelector('#title')
    const authorInput = container.querySelector('#author')
    const urlInput = container.querySelector('#url')
    const button = container.querySelector('button')
    await user.type(titleInput,blog.title)
    await user.type(authorInput, blog.author)
    await user.type(urlInput, blog.url)
    await user.click(button)
    expect(mockHandler.mock.calls[0]).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0]['title']).toBe(blog.title)
    expect(mockHandler.mock.calls[0][0]['author']).toBe(blog.author)
    expect(mockHandler.mock.calls[0][0]['url']).toBe(blog.url)

  })