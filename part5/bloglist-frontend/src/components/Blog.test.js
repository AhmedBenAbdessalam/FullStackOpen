import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, screen} from "@testing-library/react";
import Blog from "./Blog";

test('only render title and author',()=>{
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 0,
    user: {
      name: 'test name'
    }
  }
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