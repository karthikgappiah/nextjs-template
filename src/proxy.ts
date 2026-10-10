import { auth } from "@/library/auth/server";

export default auth.middleware({ loginUrl: "/sign-in" });

export const config = {
	matcher: ["/home/:path*"],
};
