import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
	title: "Project III",
	description: "IKZ - Lukáš Pavienský",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="font-sans bg-main min-w-screen min-h-screen">
				{children}
				<Toaster />
			</body>
		</html>
	);
}
