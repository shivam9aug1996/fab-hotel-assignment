import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Background from "./components/Background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fab Hotels",
  description:
    "Frontend Assignment - Autosuggest. The basic idea is that we want to create a search bar which has the auto suggest functionality where in the search bar suggest options to the user as he types.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <Background>{children}</Background>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
