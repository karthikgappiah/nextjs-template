"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { Button } from "@/components/shadcn/ui/button";
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";

export function ModeToggle() {
	const { setTheme } = useTheme();

	return (
		<DropdownMenuTrigger>
			<Button variant="outline" size="icon">
				<SunIcon className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
				<MoonIcon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
				<span className="sr-only">Toggle theme</span>
			</Button>
			<DropdownMenu placement="bottom end">
				<DropdownMenuItem onAction={() => setTheme("light")}>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onAction={() => setTheme("dark")}>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem onAction={() => setTheme("system")}>
					System
				</DropdownMenuItem>
			</DropdownMenu>
		</DropdownMenuTrigger>
	);
}
