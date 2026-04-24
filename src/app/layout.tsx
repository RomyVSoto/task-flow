import "~/styles/globals.css";

import { type Metadata } from "next";
import { Inter, Rubik } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { cn } from "~/lib/utils";
import Providers from "~/components/Providers";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "TaskFlow",
  description: "TaskFlow - Organize your work. Ship faster.",
};

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable, rubik.variable)}>
      <body>
        <TRPCReactProvider>
          <Providers>{children}</Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
