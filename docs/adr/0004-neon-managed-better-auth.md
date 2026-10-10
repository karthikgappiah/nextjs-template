# Neon Managed Better Auth, with users in the `neon_auth` schema

Authentication uses Neon Auth (Managed Better Auth), chosen directly as the default for a Neon app with no existing identity provider. Users and sessions live in the `neon_auth` schema of the same database, so auth needs no extra service and its data expires with the ephemeral claimable project like everything else. No comparison with other providers was recorded.

`drizzle.config.ts` limits Drizzle to the `public` schema so migrations never touch `neon_auth`.

## Consequences

- Leaving Neon Auth means migrating users and sessions out of a schema Neon manages.
- `@neondatabase/auth` is pinned exactly to `0.5.0-beta`, unlike other dependencies. Keep the exact pin: a beta can break between releases. (Observed, not a separately recorded decision.)
