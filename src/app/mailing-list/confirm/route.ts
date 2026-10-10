import type { NextRequest } from "next/server";
import { confirmFromToken } from "@/library/mailing-list/subscriptions";

export async function GET(request: NextRequest): Promise<Response> {
	const token = request.nextUrl.searchParams.get("token") ?? "";
	const ok = await confirmFromToken(token);
	const url = new URL("/mailing-list/confirmed", request.nextUrl);
	if (!ok) url.searchParams.set("status", "invalid");
	return Response.redirect(url, 303);
}
