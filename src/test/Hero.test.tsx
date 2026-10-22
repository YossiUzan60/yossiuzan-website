import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Hero } from '@/components/Hero';

const renderHero = () =>
  render(
    <BrowserRouter>
      <Hero />
    </BrowserRouter>
  );

describe('Hero', () => {
  it('renders the main heading', () => {
    renderHero();
    expect(screen.getByText('שמאות מקרקעין')).toBeInTheDocument();
    expect(screen.getByText('מקצועית ואמינה')).toBeInTheDocument();
  });

  it('renders the CTA buttons', () => {
    renderHero();
    expect(screen.getByText('קבע פגישת ייעוץ')).toBeInTheDocument();
    expect(screen.getByText('054-7841200')).toBeInTheDocument();
  });

  it('renders stats section', () => {
    renderHero();
    expect(screen.getByText('15+')).toBeInTheDocument();
    expect(screen.getByText('1000+')).toBeInTheDocument();
    expect(screen.getByText('שנות ניסיון')).toBeInTheDocument();
    expect(screen.getByText('לקוחות מרוצים')).toBeInTheDocument();
  });

  it('renders the expert badge', () => {
    renderHero();
    expect(screen.getByText('מומחה מטעם בית המשפט לשמאות מקרקעין')).toBeInTheDocument();
  });

  it('renders Yossi Uzan photo', () => {
    renderHero();
    const photos = screen.getAllByAltText('יוסי אוזן - שמאי מקרקעין');
    expect(photos.length).toBeGreaterThan(0);
  });
});
