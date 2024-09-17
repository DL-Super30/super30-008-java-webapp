"use client";

import react from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronDown,faCalendarDays ,faUser, faBarsStaggered} from '@fortawesome/free-solid-svg-icons';
import {faBell } from '@fortawesome/free-regular-svg-icons';
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Navbar(){
    const pathName = usePathname();
    const getLinkClass = (path) =>{
        return pathName === path ? 'border-b-4 border-b-rose-600 bg-pink-200 rounded-t-md' : 'bg-white'
    }

    const [showMenuIcon , setShowMenuIcon ]  = useState(false);
    return (
        <div className="w-full h-16 border-b-2 flex items-center justify-between fixed z-10 bg-white"> 
                <h1 className="text-3xl mx-3 visible md:invisible"><FontAwesomeIcon icon={faBarsStaggered} onClick={e => setShowMenuIcon(true)}/></h1>

            <div className="items-center flex ">
                <Link href={'/dashboard'}><img className="ml-[-120px]" src="https://crm.skillcapital.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fskillcapital.41121682.png&w=1920&q=75" /></Link>
            </div>
                <div className="flex w-2/5 justify-evenly">
                <Link href={'/dashboard'}><button className={`hover:border-b-2 hover:border-b-[#E4244B] p-2 ${getLinkClass('/dashboard')}`}>Home </button></Link>
                <Link href={'/leads'}><button className={`hover:border-b-2 hover:border-b-[#E4244B] p-2 ${getLinkClass('/leads')}`}>Leads </button></Link>
                <Link href={'/oppurtunities'}> <button className={`hover:border-b-2 hover:border-[#E4244B] p-2 ${getLinkClass('/oppurtunities')} `}>Oppurtunities </button></Link>
                <Link href={'/learners'}><button className={`hover:border-b-2 hover:border-[#E4244B] p-2 ${getLinkClass('/learners')} `}>Learners </button></Link>
                <Link href={'/courses'}><button className={`hover:border-b-2 hover:border-[#E4244B] p-2 ${getLinkClass('/courses')} `}>Courses </button></Link>
                
            </div>
            
            <div className="flex items center w-36 justify-between mr-2">
                <Link href={'/calender'}><h1 className="text-2xl hover:cursor-pointer"><FontAwesomeIcon icon={faCalendarDays} /></h1></Link>
                <Link href={'/aipage'}><img src="https://crm.skillcapital.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FStars.684c7122.png&w=1920&q=75" className="w-8 hover:cursor-pointer"/></Link>
                <h1 className="text-2xl hover:cursor-pointer"><FontAwesomeIcon icon={faBell} /></h1>
                <h1 className="text-2xl hover:cursor-pointer"><FontAwesomeIcon icon={faUser} /></h1>

            </div>
        </div>
    )
}