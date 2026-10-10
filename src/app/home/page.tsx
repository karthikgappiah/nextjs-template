import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ModeToggle } from "@/components/shadcn/blocks/mode-toggle";
import { SignOutButton } from "@/components/shadcn/blocks/sign-out-button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/shadcn/ui/card";
import { getUser } from "@/library/auth/session";

export const metadata: Metadata = { title: "Home" };

// Reads the session cookie, so this route must render per request.
export const dynamic = "force-dynamic";

export default async function Page(): Promise<React.JSX.Element> {
	const user = await getUser();
	if (!user) {
		redirect("/sign-in");
	}

	return (
		<main className="flex grow items-center justify-center p-4">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle role="heading" aria-level={1} className="break-words">
						Welcome, {user.name}
					</CardTitle>
					<CardDescription className="break-all">{user.email}</CardDescription>
				</CardHeader>
				<CardContent>You are signed in.</CardContent>
				<CardFooter className="justify-between">
					<SignOutButton />
					<ModeToggle />
				</CardFooter>
			</Card>
		</main>
	);
}
