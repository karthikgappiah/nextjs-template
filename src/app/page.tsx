import { ModeToggle } from "@/components/shadcn/blocks/mode-toggle";

export default function Page(): React.JSX.Element {
	return (
		<main className="flex grow items-center justify-center gap-4">
			<h1>Next.js</h1>
			<ModeToggle />
		</main>
	);
}
