"use client";

import { useActionState } from "react";
import { Button, LinkButton } from "@/components/shadcn/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/shadcn/ui/card";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/shadcn/ui/field";
import { Input } from "@/components/shadcn/ui/input";
import { type AuthFormState, signUp } from "@/library/auth/actions";

const initialState: AuthFormState = {};

export function SignUpForm() {
	const [state, formAction, pending] = useActionState(signUp, initialState);

	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle role="heading" aria-level={1}>
					Create an account
				</CardTitle>
				<CardDescription>
					Enter your details below to get started.
				</CardDescription>
			</CardHeader>
			<form action={formAction}>
				<CardContent>
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor="name">Name</FieldLabel>
							<Input
								id="name"
								name="name"
								autoComplete="name"
								placeholder="Ada Lovelace"
								required
							/>
						</Field>
						<Field>
							<FieldLabel htmlFor="email">Email</FieldLabel>
							<Input
								id="email"
								name="email"
								type="email"
								spellCheck={false}
								autoComplete="email"
								placeholder="you@example.com"
								defaultValue={state.email}
								aria-invalid={state.error ? true : undefined}
								required
							/>
						</Field>
						<Field>
							<FieldLabel htmlFor="password">Password</FieldLabel>
							<Input
								id="password"
								name="password"
								type="password"
								autoComplete="new-password"
								minLength={8}
								aria-invalid={state.error ? true : undefined}
								required
							/>
							<FieldDescription>At least 8 characters.</FieldDescription>
						</Field>
						<FieldError>{state.error}</FieldError>
					</FieldGroup>
				</CardContent>
				<CardFooter className="flex-col gap-2">
					<Button type="submit" className="w-full" isDisabled={pending}>
						{pending ? "Creating account…" : "Create account"}
					</Button>
					<LinkButton href="/sign-in" variant="link" className="w-full">
						Already have an account? Sign in
					</LinkButton>
				</CardFooter>
			</form>
		</Card>
	);
}
