import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header title in main App', () => {
  render(<App />);
  const title = screen.getByText(/Devices Task/i);
  expect(title).toBeInTheDocument();
});
