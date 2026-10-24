# Contact form email delivery

The form posts to `/api/contact`, a Node.js Vercel Function in the existing
`yossiuzan-website` project. It no longer invokes Supabase for contact submissions.
The recipient is fixed on the server to **uzan86@gmail.com**, and the validated
visitor email becomes `reply_to`. Visitors cannot override the destination.

## Secrets and sender

- `RESEND_API_KEY`: Vercel **Sensitive** variable for Production and Preview.
  Never use a `VITE_` prefix or embed it in browser code.
- `CONTACT_FROM_EMAIL`: server sender configuration. Currently uses
  `אתר יוסי אוזן <onboarding@resend.dev>`, as supplied by the owner.
  Resend's onboarding sender can send only to the account owner's email.
  Configure a verified sending domain before using other recipients.
- Local development uses the ignored `.env.local`. Windows permissions restrict
  it to the owner and the sandbox development account. Do not commit or upload it.
- Rotate credentials that have been shared in chat. Update Vercel and the local
  file, then redeploy; do not reuse old secrets in new deployments.

The endpoint reads credentials at runtime, rejects cross-origin browser requests,
validates consent and input size, escapes user HTML, and does not log visitor
content or provider errors. It reuses the tested handler under
`supabase/functions/send-contact-email/handler.ts`; that location does not create
any runtime dependency on Supabase. The old Supabase endpoint has not been changed.

## Local development

Run `npm run dev` with the supported Node version from `package.json`.
The Vite development middleware executes the same server handler at `/api/contact`.
Missing credentials or sender configuration produce an error, never mock success.
`vite preview` serves static build output only; use `npm run dev` for local API work.

## Deployment

Vercel detects `api/contact.ts` automatically. `vercel.json` excludes `/api` from
the SPA rewrite while preserving direct links such as `/publications`.
Deploy frontend and API together. Adding environment variables alone does not
update the live website. A preview was created on 2026-10-24; production has not
been promoted as part of this setup.

## Verification

The full suite passed: 71 tests covering form behavior, navigation, consent,
request limits, HTML escaping, server credentials, fixed recipient, and failure
handling. TypeScript checks and the production build passed. A bundle scan found
no Resend credential. Local probes returned 405 for GET and 400 for invalid POST.
Tests mock the provider; mailbox delivery requires a separately approved test.

An earlier approved test against the old Supabase endpoint failed with
`API key is invalid`. The replacement credential was recognized by Resend as a
sending-only key. Domain listing is unavailable with that permission. The Resend
plugin returned an unknown-tool error, so direct API checks were used.

## Privacy wording

The owner-supplied Hebrew privacy notice is displayed verbatim above the required
terms/privacy checkbox. Its compliance and no-third-party-sharing claims have not
been independently verified; review them against the use of Vercel and Resend.

References:
- https://vercel.com/docs/functions/functions-api-reference
- https://resend.com/docs/knowledge-base/403-error-resend-dev-domain
- https://shmueluzan-law.com/contact
A Vercel preview runtime check found an extensionless ESM import that local Vite
accepted but Node rejected. The import now explicitly targets `handler.js`.
The server entry was compiled with TypeScript NodeNext and loaded by Node directly;
GET returned 405. The focused API tests passed again after this correction.
## Confirmed preview delivery — 2026-10-24

The corrected preview is:
https://yossiuzan-website-jjdl9al9u-yossi-uzan.vercel.app

The owner approved one test email. The initial preview failed before sending
because of the Node import issue above. After correction, the preview form
showed success and reset its fields. Resend listed exactly one email, delivered
to uzan86@gmail.com at 18:35:23 Asia/Jerusalem (15:35:23 UTC), with subject
`פנייה חדשה מהאתר - Website contact form delivery test`.
Provider email ID: `01a16e8d-6831-744c-9414-e80c655688d4`.
This confirms recipient-server delivery, not inbox placement or reading.

The Resend plugin recovered and supplied this delivery confirmation. It also
confirmed no verified custom domains. Vercel's connector could not create the
approved share link; verification used the existing authenticated browser session.
No share link was created and no production deployment was promoted.