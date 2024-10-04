'use client'
import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCalendarDays, faUser } from '@fortawesome/free-solid-svg-icons';
import { faMeta } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { usePathname} from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Navbar() {
 
  const router = useRouter();
  const pathname = usePathname();
  const [showLogout , setShowLogout] = useState(false)
  
  const handleLogout = () =>{
    router.replace('/')
  }

  return (
    <div>
      <nav className="w-full bg-[#DBB5B5] bg-opacity-70 h-[65px] flex items-center justify-between">
        <div>
          <Link href={'/dashboard'}><img className="ml-36 w-[300px] h-[45px] pt-2 m-1" src="https://crm.skillcapital.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fskillcapital.41121682.png&w=1920&q=75"></img></Link>
        </div>
        <div className="flex gap-x-8">
          <Link href={'/dashboard'}><button className={`${pathname == '/dashboard' ? 'border-b-4 border-b-black' : ''} `}>Home</button></Link>
          <Link href={'/Leads'}><button className={`${pathname == '/Leads' ? 'border-b-4 border-b-black' : ''}`}>Leads</button></Link>
         <Link href={'/opportunities'}><button  className={`${pathname == '/opportunities' ? 'border-b-4 border-b-black' : ''}`}>Opportunities</button></Link>
          <Link href={'/learners'}><button className={`${pathname == '/learners' ? 'border-b-4 border-b-black' : ''}`}>Learners</button></Link>
          <Link href={'/courses'}><button className={`${pathname == '/courses' ? 'border-b-4 border-b-black' : ''}`}>Courses</button></Link>
        </div>
        <div className="flex gap-x-5 text-xl">
          <button><FontAwesomeIcon icon={faCalendarDays} /></button>
          <button><img src="https://crm.skillcapital.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FAILogo1.a2708f70.gif&w=640&q=75" className="w-10 h-10"></img></button>
          {/* <button><FontAwesomeIcon icon={faBell} /></button> */}
          <button className="mr-14" onClick={() => setShowLogout(!showLogout)}><FontAwesomeIcon icon={faUser} /></button>
        </div>
       {
         showLogout && (
          <div className="absolute top-10 right-0 w-24 mr-4 mt-2 text-center p-2 bg-white"> 
            <button onClick={handleLogout}>Logout</button>
        </div>
         )
       }
      </nav>
    </div>
  )
}