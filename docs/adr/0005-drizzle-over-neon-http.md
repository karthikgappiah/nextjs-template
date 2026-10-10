# Drizzle over the Neon HTTP driver, with committed SQL migrations

The app talks to Postgres through Drizzle on `drizzle-orm/neon-http` using the pooled `DATABASE_URL`. Migrations run over the direct `DATABASE_URL_UNPOOLED`. Schema changes are generated as SQL with `drizzle-kit generate`, committed under `drizzle/`, and applied with `drizzle-kit migrate` rather than `push`, so every change is reviewable.

## Consequences

- The HTTP driver cannot run interactive transactions. Single statements are fine; a multi-step write that must be atomic needs the WebSocket `Pool` driver from `@neondatabase/serverless`.
