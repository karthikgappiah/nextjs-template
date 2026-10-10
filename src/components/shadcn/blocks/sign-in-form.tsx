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
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/shadcn/ui/field";
import { Input } from "@/components/shadcn/ui/input";
import { type AuthFormState, signIn } from "@/library/auth/actions";

const initialState: AuthFormState = {};

export function SignInForm() {
	const [state, formAction, pending] = useActionState(signIn, initialState);

	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle role="heading" aria-level={1}>
					Sign in
				</CardTitle>
				<CardDescription>
					Enter your email and password to access your account.
				</CardDescription>
			</CardHeader>
			<form action={formAction}>
				<CardContent>
					<FieldGroup>
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
								autoComplete="current-password"
								aria-invalid={state.error ? true : undefined}
								required
							/>
						</Field>
						<FieldError>{state.error}</FieldError>
					</FieldGroup>
				</CardContent>
				<CardFooter className="flex-col gap-2">
					<Button type="submit" className="w-full" isDisabled={pending}>
						{pending ? "Signing in…" : "Sign in"}
					</Button>
					<LinkButton href="/sign-up" variant="link" className="w-full">
						Don’t have an account? Sign up
					</LinkButton>
				</CardFooter>
			</form>
		</Card>
	);
}
