'use client'

import Image from "next/image";
import Link from "next/link";
import Signup from "./signup/page";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarthAsia, faUser } from '@fortawesome/free-solid-svg-icons';


export default function Home() {
  const [showSignUp, setShowSignUp] = useState(false);

  

  return (
    <div>
      <nav className="w-full bg-[#f8f8f8] h-[65px]  border-2 border-gray-100">
        <div className="flex  justify-between">
          <img className="ml-36 w-[300px] h-[45px] pt-2 m-1" src="https://www.skillcapital.ai/images/logo.png"></img>
          <div className="mr-36">
            <Link href={'/login'} ><button className="bg-white text-gray-600 border-2 border-gray-200 rounded-md w-[100px] h-[40px] hover:bg-red-500 m-2 hover:text-white">Login</button></Link>
            <button className="bg-red-500 text-white border-2 border-gray-200 rounded-md w-[100px] h-[40px] hover:bg-zinc-200 m-2 hover:text-red-500" onClick={ () => setShowSignUp(true)}>Signup</button>
          </div>
        </div>
      </nav>
      {/* navbar end */}

      <div>
        <p className="text-2xl text-center mt-16 text-black text-[#343433] font-semibold">India's #1 Training Institute</p>
        <h1 className="text-8xl text-center mt-5 font-black">Get Skilled to Reach <br></br>
          Your Goal</h1>
        <p className="text-[21px] text-center mt-5 font-medium text-[#555555]">Skill Capital is a Classroom & Online Learning Platform that helps students <br></br>
          gain the skills they need to reach their goals
        </p>
        <div className="text-center mt-16">
        <button className="bg-red-500 text-white border-2 border-red-200 rounded-md w-[250px] h-[40px] hover:bg-white m-2 hover:text-red-500 "  onClick={ () => setShowSignUp(true)}><FontAwesomeIcon icon={faUser} />Talk To Skill Adviser</button>
        <button className="bg-white text-red-500 border-2 border-red-200 rounded-md w-[250px] h-[40px] hover:bg-red-500 m-2 hover:text-white " onClick={ () => setShowSignUp(true)}> < FontAwesomeIcon icon={faEarthAsia}/>Book Your Free Demo</button>
        </div>
      </div>


      {showSignUp && <Signup setShowSignUp={setShowSignUp} /> }
      
      {/* first page */}
    </div>
  );
}
