import { Inter } from "next/font/google";
import "./globals.css";
// import Navbar from "@/components/navbar";
import NavbarWrapper from "../components/navbarWrapper";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Skill Capital",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}> <NavbarWrapper />{children}</body>
    </html>
  );
}
