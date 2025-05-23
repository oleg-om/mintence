import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import styles from "./layout.module.scss";
import { GoogleTagManager } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME,
  icons: ["/favicon/favicon.ico"],
};

async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const { NEXT_PUBLIC_GTM_ID } = process.env;
  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        <NextIntlClientProvider>
          <div className={styles.layout}>{children}</div>
        </NextIntlClientProvider>
        {NEXT_PUBLIC_GTM_ID && <GoogleTagManager gtmId={NEXT_PUBLIC_GTM_ID} />}
      </body>
    </html>
  );
}

export default RootLayout;
