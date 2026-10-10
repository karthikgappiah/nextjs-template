"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/shadcn/ui/button";
import { signOut } from "@/library/auth/actions";

function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" variant="outline" isDisabled={pending}>
			{pending ? "Signing out…" : "Sign out"}
		</Button>
	);
}

export function SignOutButton() {
	return (
		<form action={signOut}>
			<SubmitButton />
		</form>
	);
}
