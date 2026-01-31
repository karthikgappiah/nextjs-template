import { loadEnvFile } from "node:process";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

loadEnvFile(".env");
const sql = neon(process.env.DATABASE_URL as string);
const db = drizzle({ client: sql });

export default db;
