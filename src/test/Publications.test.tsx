import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Publications from '@/pages/Publications';

const renderPublications = () =>
  render(
    <BrowserRouter>
      <Publications />
    </BrowserRouter>
  );

describe('Publications Page', () => {
  it('renders the page heading', () => {
    renderPublications();
    expect(screen.getByText('חדשות נדל"ן עדכניות')).toBeInTheDocument();
  });

  it('renders publication cards', () => {
    renderPublications();
    expect(screen.getByText('עליית מחירי הדירות במרכז: מה זה אומר לשוק?')).toBeInTheDocument();
    expect(screen.getByText(/בניית תשתיות בשכונות חדשות/)).toBeInTheDocument();
    expect(screen.getByText(/השכרת דירות לתקופות קצרות/)).toBeInTheDocument();
  });

  it('renders "read more" links', () => {
    renderPublications();
    const readMoreLinks = screen.getAllByText('קרא עוד');
    expect(readMoreLinks.length).toBe(3);
  });

  it('renders the header navigation', () => {
    renderPublications();
    expect(screen.getAllByText('ראשי').length).toBeGreaterThan(0);
  });

  it('renders publication sources', () => {
    renderPublications();
    expect(screen.getByText('גלובס')).toBeInTheDocument();
    expect(screen.getByText('דה מרקר')).toBeInTheDocument();
    expect(screen.getByText('כלכליסט')).toBeInTheDocument();
  });
});
