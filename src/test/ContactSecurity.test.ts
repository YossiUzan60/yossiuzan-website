import { describe, expect, it, vi } from 'vitest';
import { createContactHandler, MAX_REQUEST_BYTES } from '../../supabase/functions/send-contact-email/handler';

const valid = { name: 'יוסי אוזן', phone: '054-7841200', email: 'visitor@example.com', message: 'שלום, אשמח לקבל פרטים.', acceptedTerms: true };
function request(value: unknown, headers: Record<string, string> = {}) {
  return new Request('https://example.com/contact', {
    method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(value),
  });
}
function setup() {
  const send = vi.fn<typeof fetch>().mockResolvedValue(new Response('{}', { status: 200 }));
  return { send, handle: createContactHandler('test-only-key', send) };
}

describe('contact email trust boundary', () => {
  it('delivers legitimate Hebrew messages to the fixed recipient', async () => {
    const { send, handle } = setup();
    expect(await (await handle(request(valid))).json()).toEqual({ success: true });
    const payload = JSON.parse(String(send.mock.calls[0][1]?.body));
    expect(payload.to).toEqual(['uzan86@gmail.com']);
    expect(payload.reply_to).toBe(valid.email);
    expect(payload.html).toContain(valid.message);
    expect(payload.html).toContain('אושר בטופס');
  });

  it.each([undefined, false, 'true', 1])('rejects missing or non-boolean consent: %j', async (acceptedTerms) => {
    const { send, handle } = setup();
    expect((await handle(request({ ...valid, acceptedTerms }))).status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it('supports a configured verified sender without changing the recipient', async () => {
    const { send } = setup();
    const handle = createContactHandler('test-only-key', send, 'Website <contact@example.com>');
    await handle(request(valid));
    const payload = JSON.parse(String(send.mock.calls[0][1]?.body));
    expect(payload.from).toBe('Website <contact@example.com>');
    expect(payload.to).toEqual(['uzan86@gmail.com']);
  });

  it('renders submitted markup as text instead of links, scripts or images', async () => {
    const { send, handle } = setup();
    await handle(request({ ...valid, name: '<img src=x onerror=alert(1)>', message: '<a href="https://evil.example">Run this script</a><script>alert(1)</script>&' }));
    const { html } = JSON.parse(String(send.mock.calls[0][1]?.body));
    expect(html).toContain('&lt;img');
    expect(html).toContain('&lt;script&gt;');
    expect(html).toContain('&lt;a href=&quot;https://evil.example&quot;');
    expect(html).not.toMatch(/<script|<img|href="https:\/\/evil/);
    const document = new DOMParser().parseFromString(html, 'text/html');
    expect(document.querySelectorAll('script, img')).toHaveLength(0);
    expect(Array.from(document.querySelectorAll('a'), (link) => link.getAttribute('href')))
      .toEqual([`tel:${valid.phone}`, `mailto:${valid.email}`]);
  });

  it.each([null, [], { ...valid, name: [] }, { ...valid, message: 'x'.repeat(4001) },
    { ...valid, name: 'x\r\nBcc: victim@example.com' }, { ...valid, phone: '"><img src=x>' },
    { ...valid, email: 'bad@example.com\nBcc: victim@example.com' }])('rejects malformed fields without sending mail: %j', async (value) => {
    const { send, handle } = setup();
    expect((await handle(request(value))).status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it('rejects oversized actual bytes even without Content-Length', async () => {
    const { send, handle } = setup();
    expect((await handle(request({ ...valid, message: 'א'.repeat(MAX_REQUEST_BYTES) }))).status).toBe(413);
    expect(send).not.toHaveBeenCalled();
  });

  it('handles invalid JSON, wrong media type and unsupported methods', async () => {
    const { send, handle } = setup();
    const badJson = new Request('https://example.com', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' });
    expect((await handle(badJson)).status).toBe(400);
    expect((await handle(request(valid, { 'Content-Type': 'text/plain' }))).status).toBe(415);
    expect((await handle(new Request('https://example.com'))).status).toBe(405);
    expect((await handle(new Request('https://example.com', { method: 'OPTIONS' }))).status).toBe(204);
    expect(send).not.toHaveBeenCalled();
  });

  it('does not expose provider errors or credentials', async () => {
    const { send, handle } = setup();
    send.mockResolvedValue(new Response('private upstream details', { status: 500 }));
    expect(await (await handle(request(valid))).json()).toEqual({ error: 'Email delivery failed' });
    expect((await createContactHandler(undefined, send)(request(valid))).status).toBe(503);
    expect(send).toHaveBeenCalledTimes(1);
  });
});
