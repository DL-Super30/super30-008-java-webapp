'use client'
import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCalendarDays, faUser } from '@fortawesome/free-solid-svg-icons'
import { faMeta } from "@fortawesome/free-brands-svg-icons"
import Link from "next/link"


export default function Navbar() {
    return (
        <div>
            <nav className="w-full border-2 border-[#EAEAEA] mt-[5px] bg-[#F8F8F8] h-16 flex items-center justify-between">
                <div>
                    <Link href={"/dashboard"}><img src="https://www.skillcapital.ai/images/logo.png" className="ml-36 w-[250px] h-[40px]  mt-[9px] "></img></Link>
                </div>
                <div className="flex gap-x-8">
                <Link href={"/dashboard"}><button>Home</button></Link>
                <Link href={"/leads"}><button>Leads</button></Link>
                <Link href={"/opportunities"}><button>Opportunities</button></Link>
                <Link href={"/learners"}><button>Learners</button></Link>
                <Link href={"/courses"}><button>Courses</button></Link>
                </div>
                <div className="flex gap-x-5 text-xl">
                    <button><FontAwesomeIcon icon={faCalendarDays} /></button>
                    <button><FontAwesomeIcon icon={faMeta} /></button>
                    <button><FontAwesomeIcon icon={faBell} /></button>
                    <button><FontAwesomeIcon icon={faUser} /></button>

                </div>
            </nav>
        </div>
    )
}