import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EduMatch AI – Find Your Best-Fit AI Program",
  description:
    "EduMatch AI uses artificial intelligence to match students with their ideal educational path. Discover your perfect AI program today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Material Symbols */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
