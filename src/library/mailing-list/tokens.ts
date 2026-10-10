import { createHmac, timingSafeEqual } from "node:crypto";

export type TokenPurpose = "confirm" | "unsubscribe";

type Payload = {
	sub: string;
	purpose: TokenPurpose;
	iat: number;
	exp?: number;
};

export type VerifiedToken = { subscriberId: string; issuedAt: Date };

export const CONFIRM_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function sign(data: string, secret: string): string {
	return createHmac("sha256", secret).update(data).digest("base64url");
}

/** Confirmation tokens expire after 7 days; unsubscribe tokens never do. */
export function createToken(
	subscriberId: string,
	purpose: TokenPurpose,
	secret: string,
	now = Date.now(),
): string {
	const payload: Payload = { sub: subscriberId, purpose, iat: now };
	if (purpose === "confirm") payload.exp = now + CONFIRM_TTL_MS;
	const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
	return `${data}.${sign(data, secret)}`;
}

export function verifyToken(
	token: string,
	purpose: TokenPurpose,
	secret: string,
	now = Date.now(),
): VerifiedToken | null {
	const [data, signature, extra] = token.split(".");
	if (!data || !signature || extra !== undefined) return null;

	const expected = Buffer.from(sign(data, secret));
	const actual = Buffer.from(signature);
	if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
		return null;
	}

	try {
		const payload = JSON.parse(
			Buffer.from(data, "base64url").toString(),
		) as Payload;
		if (payload.purpose !== purpose || typeof payload.sub !== "string") {
			return null;
		}
		if (payload.exp !== undefined && payload.exp < now) return null;
		return { subscriberId: payload.sub, issuedAt: new Date(payload.iat) };
	} catch {
		return null;
	}
}
