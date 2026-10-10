import { ModeToggle } from "@/components/shadcn/blocks/mode-toggle";

export default function Page() {
	return (
		<main className="flex grow items-center justify-center">
			<h1>
				<ModeToggle />
			</h1>
		</main>
	);
}
