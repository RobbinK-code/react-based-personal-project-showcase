import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Home from '../components/Home';

// Using a basic setup to test component rendering
describe('App Components', () => {
  it('renders the Home component correctly', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    
    // Check if the heading text is present
    const heading = screen.getByText(/Welcome to Coffee R Us Admin Portal/i);
    expect(heading).toBeInTheDocument();
  });
});