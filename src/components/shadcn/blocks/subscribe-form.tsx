"use client";

import { useActionState } from "react";
import { Button } from "@/components/shadcn/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/shadcn/ui/field";
import { Input } from "@/components/shadcn/ui/input";
import {
	type SubscribeFormState,
	subscribe,
} from "@/library/mailing-list/actions";

const initialState: SubscribeFormState = {};

export function SubscribeForm() {
	const [state, formAction, pending] = useActionState(subscribe, initialState);

	if (state.subscribed) {
		return (
			<p role="status" className="text-center text-sm">
				Thanks for subscribing!
			</p>
		);
	}

	return (
		<form action={formAction} className="w-full max-w-sm">
			<Field>
				<FieldLabel htmlFor="subscribe-email">Join the mailing list</FieldLabel>
				<div className="flex gap-2">
					<Input
						id="subscribe-email"
						name="email"
						type="email"
						spellCheck={false}
						autoComplete="email"
						placeholder="you@example.com"
						defaultValue={state.email}
						aria-invalid={state.error ? true : undefined}
						required
					/>
					<Button type="submit" isDisabled={pending}>
						{pending ? "Subscribing…" : "Subscribe"}
					</Button>
				</div>
				{/* Honeypot: hidden from users and assistive tech, filled by bots. */}
				<div aria-hidden="true" className="absolute -left-[9999px]">
					<label htmlFor="subscribe-website">Website</label>
					<input
						id="subscribe-website"
						name="website"
						type="text"
						tabIndex={-1}
						autoComplete="off"
					/>
				</div>
				<FieldError>{state.error}</FieldError>
				<FieldDescription>No spam.</FieldDescription>
			</Field>
		</form>
	);
}
