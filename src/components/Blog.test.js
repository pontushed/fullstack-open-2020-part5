import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders default content correctly', () => {
  const blog = {
    title: 'Component testing',
    author: 'Tester Tester',
    url: 'https://test.com',
    likes: 69,
  }

  const component = render(<Blog blog={blog} />)

  expect(component.container).toHaveTextContent('Component testing')
  expect(component.container).toHaveTextContent('Tester')
  expect(component.container).not.toHaveTextContent('Likes:')
  expect(component.container).not.toHaveTextContent('URL:')
})

test('renders full information after view button is clicked', () => {
  const blog = {
    title: 'Component testing',
    author: 'Tester Tester',
    url: 'https://test.com',
    likes: 69,
    user: {
      name: 'Me',
    },
  }

  const component = render(<Blog blog={blog} />)

  const button = component.getByText('View')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('Title: Component testing')
  expect(component.container).toHaveTextContent('Author: Tester')
  expect(component.container).toHaveTextContent('Likes:')
  expect(component.container).toHaveTextContent('URL:')
})

test('number of callbacks equal number of like button clicks', () => {
  const blog = {
    title: 'Component testing',
    author: 'Tester Tester',
    url: 'https://test.com',
    likes: 69,
    user: {
      name: 'Me',
    },
  }
  const mockHandler = jest.fn()
  const component = render(<Blog blog={blog} handleBlogUpdate={mockHandler} />)
  const button = component.getByText('View')
  fireEvent.click(button)

  const likeButton = component.getByText('Like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})
