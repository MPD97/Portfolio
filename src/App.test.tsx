import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders project sections', () => {
  render(<App />);
  const projectElement = screen.getByText(/Projekt 1/i);
  expect(projectElement).toBeInTheDocument();
});
