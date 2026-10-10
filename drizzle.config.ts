import { defineConfig } from "drizzle-kit";

try {
	process.loadEnvFile(".env.local");
} catch {
	// Variables may come from the environment instead (CI, deploys).
}

export default defineConfig({
	dialect: "postgresql",
	casing: "snake_case",
	schema: "./src/library/db/schema.ts",
	out: "./drizzle",
	// Never touch `neon_auth`, which Neon Auth manages.
	schemaFilter: ["public"],
	// Migrations need the direct (non-pooled) connection.
	dbCredentials: { url: process.env.DATABASE_URL_UNPOOLED as string },
});
