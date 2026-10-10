import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { headers } from "next/headers";

type Limit = { requests: number; window: `${number} ${"s" | "m" | "h" | "d"}` };

const LIMITS = {
	"subscribe-ip": { requests: 5, window: "10 m" },
	"subscribe-email": { requests: 3, window: "1 d" },
	"sign-in": { requests: 10, window: "10 m" },
	"sign-up": { requests: 5, window: "1 h" },
} satisfies Record<string, Limit>;

export type LimitName = keyof typeof LIMITS;

const configured = Boolean(
	process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
);
const limiters = new Map<LimitName, Ratelimit>();

function limiter(name: LimitName): Ratelimit {
	let instance = limiters.get(name);
	if (!instance) {
		const { requests, window } = LIMITS[name];
		instance = new Ratelimit({
			redis: Redis.fromEnv(),
			limiter: Ratelimit.slidingWindow(requests, window),
			prefix: `ratelimit:${name}`,
		});
		limiters.set(name, instance);
	}
	return instance;
}

/** Returns true when the request may proceed. */
export async function allow(name: LimitName, key: string): Promise<boolean> {
	if (!configured) {
		// Optional in development and CI, required in production.
		if (process.env.NODE_ENV === "production") {
			throw new Error("UPSTASH_REDIS_REST_URL and _TOKEN must be set.");
		}
		return true;
	}
	const { success } = await limiter(name).limit(key);
	return success;
}

/** The client IP as reported by the host's proxy. */
export async function clientIp(): Promise<string> {
	const list = await headers();
	const forwarded = list.get("x-forwarded-for")?.split(",")[0]?.trim();
	return forwarded || list.get("x-real-ip") || "unknown";
}
