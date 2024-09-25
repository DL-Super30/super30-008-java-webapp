'use client'

import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';


export default function Signup(props){

    const {setShowSignUp} = props;

    return(
        <div className="w-full h-[100vh] bg-black bg-opacity-75 pt-[100px] absolute top-0">


                <div className=" w-[370px] h-[400px] m-auto border-gray-200 rounded-b-md bg-white opacity-100">
                <div className="w-full h-[60px] bg-[#e4244b] flex items-center justify-between px-5">
                    <h1 className="text-white text-2xl">Start Now</h1>
                    <button className="text-3xl text-white"><FontAwesomeIcon icon={faXmark} onClick={() => setShowSignUp(false)}/></button>
                </div>
                <label className="ml-3 ">Name<span className="text-[#e4244b]">*</span></label><br></br>
                <input className="w-[90%] p-2 border-2 border-gray-200 rounded-md mb-6 outline-none ml-2" ></input>
                <label className="ml-3">Phone<span className="text-[#e4244b]">*</span></label><br></br>
                <div className="flex">
                <div className="w-16 h-10 p-2 border-2 border-gray-200 rounded-md ml-2">+91</div>
                <input className="w-[250px] h-10 p-2 border-2 border-gray-200 rounded-md mb-6 outline-none ml-4" maxLength={10} ></input>
                </div>
                <label className="ml-3">Email<span className="text-[#e4244b]">*</span></label><br></br>
                <input className="w-[90%] p-2 border-2 border-gray-200 rounded-md mb-6 outline-none ml-2" ></input>
                <button className="text-white bg-[#e4244b] w-36 h-10 rounded-md ml-6">Submit</button>
                </div>
        </div>

    )
}