import type { Metadata, Viewport } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-pretendard",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ToonVault",
  description: "Read webtoons anytime — originals & canvas on ToonVault.",
  applicationName: "ToonVault",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "ToonVault",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#00d66f",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunitoSans.variable} h-full antialiased`}>
      <body>{children}</body>
    </html>
  );
}
