"use client";

import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";
import { RouterProvider } from "react-aria-components";

export function Providers({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const router = useRouter();

	return (
		<RouterProvider navigate={router.push}>
			<NextThemesProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				{children}
			</NextThemesProvider>
		</RouterProvider>
	);
}
