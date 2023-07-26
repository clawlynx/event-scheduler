import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Event Scheduler",
  description: "Created by Shafi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.syncfusion.com/ej2/material.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
