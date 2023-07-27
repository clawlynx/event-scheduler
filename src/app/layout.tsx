import "./globals.css";

import type { Metadata } from "next";

import { Navbar } from "./components/Navbar";

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
        {/* cdn link for the css of the scheduler library used */}
        <link
          href="https://cdn.syncfusion.com/ej2/material.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
