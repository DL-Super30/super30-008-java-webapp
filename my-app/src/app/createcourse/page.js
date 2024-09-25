'use client'
import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faXmark } from '@fortawesome/free-solid-svg-icons'
export default function Createcourse(props) {
    const {setShowCreateCourse} = props;
    return (
        <div className="w-full h-[100vh] border-2 absolute top-0 left-0 bg-black bg-opacity-50">
            <div className="w-[60%] h-[90%] rounded-lg border-2 ml-[20%] mt-[50px] p-5 bg-white">


            <div className="flex  justify-between">
                <div className="flex">
                    <p><FontAwesomeIcon icon={faAddressCard} className="mr-2 text-blue-500 p-2 text-4xl" /></p>
                    <h1 className="text-2xl mt-3">Create Course</h1>
                    </div>
                    <button><FontAwesomeIcon icon={faXmark} className="mr-2 text-gray-300 p-2 text-2xl" onClick={()=>setShowCreateCourse(false)} /></button>
                </div>
                <h1 className="text-2xl p-2">Course Image</h1>
                <h1 className="text-2xl p-2">Edit</h1>
                <h1 className="text-2xl p-2">Course Information</h1>

                <div className="grid grid-cols-2 gap-x-10">


                <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Coursee Name</h1>
                        <input placeholder="Coursee Name" className="text-xl"></input>
                    </div>
                    <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Course Fee</h1>
                        <input placeholder="Course Fee" className="text-xl"></input>
                    </div><div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Description</h1>
                        <input placeholder="Description" className="text-xl"></input>
                    </div><div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Course Brochure</h1>
                        <input placeholder="Course Brochure" className="text-xl"></input>
                    </div>



                </div>


                <div className=" flex mt-5">
                    {/* <div className=""> */}
                            <button className="ml-[33%] w-[15%] p-2 border border-blue-500 rounded-lg text-center text-blue-500" onClick={()=>setShowCreateCourse(false)}>Cancel</button>
                    {/* </div> */}
                    <div className="ml-[20px] w-[15%] p-2 border border-blue-500 bg-blue-500 rounded-lg text-center">
                    <button className=" text-white">Create</button>

                    </div>
                </div>


            </div>

        </div>
    )}