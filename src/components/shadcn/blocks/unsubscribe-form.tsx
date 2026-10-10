"use client";

import { useActionState } from "react";
import { Button } from "@/components/shadcn/ui/button";
import {
	type UnsubscribeFormState,
	unsubscribe,
} from "@/library/mailing-list/actions";

const initialState: UnsubscribeFormState = {};

export function UnsubscribeForm({ token }: { token: string }) {
	const [state, formAction, pending] = useActionState(
		unsubscribe,
		initialState,
	);

	if (state.done) {
		return (
			<p role="status" className="text-sm">
				You've been unsubscribed.
			</p>
		);
	}

	return (
		<form action={formAction} className="flex flex-col items-center gap-2">
			<input type="hidden" name="token" value={token} />
			<p className="text-muted-foreground text-sm">
				Stop receiving emails from the mailing list?
			</p>
			<Button type="submit" isDisabled={pending}>
				{pending ? "Unsubscribing…" : "Unsubscribe"}
			</Button>
			{state.error ? (
				<p role="alert" className="text-destructive text-sm">
					{state.error}
				</p>
			) : null}
		</form>
	);
}
