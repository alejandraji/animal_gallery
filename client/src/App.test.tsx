import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders', () => {
  render(<App />);
  const element = screen.getByText(/Add animal/i);
  expect(element).toBeInTheDocument();
});
