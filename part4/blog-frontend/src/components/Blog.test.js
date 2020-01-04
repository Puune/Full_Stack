import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, getByText } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

test('renders content', () => {
  const blog = {
    title: 'Title',
    author: 'Me',
    likes: '1'
  }
  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent('Title');
  expect(component.container).toHaveTextContent( 'Me');
  expect(component.container).toHaveTextContent('1');
})


test('Button click calls function once', () => {
  const blog = {
    title: 'Title',
    author: 'Me',
    likes: '1'
  }

  const mockOnClick = jest.fn();

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockOnClick} />
  )

  const button = getByText('like');
  fireEvent.click(button);

  expect(mockOnClick.mock.calls.length).toBe(1);
})


test('info to be invisible at beginning', () => {
  const blog = {
    title: 'Title',
    author: 'Me',
    likes: '1'
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  const div = component.container.querySelector('.togglable');

  expect(div).toHaveStyle('display: none');
})


test('ifo to be displayed when "expanded"', () => {
  const blog = {
    title: 'Title',
    author: 'Me',
    likes: '1'
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  const expand = component.getByText('expand');
  fireEvent.click(expand);

  const div = component.container.querySelector('.togglable');

  expect(div).not.toHaveStyle('display: none');
})