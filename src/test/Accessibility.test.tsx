import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AccessibilityWidget } from '@/components/AccessibilityWidget';

const renderWidget = () =>
  render(
    <BrowserRouter>
      <AccessibilityWidget />
    </BrowserRouter>
  );

describe('AccessibilityWidget', () => {
  it('renders the accessibility toggle button', () => {
    renderWidget();
    const button = screen.getByLabelText(/נגישות/i) || screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('renders skip to main content link', () => {
    renderWidget();
    const skipLink = screen.getByText('דלג לתוכן הראשי');
    expect(skipLink).toBeInTheDocument();
  });
});
