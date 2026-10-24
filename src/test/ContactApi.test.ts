import { afterEach, describe, expect, it, vi } from 'vitest';
import { POST, GET } from '../../api/contact';

afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });
const body = { name: 'Visitor', phone: '0547841200', email: 'visitor@example.com', message: 'Contact request', acceptedTerms: true };
const request = (origin = 'https://example.com') => new Request('https://example.com/api/contact', {
  method: 'POST', headers: { origin, 'Content-Type': 'application/json' }, body: JSON.stringify(body),
});

describe('Vercel contact endpoint', () => {
  it('rejects GET', () => { expect(GET().status).toBe(405); });
  it('fails closed without a configured sender', async () => {
    vi.stubEnv('CONTACT_FROM_EMAIL', '');
    expect((await POST(request())).status).toBe(503);
  });
  it('rejects cross-origin browser submissions before contacting Resend', async () => {
    const send = vi.fn(); vi.stubGlobal('fetch', send);
    expect((await POST(request('https://unrelated.example'))).status).toBe(403);
    expect(send).not.toHaveBeenCalled();
  });
  it('uses server credentials and returns no secret or CORS headers', async () => {
    vi.stubEnv('RESEND_API_KEY', 'test-server-secret');
    vi.stubEnv('CONTACT_FROM_EMAIL', 'Website <contact@example.com>');
    const send = vi.fn().mockResolvedValue(new Response('{}', { status: 200 }));
    vi.stubGlobal('fetch', send);
    const response = await POST(request());
    expect(response.status).toBe(200);
    expect(response.headers.get('access-control-allow-origin')).toBeNull();
    expect(response.headers.get('cache-control')).toBe('no-store');
    expect(await response.json()).toEqual({ success: true });
    const options = send.mock.calls[0][1];
    expect(options.headers.Authorization).toBe('Bearer test-server-secret');
    expect(JSON.parse(options.body)).toMatchObject({ to: ['uzan86@gmail.com'], from: 'Website <contact@example.com>', reply_to: body.email });
  });
});
