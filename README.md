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
