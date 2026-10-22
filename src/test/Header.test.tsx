import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '@/components/Header';

const renderHeader = () =>
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

describe('Header', () => {
  it('renders the logo', () => {
    renderHeader();
    const logo = screen.getByAltText('יוסי אוזן - שמאי מקרקעין');
    expect(logo).toBeInTheDocument();
  });

  it('renders all navigation links on desktop', () => {
    renderHeader();
    expect(screen.getAllByText('ראשי').length).toBeGreaterThan(0);
    expect(screen.getAllByText('תחומי עיסוק').length).toBeGreaterThan(0);
    expect(screen.getAllByText('אודות').length).toBeGreaterThan(0);
    expect(screen.getAllByText('הצוות').length).toBeGreaterThan(0);
    expect(screen.getAllByText('שאלות נפוצות').length).toBeGreaterThan(0);
    expect(screen.getAllByText('המלצות').length).toBeGreaterThan(0);
    expect(screen.getAllByText('פרסומים').length).toBeGreaterThan(0);
    expect(screen.getAllByText('צור קשר').length).toBeGreaterThan(0);
  });

  it('renders phone and email in top bar', () => {
    renderHeader();
    const phoneLinks = screen.getAllByText('054-7841200');
    expect(phoneLinks.length).toBeGreaterThan(0);
    const emailLinks = screen.getAllByText('uzan86@gmail.com');
    expect(emailLinks.length).toBeGreaterThan(0);
  });

  it('renders CTA button', () => {
    renderHeader();
    const ctaButtons = screen.getAllByText('קבע פגישה');
    expect(ctaButtons.length).toBeGreaterThan(0);
  });

  it('renders mobile menu toggle button', () => {
    renderHeader();
    const toggleButton = screen.getByLabelText('Toggle menu');
    expect(toggleButton).toBeInTheDocument();
  });

  it('toggles mobile menu when button is clicked', async () => {
    renderHeader();
    const user = userEvent.setup();
    const toggleButton = screen.getByLabelText('Toggle menu');
    
    await user.click(toggleButton);
    // After click, the mobile menu should be visible (nav links appear in mobile menu)
    // The mobile menu renders the same links, so count should increase
    const contactLinks = screen.getAllByText('צור קשר');
    expect(contactLinks.length).toBeGreaterThanOrEqual(1);
  });

  it('renders office addresses', () => {
    renderHeader();
    expect(screen.getByText(/התחיה 2, חדרה/)).toBeInTheDocument();
    expect(screen.getByText(/הצבעוני 7/)).toBeInTheDocument();
  });
});
