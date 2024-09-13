// src/app/layout.js

import { Inter } from "next/font/google";
import "./globals.css"; // Adjust path if necessary
import NavbarWrapper from "../context/navbarwrapper";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    
      <html lang="en">
        <body className={inter.className}>
          <NavbarWrapper/>
          {children}
        </body>
      </html>
    
  );
}
