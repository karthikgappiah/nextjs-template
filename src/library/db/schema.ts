import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const subscribers = pgTable("subscribers", {
	id: uuid().primaryKey().defaultRandom(),
	email: text().notNull().unique(),
	createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
	// Null until the confirmation link is followed (double opt-in).
	confirmedAt: timestamp({ withTimezone: true }),
	unsubscribedAt: timestamp({ withTimezone: true }),
});
