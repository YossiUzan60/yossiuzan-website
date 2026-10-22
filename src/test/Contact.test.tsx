import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Contact } from '@/components/Contact';

// Mock supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    functions: {
      invoke: vi.fn().mockResolvedValue({ data: { success: true }, error: null }),
    },
  },
}));

const renderContact = () =>
  render(
    <BrowserRouter>
      <Contact />
    </BrowserRouter>
  );

describe('Contact', () => {
  it('renders the section heading', () => {
    renderContact();
    expect(screen.getByText('נשמח לשמוע מכם')).toBeInTheDocument();
  });

  it('renders contact info cards', () => {
    renderContact();
    expect(screen.getAllByText('טלפון').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('דוא"ל').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('משרד ראשי - חדרה')).toBeInTheDocument();
    expect(screen.getByText('סניף חיפה')).toBeInTheDocument();
  });

  it('renders the contact form with all fields', () => {
    renderContact();
    expect(screen.getByPlaceholderText('הזן את שמך')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('050-0000000')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('ספרו לנו במה נוכל לעזור...')).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    renderContact();
    expect(screen.getByText('שלח הודעה')).toBeInTheDocument();
  });

  it('allows interacting with form fields', async () => {
    renderContact();
    const user = userEvent.setup();
    
    const nameInput = screen.getByPlaceholderText('הזן את שמך') as HTMLInputElement;
    await user.click(nameInput);
    expect(document.activeElement).toBe(nameInput);

    const emailInput = screen.getByPlaceholderText('your@email.com') as HTMLInputElement;
    await user.click(emailInput);
    expect(document.activeElement).toBe(emailInput);
  });

  it('renders working hours', () => {
    renderContact();
    expect(screen.getByText('שעות פעילות')).toBeInTheDocument();
    expect(screen.getByText(/ראשון - חמישי/)).toBeInTheDocument();
  });
});
