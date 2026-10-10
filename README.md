# nextjs-template

## Database

This template uses [Neon](https://neon.com) Postgres through the
[`@neondatabase/serverless`](https://neon.com/docs/serverless/serverless-driver) driver.

### Create a database

Install the Neon CLI, then create a claimable (no-account) project and write its credentials to
`.env.local`:

```bash
npm i -g neon@latest
neon claim create --env-pull
```

Claimable projects are ephemeral: they expire **72 hours** after creation and are limited to 100 MB of storage.
`.env.local` is gitignored; see `.env.example` for the variables.

### Keep it

Claim the project into your Neon account before it expires:

```bash
neon claim accept --no-open
```

Open the printed URL and accept the transfer. Claiming rotates `DATABASE_URL`, so afterwards sign in with
`neon auth`, run `neon link`, and pull the new credentials with `neon env pull`.

### Connections

| Variable                | Use                              |
| ----------------------- | -------------------------------- |
| `DATABASE_URL`          | Pooled; app runtime              |
| `DATABASE_URL_UNPOOLED` | Direct; migrations and admin SQL |

## Auth

Authentication uses [Neon Auth](https://neon.com/docs/auth/overview) (Managed Better Auth). Users and sessions live in the `neon_auth` schema of the same database.

- `neon.ts` declares `auth: true`. Run `neon deploy` to enable it on the branch and write `NEON_AUTH_BASE_URL` to `.env.local`.
- Set `NEON_AUTH_COOKIE_SECRET` (32+ characters, `openssl rand -base64 32`).
- `src/library/auth/server.ts` is the server instance, `src/library/auth/client.ts` the browser client, and `src/app/api/auth/[...path]/route.ts` proxies auth requests.
- Before deploying, register your origin: `neon neon-auth domain add https://your-app.example.com`. Localhost is pre-approved.
- Routes: `/` is public, `/sign-in` and `/sign-up` are the auth pages, and `/home` is protected. `src/proxy.ts` redirects unauthenticated requests for `/home/:path*` to `/sign-in`; add new protected paths to its `matcher`. Pages still check `auth.getSession()` themselves, so don't rely on the proxy alone.
- The forms (`sign-in-form.tsx`, `sign-up-form.tsx`, `sign-out-button.tsx`) live in `src/components/shadcn/blocks/`, built from shadcn/ui `Card`, `Field`, `Input`, and `Button`. They submit through Server Actions in `src/library/auth/actions.ts` using `useActionState`, so they work without client-side JavaScript.
- `src/library/auth/session.ts` exports `getUser()`, a `React.cache`-deduplicated session lookup for Server Components and actions.
