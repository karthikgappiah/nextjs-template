import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/library/db/schema";

export const db = drizzle(neon(process.env.DATABASE_URL as string), {
	schema,
	casing: "snake_case",
});
