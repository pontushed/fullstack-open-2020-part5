import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('form returns a valid blog upon submit', () => {
  const createBlog = jest.fn()

  const component = render(<BlogForm createBlog={createBlog} />)
  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'testing of forms could be easier' },
  })
  fireEvent.change(authorInput, {
    target: { value: 'Tester Tester' },
  })
  fireEvent.change(urlInput, {
    target: { value: 'https://test.com' },
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe(
    'testing of forms could be easier'
  )
  expect(createBlog.mock.calls[0][0].author).toBe('Tester Tester')
  expect(createBlog.mock.calls[0][0].url).toBe('https://test.com')
})
