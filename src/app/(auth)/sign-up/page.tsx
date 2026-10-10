import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SignUpForm } from "@/components/shadcn/blocks/sign-up-form";
import { getUser } from "@/library/auth/session";

export const metadata: Metadata = { title: "Sign up" };

// Reads the session cookie, so this route must render per request.
export const dynamic = "force-dynamic";

export default async function Page(): Promise<React.JSX.Element> {
	if (await getUser()) {
		redirect("/home");
	}

	return (
		<main className="flex grow items-center justify-center p-4">
			<SignUpForm />
		</main>
	);
}
