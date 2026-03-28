import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chiranoura Blog",
  description: "Blog by iray_tno",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="mx-auto flex max-w-3xl items-center gap-6 px-6 py-4">
            <Link
              href="/"
              className="font-semibold text-zinc-900 dark:text-zinc-100"
            >
              Chiranoura
            </Link>
            <Link
              href="/categories"
              className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Categories
            </Link>
            <Link
              href="/tags"
              className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Tags
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
