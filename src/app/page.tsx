import { Button } from "@/components/shadcn/ui/button";

export default function Page(): React.JSX.Element {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center gap-6">
			<h1>Hello, Next.js!</h1>
			<Button>Get started</Button>
		</main>
	);
}
