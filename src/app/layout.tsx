import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Image from "next/image";
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
            style={{ backgroundAttachment: "fixed" }}
          >
            {/* Use Image component */}
            <Image
              src={"/hotel-bg.webp"}
              alt="Hotel Background"
              layout="fill" // Makes the image cover the entire container
              objectFit="cover" // Ensures the image covers the container
              quality={10} // Sets image quality (optional)
              className="absolute inset-0" // Ensures proper positioning
              style={{ zIndex: -1 }}
              blurDataURL={`${process.env.API_BASE_URL}/_next/image?url=%2Fhotel-bg.webp&w=1&q=1`}
              placeholder={"blur"}
            />
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
