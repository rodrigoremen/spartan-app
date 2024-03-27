import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './providers';
import { Theme } from '@radix-ui/themes';
import './globals.css';
import '@radix-ui/themes/styles.css';
import NavBar from '@/components/NavBar';
import ContextProvider from "@/context/GlobalContext";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'SpartanApp',
	description: 'Aplicación creada por @rodrigoremen',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ContextProvider>
					<Providers>
						<main className="text-foreground bg-background">
							<Theme>
								<NavBar />
								{children}
							</Theme>
						</main>
					</Providers>
				</ContextProvider>
			</body>
		</html>
	);
}
