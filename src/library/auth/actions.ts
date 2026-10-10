"use server";

import { redirect } from "next/navigation";
import { auth } from "@/library/auth/server";
import { allow, clientIp } from "@/library/rate-limit";

export type AuthFormState = {
	error?: string;
	email?: string;
};

const TOO_MANY = "Too many attempts. Please try again later.";

function field(formData: FormData, name: string): string {
	const value = formData.get(name);
	return typeof value === "string" ? value.trim() : "";
}

export async function signIn(
	_previous: AuthFormState,
	formData: FormData,
): Promise<AuthFormState> {
	const email = field(formData, "email");
	const password = String(formData.get("password") ?? "");

	if (!email || !password) {
		return { error: "Enter your email and password.", email };
	}
	if (!(await allow("sign-in", await clientIp()))) {
		return { error: TOO_MANY, email };
	}

	try {
		const { error } = await auth.signIn.email({ email, password });
		if (error) {
			return { error: error.message ?? "Unable to sign in.", email };
		}
	} catch {
		return { error: "Unable to sign in. Please try again.", email };
	}

	redirect("/home");
}

export async function signUp(
	_previous: AuthFormState,
	formData: FormData,
): Promise<AuthFormState> {
	const name = field(formData, "name");
	const email = field(formData, "email");
	const password = String(formData.get("password") ?? "");

	if (!name || !email || !password) {
		return { error: "Fill in your name, email, and password.", email };
	}
	if (password.length < 8) {
		return { error: "Password must be at least 8 characters.", email };
	}
	if (!(await allow("sign-up", await clientIp()))) {
		return { error: TOO_MANY, email };
	}

	try {
		const { error } = await auth.signUp.email({ name, email, password });
		if (error) {
			return {
				error: error.message ?? "Unable to create your account.",
				email,
			};
		}
	} catch {
		return {
			error: "Unable to create your account. Please try again.",
			email,
		};
	}

	redirect("/home");
}

export async function signOut(): Promise<void> {
	await auth.signOut();
	redirect("/");
}
