# Double opt-in mailing list on Resend, with Upstash rate limiting

Subscribing sends a confirmation email through Resend, and only a Confirmed Subscriber is on the mailing list. Single opt-in was considered and rejected: it signs up more people, but anyone can enter a stranger's address, typos and dead addresses bounce, and bounces and complaints damage the sending domain and can get the Resend account suspended. Every email carries an unsubscribe link and RFC 8058 `List-Unsubscribe` / `List-Unsubscribe-Post` headers, which Gmail and Yahoo require for bulk senders. Bulk sending to the list is out of scope for now.

Confirmation and unsubscribe links are stateless HMAC-signed tokens (`MAILING_LIST_SECRET`), not rows in a token table. Confirmation links expire after 7 days; unsubscribe links never expire. A confirmation link issued before an unsubscribe is rejected, so an old email cannot re-subscribe someone.

Upstash Redis (`@upstash/ratelimit`, sliding window) limits the subscribe, sign-in, and sign-up Server Actions by client IP, plus a per-address limit on confirmation emails. It runs in the app because those actions call Neon Auth from the server, so any limit Neon applies sees the server's IP rather than the visitor's, and Neon documents no attempt limits.

## Consequences

- Rotating `MAILING_LIST_SECRET` invalidates every confirmation and unsubscribe link already sent.
- Resend, Upstash, `MAILING_LIST_SECRET`, `MAILING_LIST_FROM`, and `APP_URL` are optional in development and CI (emails are logged, limits skipped) and fail loudly in production when missing.
- Neon Auth's own emails (verification, password reset) do not go through the app. Neon requires custom SMTP for production, so point it at Resend's SMTP (`smtp.resend.com`) in the console under **Settings → Better Auth**, or with `neon neon-auth config email-provider update`. This is manual setup, not code.
- The client IP comes from `x-forwarded-for`, which is only trustworthy behind a host proxy that sets it.
- Unconfirmed Subscribers stay in the table with no cleanup job; rate limiting caps how many accumulate.
