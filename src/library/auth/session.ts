import { cache } from "react";
import { auth } from "@/library/auth/server";

/**
 * Per-request deduplicated session lookup (Data Access Layer).
 * Returns the signed-in user, or `null` when there is no valid session.
 */
export const getUser = cache(async () => {
	const { data: session } = await auth.getSession();
	return session?.user ?? null;
});
