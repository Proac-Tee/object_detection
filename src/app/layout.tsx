import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./context/AuthContext";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Detection App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <AuthProvider>
          <Header />
          <Toaster position="top-center" />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
