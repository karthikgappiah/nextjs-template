import "server-only";
import { and, eq, isNull, lt, or } from "drizzle-orm";
import { db } from "@/library/db";
import { subscribers } from "@/library/db/schema";
import { mailingListSecret } from "@/library/mailing-list/email";
import { verifyToken } from "@/library/mailing-list/tokens";

/** Confirms a Subscriber from a confirmation link. Returns false if the link is invalid. */
export async function confirmFromToken(token: string): Promise<boolean> {
	const verified = verifyToken(token, "confirm", mailingListSecret());
	if (!verified) return false;

	// A link issued before an unsubscribe must not re-subscribe the address.
	const rows = await db
		.update(subscribers)
		.set({ confirmedAt: new Date(), unsubscribedAt: null })
		.where(
			and(
				eq(subscribers.id, verified.subscriberId),
				or(
					isNull(subscribers.unsubscribedAt),
					lt(subscribers.unsubscribedAt, verified.issuedAt),
				),
			),
		)
		.returning({ id: subscribers.id });
	return rows.length > 0;
}

/** Unsubscribes from an unsubscribe link. Returns false if the link is invalid. */
export async function unsubscribeFromToken(token: string): Promise<boolean> {
	const verified = verifyToken(token, "unsubscribe", mailingListSecret());
	if (!verified) return false;

	await db
		.update(subscribers)
		.set({ unsubscribedAt: new Date() })
		.where(
			and(
				eq(subscribers.id, verified.subscriberId),
				isNull(subscribers.unsubscribedAt),
			),
		);
	return true;
}
