import { createContactHandler } from "./handler.ts";

Deno.serve(createContactHandler(
  Deno.env.get("RESEND_API_KEY"),
  fetch,
  Deno.env.get("CONTACT_FROM_EMAIL"),
));
