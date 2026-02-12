import type { Metadata } from "next";
import { Special_Elite } from "next/font/google"; // Import the font
import "./globals.css";

const typewriter = Special_Elite({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-typewriter' // We create a variable to use in Tailwind
});

export const metadata: Metadata = {
  title: "Our Story",
  description: "A text adventure for us.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${typewriter.variable} font-typewriter bg-stone-900 text-stone-200`}>
        {children}
      </body>
    </html>
  );
}