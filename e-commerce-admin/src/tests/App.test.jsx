import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Home from '../components/Home';

describe('App Components', () => {
  it('renders the Home component correctly', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    
    const heading = screen.getByText(/Welcome to Coffee R Us Admin Portal/i);
    expect(heading).toBeInTheDocument();
  });
});