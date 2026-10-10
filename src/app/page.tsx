import { ModeToggle } from "@/components/shadcn/blocks/mode-toggle";
import { SubscribeForm } from "@/components/shadcn/blocks/subscribe-form";
import { LinkButton } from "@/components/shadcn/ui/button";

export default function Page(): React.JSX.Element {
	return (
		<main className="flex grow flex-col items-center justify-center gap-4 p-4">
			<h1 className="sr-only">Next.js template</h1>
			<div className="flex flex-wrap items-center justify-center gap-2">
				<LinkButton href="/sign-in" variant="outline">
					Sign in
				</LinkButton>
				<LinkButton href="/sign-up">Sign up</LinkButton>
				<ModeToggle />
			</div>
			<SubscribeForm />
		</main>
	);
}
