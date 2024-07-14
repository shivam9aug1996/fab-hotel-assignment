import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
          <div
            className="relative min-h-screen flex items-center justify-center"
            style={{
              backgroundImage: 'url("/hotel-bg.webp")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          >
            <div
              className="absolute inset-0 bg-yellow-50"
              style={{ opacity: 0.4 }}
            ></div>
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
