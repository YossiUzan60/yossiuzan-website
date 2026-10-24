import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '@/App';

const sections = [
  ['ראשי', 'home'],
  ['תחומי עיסוק', 'services'],
  ['אודות', 'about'],
  ['הצוות', 'team'],
  ['שאלות נפוצות', 'faq'],
  ['המלצות', 'testimonials'],
  ['צור קשר', 'contact'],
];

describe('Navigation / Routing', () => {
  const scrolledSections: string[] = [];

  beforeEach(() => {
    scrolledSections.length = 0;
    vi.spyOn(Element.prototype, 'scrollIntoView').mockImplementation(function (this: Element) {
      scrolledSections.push(this.id);
    });
    window.history.replaceState({}, '', '/');
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    window.history.replaceState({}, '', '/');
  });

  it.each(sections)('navigates from publications to %s and scrolls to its section', async (label, id) => {
    window.history.replaceState({}, '', '/publications');
    render(<App />);
    const user = userEvent.setup();

    await user.click(within(screen.getAllByRole('navigation')[0]).getByRole('link', { name: label }));

    expect(window.location.pathname).toBe('/');
    expect(window.location.hash).toBe(`#${id}`);
    await waitFor(() => expect(scrolledSections[scrolledSections.length - 1]).toBe(id));
    expect(document.getElementById(id)).toBeInTheDocument();
  });

  it('scrolls on a direct section URL and when the same destination is clicked again', async () => {
    window.history.replaceState({}, '', '/#about');
    render(<App />);
    await waitFor(() => expect(scrolledSections).toEqual(['about']));

    await userEvent.setup().click(within(screen.getAllByRole('navigation')[0]).getByRole('link', { name: 'אודות' }));

    await waitFor(() => expect(scrolledSections).toEqual(['about', 'about']));
  });

  it.each([
    ['/', 'אודות', 'about'],
    ['/publications', 'הצוות', 'team'],
    ['/publications', 'קבע פגישה', 'contact'],
  ])('closes the mobile menu on %s when clicking %s and reaches the destination', async (path, label, id) => {
    window.history.replaceState({}, '', path);
    render(<App />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Toggle menu' }));
    const menu = document.getElementById('mobile-navigation')!;

    await user.click(within(menu).getByRole('link', { name: label }));

    expect(screen.getByRole('button', { name: 'Toggle menu' })).toHaveAttribute('aria-expanded', 'false');
    expect(document.getElementById('mobile-navigation')).not.toBeInTheDocument();
    expect(window.location.pathname).toBe('/');
    await waitFor(() => expect(scrolledSections[scrolledSections.length - 1]).toBe(id));
  });

  it('returns home from publications using the logo', async () => {
    window.history.replaceState({}, '', '/publications');
    render(<App />);
    await userEvent.setup().click(screen.getByRole('link', { name: 'יוסי אוזן - שמאי מקרקעין' }));
    expect(window.location.pathname).toBe('/');
    await waitFor(() => expect(scrolledSections[scrolledSections.length - 1]).toBe('home'));
  });

  it('returns to a home section using a footer link from publications', async () => {
    window.history.replaceState({}, '', '/publications');
    render(<App />);
    await userEvent.setup().click(within(screen.getByRole('contentinfo')).getByRole('link', { name: 'אודות' }));
    expect(window.location.pathname).toBe('/');
    await waitFor(() => expect(scrolledSections[scrolledSections.length - 1]).toBe('about'));
  });

  it('opens publications from home and resets the scroll position', async () => {
    render(<App />);
    await userEvent.setup().click(within(screen.getAllByRole('navigation')[0]).getByRole('link', { name: 'פרסומים' }));
    expect(window.location.pathname).toBe('/publications');
    expect(screen.getByRole('heading', { level: 1, name: 'חדשות נדל"ן עדכניות' })).toBeInTheDocument();
    await waitFor(() => expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'instant' }));
  });
});
