"use server";

import { db } from "@/library/db";
import { subscribers } from "@/library/db/schema";

export type SubscribeFormState = {
	error?: string;
	email?: string;
	subscribed?: boolean;
};

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

	try {
		// Duplicates are ignored so the response never reveals who is subscribed.
		await db.insert(subscribers).values({ email }).onConflictDoNothing();
	} catch {
		return { error: "Unable to subscribe. Please try again.", email };
	}

	return { subscribed: true };
}
