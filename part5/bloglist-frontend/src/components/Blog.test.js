import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'test title',
  author: 'test author',
  url: 'test url',
  likes: 0,
  user: {
    name: 'test name'
  }
}
test('only render title and author',() => {
  const mockHandler = jest.fn()
  const { container } = render(<Blog blog={blog}
    handleLike={mockHandler}
    handleRemove={mockHandler}
    name="test name"/>)
  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('test title test author')
  const blogInfo = container.querySelector('.blog-info')
  expect(blogInfo).toHaveStyle('display: none')
})
test('render url and number of likes when the button controlling the shown details has been clicked.',
  async () => {
    const mockHandler = jest.fn()
    const { container } = render(<Blog blog={blog}
      handleLike={mockHandler}
      handleRemove={mockHandler}
      name="test name" />)
    const user = userEvent.setup()
    const button = container.querySelector('#visibility-btn')
    await user.click(button)
    expect(button).toHaveTextContent('hide')
    const blogInfo = container.querySelector('.blog-info')
    expect(blogInfo).not.toHaveStyle('display: none')
  })
test('increase like by 2 when like button get pressed twice',async() => {
  const mockHandler = jest.fn()
  const mockHandlerLike = jest.fn()

  render(<Blog blog={blog}
    handleLike={mockHandlerLike}
    handleRemove={mockHandler}
    name="test name" />)
  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)
  expect(mockHandlerLike.mock.calls).toHaveLength(2)

})