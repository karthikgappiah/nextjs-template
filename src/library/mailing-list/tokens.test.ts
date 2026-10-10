import { describe, expect, it } from "vitest";
import { CONFIRM_TTL_MS, createToken, verifyToken } from "./tokens";

const SECRET = "test-secret";
const ID = "4f1c1f6e-0000-4000-8000-000000000000";

describe("mailing list tokens", () => {
	it("round-trips a confirmation token", () => {
		const token = createToken(ID, "confirm", SECRET, 1000);
		expect(verifyToken(token, "confirm", SECRET, 2000)).toEqual({
			subscriberId: ID,
			issuedAt: new Date(1000),
		});
	});

	it("expires confirmation tokens after 7 days", () => {
		const token = createToken(ID, "confirm", SECRET, 0);
		expect(
			verifyToken(token, "confirm", SECRET, CONFIRM_TTL_MS + 1),
		).toBeNull();
	});

	it("never expires unsubscribe tokens", () => {
		const token = createToken(ID, "unsubscribe", SECRET, 0);
		expect(
			verifyToken(token, "unsubscribe", SECRET, 10 * CONFIRM_TTL_MS),
		).not.toBeNull();
	});

	it("rejects a token used for the wrong purpose", () => {
		const token = createToken(ID, "unsubscribe", SECRET);
		expect(verifyToken(token, "confirm", SECRET)).toBeNull();
	});

	it("rejects a token signed with another secret or tampered with", () => {
		const token = createToken(ID, "confirm", SECRET);
		expect(verifyToken(token, "confirm", "other")).toBeNull();
		expect(verifyToken(`x${token}`, "confirm", SECRET)).toBeNull();
		expect(verifyToken("garbage", "confirm", SECRET)).toBeNull();
	});
});
