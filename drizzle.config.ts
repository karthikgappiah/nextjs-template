import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  schema: "./src/database/schema.ts",
  introspect: {
    casing: "preserve",
  },
  out: "./src/database/migrations",
  strict: true,
  verbose: true,
});
