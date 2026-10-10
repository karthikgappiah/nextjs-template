"use server";

import { sql } from "drizzle-orm";
import { db } from "@/library/db";
import { subscribers } from "@/library/db/schema";
import { sendConfirmation } from "@/library/mailing-list/email";
import { unsubscribeFromToken } from "@/library/mailing-list/subscriptions";
import { allow, clientIp } from "@/library/rate-limit";

export type SubscribeFormState = {
	error?: string;
	email?: string;
	subscribed?: boolean;
};

const TOO_MANY = "Too many attempts. Please try again later.";

// Pragmatic check: the browser validates `type="email"`, this guards direct posts.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribe(
	_previous: SubscribeFormState,
	formData: FormData,
): Promise<SubscribeFormState> {
	// Honeypot: real users never fill this hidden field. Pretend success to bots.
	if (formData.get("website")) {
		return { subscribed: true };
	}

	const value = formData.get("email");
	const email = typeof value === "string" ? value.trim().toLowerCase() : "";

	if (!EMAIL_PATTERN.test(email) || email.length > 254) {
		return { error: "Enter a valid email address.", email };
	}

	if (!(await allow("subscribe-ip", await clientIp()))) {
		return { error: TOO_MANY, email };
	}

	try {
		const [row] = await db
			.insert(subscribers)
			.values({ email })
			// No-op update so the existing row comes back from `returning`.
			.onConflictDoUpdate({
				target: subscribers.email,
				set: { email: sql`excluded.email` },
			})
			.returning();

		const confirmed = row.confirmedAt && !row.unsubscribedAt;
		// The per-email limit fails silently so it reveals nothing either.
		if (!confirmed && (await allow("subscribe-email", email))) {
			await sendConfirmation(email, row.id);
		}
	} catch (error) {
		console.error("[mailing-list] subscribe failed", error);
		return { error: "Unable to subscribe. Please try again.", email };
	}

	// Same response whether the address was new, pending, or confirmed.
	return { subscribed: true };
}

export type UnsubscribeFormState = { done?: boolean; error?: string };

export async function unsubscribe(
	_previous: UnsubscribeFormState,
	formData: FormData,
): Promise<UnsubscribeFormState> {
	const token = formData.get("token");
	if (typeof token !== "string" || !(await unsubscribeFromToken(token))) {
		return { error: "This unsubscribe link is invalid." };
	}
	return { done: true };
}
