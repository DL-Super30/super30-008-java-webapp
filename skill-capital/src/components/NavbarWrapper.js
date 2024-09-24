"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
    const pathName = usePathname();
    if (pathName === '/') return ;

    return <Navbar />;
}