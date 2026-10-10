import type { NextRequest } from "next/server";
import { unsubscribeFromToken } from "@/library/mailing-list/subscriptions";

// RFC 8058 one-click unsubscribe: mail clients POST here from the List-Unsubscribe header.
export async function POST(request: NextRequest): Promise<Response> {
	const token = request.nextUrl.searchParams.get("token") ?? "";
	const ok = await unsubscribeFromToken(token);
	return new Response(null, { status: ok ? 200 : 400 });
}
