'use client'
import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faXmark } from '@fortawesome/free-solid-svg-icons'
export default function Createopportunity(props) {
    const {setCreateOpportunity} = props;
    return (
        <div className="w-full h-[100vh] border-2 absolute top-0 bg-black bg-opacity-50 py-4"  >

            <div className="w-[60%] h-[95vh] rounded-lg border-2 mx-auto bg-white p-3 ">
                <div className="flex justify-between ">
                    <div className="flex">
                    <p><FontAwesomeIcon icon={faAddressCard} className="mr-2 text-blue-500 p-2 text-4xl" /></p>
                    <h1 className="text-2xl mt-3">Create Opportunity</h1>
                    </div>
                    <button><FontAwesomeIcon icon={faXmark} className="mx-auto text-gray-300 p-2 text-2xl" onClick={() => setCreateOpportunity(false)} /></button>
                </div>


                <div className="grid grid-cols-2 gap-x-10 kesava h-[75vh]">
                    <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Name</h1>
                        <input placeholder="Name" className="text-xl"></input>
                    </div>
                    <div className=" w-full p-2  mt-6 boarder-2 border-b-2">
                        <h1 className="opacity-25 text-blue-950 text-xl">Opportunity Status</h1>
                        <select className="w-full text-xl">
                            <option className="text-lg">Select Opportunity Status</option>
                            <option>Visiting</option>
                            <option>Visited</option>
                            <option>Demo Attended</option>
                            <option>Lost Opportunity</option>
                        </select>
                    </div>

                    <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">CC</h1>
                        <input placeholder="CC" className="text-xl"></input>
                    </div>
                    <div className=" w-full p-2  mt-6 boarder-2 border-b-2">
                        <h1 className="opacity-25 text-blue-950 text-xl">Opportunity Stage</h1>

                        <select className="w-full text-xl">
                            <option className="text-xl">Select Opportunity Stage</option>
                            <option>None</option>
                            <option>Ready To Join</option>
                            <option>Need Time This Week</option>
                            <option>Need Time Next Week</option>
                        </select>
                    </div>


                    <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Phone</h1>
                        <input placeholder="Phone" className="text-xl"></input>
                    </div>
                    <div className=" w-full p-2  mt-6 boarder-2 border-b-2">
                        <h1 className="opacity-25 text-blue-950 text-xl">Demo Attended Stage</h1>

                        <select className="w-full text-xl">
                            <option className="text-xl">Select Demo Attended Stage</option>
                            <option>None</option>
                            <option>Ready To Join</option>
                            <option>Need Time This Week</option>
                            <option>Need Time Next Week</option>
                        </select>
                    </div>


                    <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Email</h1>
                        <input placeholder="Email" className="text-xl"></input>
                    </div>
                    <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="opacity-25 text-blue-950 text-xl">Visited Stage</h1>
                        <select className="w-full text-xl" >
                            <option className="text-xl">Select Demo Attended Stage</option>
                            <option>None</option>
                            <option>Ready To Join</option>
                            <option>Need Time This Week</option>
                            <option>Need Time Next Week</option>
                        </select>
                    </div>


                    <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Free Quoted</h1>
                        <input placeholder="Free Quoted" className="text-xl"></input>
                    </div>
                    <div className=" w-full p-2  mt-6 boarder-2 border-b-2">
                        <h1 className="opacity-25 text-blue-950 text-xl">Lost Opportunity Reason</h1>
                        <select className="w-full text-xl">
                            <option className="text-xl">Select Lost Opportunity Reason</option>
                            <option>None</option>
                            <option>Invalid Number</option>
                            <option>Not Intrested</option>
                            <option>Asking Free Course</option>
                        </select>
                    </div>




                    <div className=" w-full p-2  mt-6 boarder-2 border-b-2">
                        <h1 className="text-xl">Batch Timing</h1>
                        <input placeholder="Batch Timing" className="text-xl"></input>
                    </div>
                    <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className=" text-xl">Next FollowUp</h1>
                        <input type="datetime-local" className="w-full"></input>
                    </div>


                    <div className=" w-full p-2  mt-6 boarder-2 border-b-2">
                        <h1 className="opacity-25 text-blue-950 text-xl">Lead Status</h1>
                        <select className="w-full text-xl">
                            <option className="text-xl">Select Lead Status</option>
                            <option>Not Contacted</option>
                            <option>Attempted</option>
                            <option>Warm Lead</option>
                            <option>Cold Lead</option>
                        </select>
                    </div>


                    <div className=" w-full p-2  mt-6 boarder-2 border-b-2">
                        <h1 className="opacity-25 text-blue-950 text-xl">Lead Source</h1>
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


                    <div className=" w-full p-2  mt-6 boarder-2 border-b-2">
                        <h1 className="opacity-25 text-blue-950 text-xl">Stack</h1>
                        <select className="w-full text-xl">
                            <option className="text-xl">Select Stack</option>
                            <option>Life Skills</option>
                            <option>Study Abroad</option>
                            <option>HR</option>
                        </select>
                    </div>



                    <div className=" w-full  mt-6 boarder-2 border-b-2">
                        <h1 className="opacity-25 text-blue-950 text-xl">Course</h1>
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


                    <div className=" w-full p-2  mt-6 boarder-2 border-b-2">
                        <h1 className="opacity-25 text-blue-950 text-xl">Class Mode</h1>
                        <select className="w-full text-xl">
                            <option className="text-xl">Select Class Mode</option>
                            <option>International Online</option>
                            <option>India Online</option>
                            <option>BLR Classroom </option>
                            <option>HYD Classroom</option>
                        </select>
                    </div>


                    <div className=" w-full  mt-6 boarder-2 border-b-2">
                        <h1 className="text-xl">Description</h1>
                        <input placeholder="Description" className="text-xl"></input>
                    </div>


                </div>


                <div className=" flex mt-5">
                    
                        <button className="ml-[33%] w-[15%] p-2 border border-blue-500 rounded-lg text-center text-blue-500" onClick={()=>setCreateOpportunity(false)}>Cancel</button>
                    
                        <button className=" ml-[20px] w-[15%] p-2 border border-blue-500 bg-blue-500 rounded-lg text-centertext-white">Create</button>

                </div>



            </div>
        </div>
    )
}
