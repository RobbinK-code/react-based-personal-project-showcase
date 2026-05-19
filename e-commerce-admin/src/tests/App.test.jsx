import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import Home from '../components/Home';
import ProductDashboard from '../components/ProductDashboard';
import AddProductForm from '../components/AddProductForm';
import { useProducts } from '../hooks/useProducts';

// Mock the fetch API
global.fetch = vi.fn();

describe('App Components', () => {
  
  // HOME TESTS
  describe('Home Component', () => {
    it('renders the Home component correctly', () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      
      const heading = screen.getByText(/Welcome to Coffee R Us Admin Portal/i);
      expect(heading).toBeInTheDocument();
    });

    it('displays welcome message', () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      
      const message = screen.getByText(/central hub for managing/i);
      expect(message).toBeInTheDocument();
    });
  });

  // ROUTING TESTS
  describe('App Routing', () => {
    it('renders navigation links', () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );
      
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Product Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Add New Product')).toBeInTheDocument();
    });

    it('navigates to home page by default', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      
      expect(screen.getByText(/Welcome to Coffee R Us Admin Portal/i)).toBeInTheDocument();
    });
  });

  // PRODUCT FORM TESTS
  describe('AddProductForm Component', () => {
    beforeEach(() => {
      fetch.mockClear();
      fetch.mockResolvedValueOnce({
        json: async () => ({ id: '3', name: 'Test Coffee', price: 15.99 }),
      });
    });

    it('renders form with all input fields', () => {
      render(
        <MemoryRouter>
          <AddProductForm />
        </MemoryRouter>
      );
      
      expect(screen.getByPlaceholderText('Product Name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Origin')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Price')).toBeInTheDocument();
    });

    it('has submit button', () => {
      render(
        <MemoryRouter>
          <AddProductForm />
        </MemoryRouter>
      );
      
      expect(screen.getByText('Add Product')).toBeInTheDocument();
    });

    it('updates form state on input change', () => {
      render(
        <MemoryRouter>
          <AddProductForm />
        </MemoryRouter>
      );
      
      const nameInput = screen.getByPlaceholderText('Product Name');
      fireEvent.change(nameInput, { target: { value: 'Espresso' } });
      
      expect(nameInput.value).toBe('Espresso');
    });

    it('clears form after successful submission', async () => {
      render(
        <MemoryRouter>
          <AddProductForm />
        </MemoryRouter>
      );
      
      const nameInput = screen.getByPlaceholderText('Product Name');
      const descInput = screen.getByPlaceholderText('Description');
      const originInput = screen.getByPlaceholderText('Origin');
      const priceInput = screen.getByPlaceholderText('Price');
      const submitBtn = screen.getByText('Add Product');

      fireEvent.change(nameInput, { target: { value: 'New Coffee' } });
      fireEvent.change(descInput, { target: { value: 'Dark Roast' } });
      fireEvent.change(originInput, { target: { value: 'Brazil' } });
      fireEvent.change(priceInput, { target: { value: '12.99' } });

      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(nameInput.value).toBe('');
        expect(priceInput.value).toBe('');
      });
    });
  });

  // DASHBOARD TESTS
  describe('ProductDashboard Component', () => {
    beforeEach(() => {
      fetch.mockClear();
      fetch.mockResolvedValueOnce({
        json: async () => [
          { id: '1', name: 'Vanilla Bean', price: 10.00, description: 'Medium Roast', origin: 'Columbia' },
          { id: '2', name: 'House Blend', price: 12.00, description: 'Dark Roast', origin: 'Vietnam' }
        ],
      });
    });

    it('displays loading state', () => {
      render(
        <MemoryRouter>
          <ProductDashboard />
        </MemoryRouter>
      );
      
      expect(screen.getByText('Loading products...')).toBeInTheDocument();
    });

    it('displays products after loading', async () => {
      render(
        <MemoryRouter>
          <ProductDashboard />
        </MemoryRouter>
      );
      
      await waitFor(() => {
        expect(screen.getByText('Vanilla Bean')).toBeInTheDocument();
        expect(screen.getByText('House Blend')).toBeInTheDocument();
      });
    });

    it('has search functionality', async () => {
      render(
        <MemoryRouter>
          <ProductDashboard />
        </MemoryRouter>
      );
      
      await waitFor(() => {
        expect(screen.getByPlaceholderText('Search for a product...')).toBeInTheDocument();
      });
    });

    it('filters products based on search', async () => {
      render(
        <MemoryRouter>
          <ProductDashboard />
        </MemoryRouter>
      );
      
      await waitFor(() => {
        expect(screen.getByText('Vanilla Bean')).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText('Search for a product...');
      fireEvent.change(searchInput, { target: { value: 'House' } });

      expect(screen.getByText('House Blend')).toBeInTheDocument();
      expect(screen.queryByText('Vanilla Bean')).not.toBeInTheDocument();
    });

    it('has update price button', async () => {
      render(
        <MemoryRouter>
          <ProductDashboard />
        </MemoryRouter>
      );
      
      await waitFor(() => {
        expect(screen.getAllByText('Update Price').length).toBeGreaterThan(0);
      });
    });
  });
});
