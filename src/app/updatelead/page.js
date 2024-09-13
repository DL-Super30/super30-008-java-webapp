'use client'

import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft,faAddressCard ,faPhone} from "@fortawesome/free-solid-svg-icons";
import LeadForm from "../leadform/page";
import axios from 'axios'
import { useEffect } from "react";

export default function UpdateLead(props){
    const {hideUpdateScreen} = props;

    useEffect( () =>{
        updateLeadById();
    },[])

    const updatedData = {
        // Add the fields that you want to update
        name: "John Doe",
        email: "john.doe@example.com",
        status : "Not Contacted",
        source : "Website",
        phone : "8897711607",
        stack : "Study Abroad",
        course : "JFS",
        batchTimings : "12-01 PM",
        fee : "18000",
        classMode : "BLR classroom",
        nextFollowUp : "2025-10-28",
        Description: "Description Here"
        // Add other fields as needed
      };

    const updateLeadById = async ( ) => {
        try {
            const response = await axios.put("http://localhost:3001/signUpData");
            const data = response.json()
            console.log(data);
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    }

    return (
        <div className="w-full h-[100vh] p-3 absolute top-[0] left-[0] bg-black bg-opacity-50">
        <div className="w-4/5 mx-auto ">
            <div className="w-full h-16 mt-14 bg-white flex justify-between items-center">
                <div className="p-2 ml-5 items-center flex gap-x-3">
                    <button className="text-lg" onClick={hideUpdateScreen}><FontAwesomeIcon icon={faChevronLeft} className="mr-1 "/> Back</button>
                    <div className="flex items-center gap-x-2">
                    <p className="items-center"><FontAwesomeIcon icon={faAddressCard} className="p-2 bg-[#1998FF] text-white text-xl rounded"/></p>
                    <p className="text-xl font-semibold">Name Of The Lead is Displayed Here</p>
                    </div>
                </div>
                <button className="w-20 h-10  bg-[#1998FF] rounded text-white mr-5" onClick={updateLeadById}>Convert</button>
            </div>
            <div className=" w-full bg-white flex gap-x-2 h-14 border-2 items-center">
                <div className="w-1/4 p-3 ">
                    <h1>Lead Source</h1>
                    <p className="text-[#1998FF] font-semibold"><span>Website</span></p>
                </div>
                <div className="w-1/4 p-3 ">
                    <h1>Phone</h1>
                    <p className="text-[#1998FF] font-semibold"><FontAwesomeIcon icon={faPhone} className="text-sm me-2"/><sapn>6300157188</sapn></p>
                </div>
                <div className="w-1/4 p-3 ">
                    <h1>Email</h1>
                    <p className="text-[#1998FF] font-semibold">narasimhavadla12@gmail.com</p>
                </div>
                <div className="w-1/4 p-3 ">
                    <h1>Lead Status</h1>
                    <p className="text-green-500 font-semibold">Attempted </p>
                </div>
                
            </div>
            <div className="w-full h-[70vh] mt-0 bg-white">
                <div className="w-full h-10 border-b-2 flex gap-x-5">
                    <button className="ml-12 border-b-2 border-[blue]">Details</button>
                    <button>Activity</button>
                    <button>Notes</button>
                    <button>Ask Ai</button>
                </div>
                <div className="">
                    {/* <LeadForm /> */}
                    <div className=" w-full border bg-white mx-auto p-3  mx-auto">
                <div className="grid grid-cols-2 gap-x-5 ">
                    <div>
                        <label className="ml-2 text-[#B9D1E5] text-lg">Name</label><br />
                        <input type="text" placeholder="Name" className="border-b-2 p-1 mb-2 w-full outline-none " /> 
                    </div>
                    <div>
                        <label className="ml-2 text-[#B9D1E5] text-lg">Lead Status</label><br />                        
                        <select className="border-b-2 p-1 mt-1 w-full outline-none">
                            <option >Select Lead Status</option>
                            <option >Not Contacted</option>
                            <option >Contacted</option>
                            <option >Warm Lead</option>
                            <option >cold Lead</option>
                        </select>
                    </div>
                    <div>
                        <label className="ml-2 text-[#B9D1E5] text-lg">CC</label><br />
                        <input type="text" placeholder="+91 " className="border-b-2 p-1 mb-2 w-full outline-none " /> 
                    </div>
                    <div>
                        <label className="ml-2 text-[#B9D1E5] text-lg">Lead Source</label><br />
                        <select className="border-b-2 p-1 w-full mt-1 outline-none">
                            <option >Select Lead Source</option>
                            <option >None</option>
                            <option >Walk in</option>
                            <option >Student Refferal</option>
                            <option >Demo</option>
                            <option >Website</option>
                            <option >Website Chat</option>
                            <option >Inbound Call</option>
                            <option >Google Adverts</option>
                            <option >Facebook Ads</option>
                            <option >Google Business</option>
                            <option >Whatsap Skill Capital</option>
                        </select>
                    </div>
                    <div>
                        <label className="ml-2 text-[#B9D1E5] text-lg">Phone</label><br />
                        <input type="text" placeholder="Name" className="border-b-2 p-1 mb-2 w-full outline-none " /> 
                    </div>
                    <div>
                        <label className="ml-2 text-[#B9D1E5] text-lg">Select Stack</label><br />
                        <select className="border-b-2 p-1 w-full mt-1 outline-none">
                            <option>Select Stack</option>
                            <option>Life Skill</option>
                            <option>Study Abroad</option>
                            <option>HR</option>
                        </select>
                    </div>
                    <div>
                        <label className="ml-2 text-[#B9D1E5] text-lg">Email</label><br />
                        <input type="text" placeholder="Name" className="border-b-2 p-1 mb-2 w-full outline-none " /> 
                    </div>
                    <div>
                        <label className="ml-2 text-[#B9D1E5] text-lg">Course</label><br />
                        <input type="text" placeholder="Name" className="border-b-2 p-1 mb-2 w-full outline-none " /> 
                    </div>
                    <div>
                        <label className="ml-2 text-[#B9D1E5] text-lg">Fee Quoted</label><br />
                        <input type="number" placeholder="Name" className="border-b-2 p-1 mb-2 w-full outline-none " /> 
                    </div>
                    <div>
                        <label className="ml-2 text-[#B9D1E5] text-lg">Class Mode</label><br />
                        <select className="border-b-2 p-1 w-full mt-1 outline-none">
                            <option>Select Class Mode</option>
                            <option>International Online</option>
                            <option>India Online</option>
                            <option>BLR classroom</option>
                            <option>HYD classroom</option>
                        </select>
                    </div>
                    <div>
                        <label className="ml-2 text-[#B9D1E5] text-lg">Batch Timings</label><br />
                        <input type="text" placeholder="Name" className="border-b-2 p-1 mb-2 w-full outline-none " /> 
                    </div>
                    <div>
                        <label className="ml-1 text-[#B9D1E5] text-lg">Next FollowUp</label><br />
                        <input type="datetime-local" placeholder="Name" className="border-b-2 p-1 mb-1 w-full outline-none " /> 
                    </div>
                
                </div>
                <div className="w-full p-1">
                    <label className="text-[#ACC9E1]">Description</label> <br/>
                    <input className="border-b-2 w-full outline-none" placeholder="Description" />
                </div>
            </div>
                </div>
                
            </div>
        </div>
        </div>
    )
}