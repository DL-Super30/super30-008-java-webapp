'use client'

import React from "react"
import Navbar from "@/components/navbar";

export default function Pracrice(){

    const data = true;
    const reponse = true;

    const result = data && !reponse ? console.log("verified") : console.log("not verified !!")

    return (
        <div>
            <Navbar/>
        </div>
    )
}