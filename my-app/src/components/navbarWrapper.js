'use client'

import React from "react"
import Navbar from "./navbar"
import { usePathname } from "next/navigation"

export default function NavbarWrapper() {

    const pathName = usePathname();
    if (pathName == '/' || pathName == '/login'){
        return null
    }
    return (
        <Navbar/>
    )
}