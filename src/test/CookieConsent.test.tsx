import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CookieConsent, CONSENT_KEY } from '@/components/CookieConsent';

const showBanner = () => render(<MemoryRouter><CookieConsent /></MemoryRouter>);

describe('Cookie consent', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => { cleanup(); vi.restoreAllMocks(); localStorage.clear(); });

  it('saves necessary-only consent and remembers it on the next visit', () => {
    const view = showBanner();
    fireEvent.click(screen.getByRole('button', { name: 'עוגיות נחוצות בלבד' }));
    expect(JSON.parse(localStorage.getItem(CONSENT_KEY)!)).toMatchObject({ analytics: false, marketing: false });
    expect(screen.queryByRole('region', { name: 'הגדרות עוגיות' })).not.toBeInTheDocument();
    view.unmount();
    showBanner();
    expect(screen.queryByRole('region', { name: 'הגדרות עוגיות' })).not.toBeInTheDocument();
  });

  it('can reopen and withdraw optional consent', () => {
    showBanner();
    fireEvent.click(screen.getByRole('button', { name: 'אישור לכל העוגיות' }));
    expect(JSON.parse(localStorage.getItem(CONSENT_KEY)!)).toMatchObject({ analytics: true, marketing: true });
    fireEvent(window, new Event('open-cookie-settings'));
    fireEvent.click(screen.getByRole('checkbox', { name: 'עוגיות שיווקיות' }));
    fireEvent.click(screen.getByRole('button', { name: 'שמירת העדפות' }));
    expect(JSON.parse(localStorage.getItem(CONSENT_KEY)!)).toMatchObject({ analytics: true, marketing: false });
  });

  it('asks again after consent expires or storage is invalid', () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ version: 1, analytics: false, marketing: false, savedAt: 0 }));
    const view = showBanner();
    expect(screen.getByRole('region', { name: 'הגדרות עוגיות' })).toBeInTheDocument();
    view.unmount();
    localStorage.setItem(CONSENT_KEY, 'invalid');
    showBanner();
    expect(screen.getByRole('region', { name: 'הגדרות עוגיות' })).toBeInTheDocument();
  });

  it('remains usable when browser storage is blocked', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked'); });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked'); });
    showBanner();
    fireEvent.click(screen.getByRole('button', { name: 'עוגיות נחוצות בלבד' }));
    expect(screen.queryByRole('region', { name: 'הגדרות עוגיות' })).not.toBeInTheDocument();
  });
});
