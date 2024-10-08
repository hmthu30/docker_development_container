import "../../src/assets/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Super App",
  description: "Description",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
