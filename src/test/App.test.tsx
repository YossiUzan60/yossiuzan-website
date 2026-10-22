import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '@/App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(document.body).toBeTruthy();
  });

  it('renders the home page by default', () => {
    render(<App />);
    // Hero section should be visible
    expect(screen.getByText('שמאות מקרקעין')).toBeInTheDocument();
  });
});
