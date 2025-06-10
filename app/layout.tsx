import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
//import Navbar from "@/components/Navbar";
//import { Providers } from "./providers";
//import Navbar from "../../components/Navbar";
import { Providers } from "./providers";
import Navbar from "@app/components/Navbar";
//import Navbar from "@/src/components/Navbar";
//import Navbar from "@/components/Navbar";
//port Navbar from "@/components/Navbar"

//port { Providers } from "./providers";
import EmergencyWidget from "./components/EmergencyWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SafeReport - Anonymous Crime Reporting",
  description: "Securely and anonymously report crimes to law enforcement",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-white dark:bg-neutral-900 dark:text-white transition-colors duration-300"}>
        <Providers>
          <Navbar />
          <EmergencyWidget />
          <main className="pt-16">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}