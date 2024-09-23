'use client'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'


export default function Signup(props) {
    const { setShowSignup } = props;
    return (
        <div className='w-full h-[100vh] bg-black bg-opacity-75 pt-[100px] absolute top-0'>


            <div className="w-[370px] h-[430px] m-auto mt-[80px] rounded-lg bg-white ">
                <div className="w-full rounded-t-md h-[60px] bg-red-500 flex justify-between">
                    <h1 className="text-[24px] text-white ml-[30px] mt-[10px]">Start Now</h1>
                    <button className='text-white mr-[15px] text-2xl'><FontAwesomeIcon icon={faXmark} onClick={() => setShowSignup(false)} /></button>  

                </div>
                <div className='p-5'>
                    <label >Name<span className='text-[#e4244b]'>*</span></label><br></br>
                    <input className="w-full border-2 border-gray p-2 m-auto rounded-lg outline-none mb-5 "></input><br></br>
                    <label >Phone<span className='text-[#e4244b]'>*</span></label><br></br>
                    <div className='flex gap-x-1'>
                        <h1 className='w-1/5 border-2 border-gray p-2 mb-5 rounded-lg '>+ 91</h1>
                        <input className="w-4/5 border-2 border-gray p-2 m-auto rounded-lg outline-none mb-5 max-length-10" maxLength={10}></input><br></br>

                    </div>
                    <label >Email<span className='text-[#e4244b]'>*</span></label><br></br>
                    <input className="w-full border-2 border-gray p-2 m-auto rounded-lg outline-none mb-5 "></input><br></br>
                    <button className="w-[140px] h-[40px] border-red-500 rounded-md bg-red-500 border-2 text-white">SUBMIT</button>
                </div>

            </div>


        </div>
    )
}
