// Unused by default: every flow goes through Server Actions. Kept for client-side flows such as OAuth or useSession.
import { createAuthClient } from "@neondatabase/auth/next";

export const authClient = createAuthClient();
