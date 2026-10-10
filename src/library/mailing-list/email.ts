import { Resend } from "resend";
import { createToken } from "@/library/mailing-list/tokens";

const DEV_SECRET = "development-only-mailing-list-secret";

function required(name: string, fallback: string): string {
	const value = process.env[name];
	if (value) return value;
	// Optional in development and CI, required in production.
	if (process.env.NODE_ENV === "production") {
		throw new Error(`${name} must be set.`);
	}
	return fallback;
}

export function mailingListSecret(): string {
	return required("MAILING_LIST_SECRET", DEV_SECRET);
}

function appUrl(): string {
	return required("APP_URL", "http://localhost:3000").replace(/\/$/, "");
}

export function unsubscribeLinks(subscriberId: string) {
	const token = createToken(subscriberId, "unsubscribe", mailingListSecret());
	const query = `token=${encodeURIComponent(token)}`;
	return {
		// Visible link: a page that asks before unsubscribing.
		page: `${appUrl()}/mailing-list/unsubscribe?${query}`,
		// RFC 8058 one-click target, POSTed by the mail client.
		oneClick: `${appUrl()}/api/mailing-list/unsubscribe?${query}`,
	};
}

export async function sendConfirmation(
	email: string,
	subscriberId: string,
): Promise<void> {
	const token = createToken(subscriberId, "confirm", mailingListSecret());
	const confirmUrl = `${appUrl()}/mailing-list/confirm?token=${encodeURIComponent(token)}`;
	const unsubscribe = unsubscribeLinks(subscriberId);

	const subject = "Confirm your subscription";
	const text = `Confirm your subscription to the mailing list:\n${confirmUrl}\n\nThe link expires in 7 days. If you didn't ask for this, ignore this email.\n\nUnsubscribe: ${unsubscribe.page}`;
	const html = `<p>Confirm your subscription to the mailing list:</p><p><a href="${confirmUrl}">Confirm subscription</a></p><p>The link expires in 7 days. If you didn't ask for this, ignore this email.</p><p><a href="${unsubscribe.page}">Unsubscribe</a></p>`;

	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey) {
		required("RESEND_API_KEY", "");
		console.info(
			`[mailing-list] RESEND_API_KEY unset; would email ${email}:\n${text}`,
		);
		return;
	}

	const { error } = await new Resend(apiKey).emails.send({
		from: required("MAILING_LIST_FROM", ""),
		to: email,
		subject,
		text,
		html,
		headers: {
			"List-Unsubscribe": `<${unsubscribe.oneClick}>`,
			"List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
		},
	});
	if (error) throw new Error(error.message);
}
