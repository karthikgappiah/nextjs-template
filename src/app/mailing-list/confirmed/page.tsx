import { LinkButton } from "@/components/shadcn/ui/button";

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ status?: string }>;
}): Promise<React.JSX.Element> {
	const { status } = await searchParams;
	const invalid = status === "invalid";

	return (
		<main className="flex grow flex-col items-center justify-center gap-4 p-4 text-center">
			<h1 className="font-medium text-lg">
				{invalid ? "This link is invalid or expired" : "You're subscribed"}
			</h1>
			<p className="text-muted-foreground text-sm">
				{invalid
					? "Subscribe again to get a fresh confirmation email."
					: "Thanks for confirming your email address."}
			</p>
			<LinkButton href="/" variant="outline">
				Back home
			</LinkButton>
		</main>
	);
}
