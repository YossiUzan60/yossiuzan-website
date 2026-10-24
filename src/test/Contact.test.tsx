import { beforeEach, describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Contact } from '@/components/Contact';


const { toast } = vi.hoisted(() => ({ toast: vi.fn() }));
vi.mock('@/hooks/use-toast', () => ({ useToast: () => ({ toast }) }));

const send = vi.fn<typeof fetch>();

const renderContact = () =>
  render(
    <BrowserRouter>
      <Contact />
    </BrowserRouter>
  );

const details = { name: 'בדיקת טופס', phone: '0547841200', email: 'visitor@example.com', message: 'הודעת בדיקה מקומית' };
function fillForm() {
  fireEvent.change(screen.getByLabelText('שם מלא'), { target: { value: details.name } });
  fireEvent.change(screen.getByLabelText('טלפון'), { target: { value: details.phone } });
  fireEvent.change(screen.getByLabelText('דוא"ל'), { target: { value: details.email } });
  fireEvent.change(screen.getByLabelText('הודעה'), { target: { value: details.message } });
}

describe('Contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('fetch', send);
    send.mockResolvedValue(new Response(JSON.stringify({ success: true })));
  });

  it('requires unchecked terms consent and links to both policies', async () => {
    renderContact();
    fillForm();
    const consent = screen.getByRole('checkbox', { name: /קראתי ואני מסכים/ });
    expect(consent).not.toBeChecked();
    expect(consent).toBeRequired();
    expect(screen.getByRole('link', { name: 'תקנון' })).toHaveAttribute('href', '/regulations');
    expect(screen.getByRole('link', { name: 'מדיניות הפרטיות' })).toHaveAttribute('href', '/privacy-policy');
    await userEvent.setup().click(screen.getByRole('button', { name: 'שלח הודעה' }));
    expect(send).not.toHaveBeenCalled();
    // The submit handler also guards consent if native browser validation is bypassed.
    fireEvent.submit(screen.getByRole('button', { name: 'שלח הודעה' }).closest('form')!);
    expect(send).not.toHaveBeenCalled();
  });

  it('sends consent with the message and resets only after confirmed success', async () => {
    renderContact();
    fillForm();
    const user = userEvent.setup();
    await user.click(screen.getByRole('checkbox', { name: /קראתי ואני מסכים/ }));
    await user.click(screen.getByRole('button', { name: 'שלח הודעה' }));
    await waitFor(() => expect(send).toHaveBeenCalledWith('/api/contact', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...details, acceptedTerms: true }),
    })));
    await waitFor(() => expect(screen.getByLabelText('שם מלא')).toHaveValue(''));
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(toast).toHaveBeenCalledWith(expect.objectContaining({ title: 'הודעה נשלחה בהצלחה!' }));
  });

  it.each([
    { status: 502, body: { error: 'Delivery failed' } },
    { status: 200, body: { success: false } },
    { status: 200, body: null },
  ])('preserves the message when delivery is not confirmed: %j', async (response) => {
    send.mockResolvedValueOnce(new Response(JSON.stringify(response.body), { status: response.status }));
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});
    try {
      renderContact();
      fillForm();
      const user = userEvent.setup();
      await user.click(screen.getByRole('checkbox'));
      await user.click(screen.getByRole('button', { name: 'שלח הודעה' }));
      await waitFor(() => expect(toast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'destructive' })));
      expect(screen.getByLabelText('הודעה')).toHaveValue(details.message);
      expect(screen.getByRole('checkbox')).toBeChecked();
      expect(toast).not.toHaveBeenCalledWith(expect.objectContaining({ title: 'הודעה נשלחה בהצלחה!' }));
    } finally { log.mockRestore(); }
  });

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
