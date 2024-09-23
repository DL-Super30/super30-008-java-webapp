'use client'
import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard} from '@fortawesome/free-solid-svg-icons'
export default function Create() {
    return (
        <div className="w-full h-auto border-2 ">
            <div className="w-[60%] h-[90%] rounded-lg border-2 ml-[20%] mt-[50px] p-5 ">
                <div className="flex">
                    <p><FontAwesomeIcon icon={faAddressCard} className="mr-2 text-blue-500 p-2 text-4xl" /></p>
                    <h1 className="text-2xl mt-3">Create Lead</h1>
                </div>
                <div className="flex gap-x-10">
                    <div className=" w-full  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Name</h1>
                        <input placeholder="Name" className="text-xl"></input>
                    </div>
                    <div className=" w-full  mt-6 boarder-2 border-b-2"> <h1 className="opacity-25 text-blue-950 text-xl">Lead Status</h1>
                        <div className="flex justify-between">
                                <select className="w-full text-xl">
                                    <option className="text-xl">Select Lead Status</option>
                                    <option>Not Contacted</option>
                                    <option>Attempted</option>
                                    <option>Warm Lead</option>
                                    <option>Cold Lead</option>
                                </select>
                        </div>
                    </div>
                </div>


                <div className="flex gap-x-10">
                    <div className=" w-full  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">CC</h1>
                        <input placeholder="91" className="text-xl"></input>
                    </div>
                    <div className=" w-full  mt-6 boarder-2 border-b-2"> <h1 className="opacity-25 text-blue-950 text-xl">Lead Source</h1>
                        <div className="flex justify-between">
                                <select className="w-full text-xl">
                                    <option className="text-xl">Select Lead Source</option>
                                    <option>None</option>
                                    <option>Walk In</option>
                                    <option>Student Referral</option>
                                    <option>WebSite</option>
                                    <option>WebSite Chat</option>
                                    <option>Facebook ADs</option>
                                    <option>Inbound Call</option>
                                    <option>Google AdWords</option>
                                    <option>WhatsApp</option>
                                </select>

                        </div>
                    </div>
                </div>


                <div className="flex gap-x-10">
                    <div className=" w-full  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Phone</h1>
                        <input placeholder="Phone" className="text-xl"></input>
                    </div>
                    <div className=" w-full  mt-6 boarder-2 border-b-2"> <h1 className="opacity-25 text-blue-950 text-xl">Stack</h1>
                        <div className="flex justify-between">
                                <select className="w-full text-xl">
                                    <option className="text-xl">Select Stack</option>
                                    <option>Life Skills</option>
                                    <option>Study Abroad</option>
                                    <option>HR</option>
                                </select>
                        </div>
                    </div>
                </div>


                <div className="flex gap-x-10">
                    <div className=" w-full  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Email</h1>
                        <input placeholder="Email" className="text-xl"></input>
                    </div>
                    <div className=" w-full  mt-6 boarder-2 border-b-2"> <h1 className="opacity-25 text-blue-950 text-xl">Course</h1>
                        <div className="flex justify-between">
                                    <select className="w-full text-xl ">
                                        <option>Spoken English</option>
                                        <option>IELTS</option>
                                        <option>Soft Skills</option>
                                        <option>TOFEL</option>
                                        <option>GRE</option>
                                        <option>GAT</option>
                                    </select>
                        </div>
                    </div>
                </div>



                <div className="flex gap-x-10">
                    <div className=" w-full  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Free Quoted</h1>
                        <input placeholder="Free Quoted" className="text-xl"></input>
                    </div>
                    <div className=" w-full  mt-6 boarder-2 border-b-2"> <h1 className="opacity-25 text-blue-950 text-xl">Class Mode</h1>
                        <div className="flex justify-between">
                                <select className="w-full text-xl">
                                    <option className="text-xl">Select Class Mode</option>
                                    <option>International Online</option>
                                    <option>India Online</option>
                                    <option>BLR Classroom </option>
                                    <option>HYD Classroom</option>
                                </select>
                        </div>
                    </div>
                </div>



                <div className="flex gap-x-10">
                    <div className=" w-full  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Batch Timing</h1>
                        <input placeholder="Batch Timing" className="text-xl"></input>
                    </div>
                    <div className=" w-full  mt-6 boarder-2 border-b-2"> <h1 className=" text-xl">Next FollowUp</h1>
                        <div className=" flex justify-between">
                           <input type="datetime-local" className="w-full"></input>
                        </div>
                    </div>
                </div>



                <div className="flex gap-x-10">
                    <div className=" w-full  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Description</h1>
                        <input placeholder="Description" className="text-xl"></input>
                    </div>

                </div>

                <div className=" flex mt-5">
                    <div className="ml-[33%] w-[15%] p-2 border border-blue-500 rounded-lg text-center">
                            <button className=" text-blue-500">Cancel</button>
                    </div>
                    <div className="ml-[20px] w-[15%] p-2 border border-blue-500 bg-blue-500 rounded-lg text-center">
                    <button className=" text-white">Create</button>

                    </div>
                </div>



            </div>






        </div>
    )
}