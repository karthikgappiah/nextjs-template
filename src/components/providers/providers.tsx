"use client";

import type * as React from "react";
import { ThemeProvider } from "@/components/providers/theme-provider";

export function Providers({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			{children}
		</ThemeProvider>
	);
}
