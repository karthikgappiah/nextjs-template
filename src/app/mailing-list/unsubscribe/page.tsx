import { UnsubscribeForm } from "@/components/shadcn/blocks/unsubscribe-form";

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ token?: string }>;
}): Promise<React.JSX.Element> {
	const { token } = await searchParams;

	return (
		<main className="flex grow flex-col items-center justify-center gap-4 p-4 text-center">
			<h1 className="font-medium text-lg">Unsubscribe</h1>
			{/* A button rather than unsubscribing on load, so link scanners can't. */}
			<UnsubscribeForm token={token ?? ""} />
		</main>
	);
}
