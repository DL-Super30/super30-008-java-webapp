'use client'
import Image from "next/image";
import Link from "next/link";
import Signup from "./signup/page";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCalendarDays, faEarthAmerica, faUser } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  const [showsignup, setShowSignup] = useState(false);
  return (
    <div>
      <nav className="w-full border-2 border-[#EAEAEA]		mt-[5px] bg-[#F8F8F8] h-16">
        <div className="justify-between flex	 ">
          <img src="https://www.skillcapital.ai/images/logo.png" className="ml-36 w-[250px] h-[40px]  mt-[9px] "></img>
          <div className=" mr-36 ">
            <Link href={'/login'}><button className="w-[100px] h-[40px] border-gray-200 rounded-md  border-2 text-slate-400 hover:bg-red-500 m-1.5 hover:text-white">Login</button></Link>
            <button className="w-[100px] h-[40px] border-red-500 rounded-md bg-red-500 border-2 hover:bg-white m-1.5 text-white hover:text-red-500" onClick={() =>setShowSignup(true)}>Signup</button>
          </div>
        </div>
      </nav>

      <p className="text-center text-[28px] mt-[60px]">India's #1 Training Institute</p>
      <h1 className="text-center text-[100px] font-black		">Get Skilled to Reach<br></br>Your Goal</h1>
      <p className="text-center text-[20px]">Skill Capital is a Classroom & Online Learning Platform that helps students <br></br>gain the skills they need to reach their goals</p>
      <div className="mt-10 text-center">
        <button className="w-[200px] h-[40px] border-red-500 rounded-md  bg-red-500 border-2 text-white hover:bg-white m-1.5 hover:text-red-500" onClick={() => setShowSignup(true)}><FontAwesomeIcon icon={faUser} />Talk to Skill Advisor</button>
        <button className="w-[200px] h-[40px] border-red-500 rounded-md bg-white border-2 hover:bg-red-500 m-1.5 text-red-500 hover:text-white" onClick={() => setShowSignup(true)}><FontAwesomeIcon icon={faEarthAmerica} />Book Your Free Demo</button>
      </div>
      {showsignup && <Signup setShowSignup={setShowSignup} />}

    </div>
  );

}

