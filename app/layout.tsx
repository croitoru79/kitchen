import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import Link from "next/link";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-number-input/style.css";
import Script from "next/script";
import { GoogleTagManager } from '@next/third-parties/google';
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bucatariicroitoru.md"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro
    "
    >
      <head>
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
      </head>
      <body>

        <Header />
        {children}
        <Analytics />
        <Footer />
        <ToastContainer />
        <GoogleTagManager gtmId="GTM-N86LVST" />
        
      </body>
    </html>
  );
}
