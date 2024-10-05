'use client'
import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faChevronLeft, faXmark } from '@fortawesome/free-solid-svg-icons'
// import { useState } from "react/cjs/react.production.min";
import {useState} from 'react';
export default function Editlead(props) {
    const {setShowEditLead,selectedLeadId } = props;
    const [name, setName] = useState("")

    const [formData,setFormData] =useState( {
        name : selectedLeadId.name || "",
        leadStatus : selectedLeadId.leadStatus || "",
        cc : selectedLeadId.cc || "",
        leadSource : selectedLeadId.leadSource || "",
        phone : selectedLeadId.phone || "",
        stack : selectedLeadId.stack || "",
        email : selectedLeadId.email || "",
        course : selectedLeadId.course || "",
        feeQuoted : selectedLeadId.feeQuoted || "",
        classMode : selectedLeadId.classMode || "",
        batchTiming : selectedLeadId.batchTiming || "",
        nextFollowUp : selectedLeadId.nextFollowUp || "",
        description  : selectedLeadId.description || ""
    })

    const handleOnChange = (e) => {
        const {name,value} = e.target;

        setFormData(prevData => ({
            ...prevData,
            [name] : value 
        }));
    }




    return (
        <div className="w-full h-auto border-2 absolute top-0  left-0 bg-black bg-opacity-50 py-14">
            <div className="w-[60%] h-[84vh] rounded-lg border-2 mx-auto p-3 bg-white">
                <div className="flex justify-between bg-gray-200 p-3">
                    <div className="flex ">
                    <button onClick={() => setShowEditLead(false)} className="w-32 border p-1 text-2xl  mx-auto"><FontAwesomeIcon icon={faChevronLeft} className="text-2xl   mx-auto"  />Back</button>
                        <p><FontAwesomeIcon icon={faAddressCard} className="text-blue-500 text-4xl" /></p>
                        <h1 className="text-2xl">{selectedLeadId.name}</h1> 
                        
                    </div>
                    <div className="flex gap-x-10">
                    <div className="items-center flex gap-x-4">
                            <button className="w-20 bg-blue-500 border text-white p-2 rounded-md">Update</button>
                            {/* <button className="w-20 bg-blue-500 border text-white p-2 rounded-md">Convert</button> */}
                    </div>
                    {/* <button><FontAwesomeIcon icon={faChevronLeft} className="text-2xl text-gray-300  mx-auto" onClick={() => setShowEditLead(false)} /></button> */}
                    </div>
                </div>
                <div className="flex gap-x-10">
                    <div className=" w-full  mt-3 boarder-2 border-b-2"> <h1 className="text-xl">Name</h1>
                        <input placeholder="Name" value={formData.name} name="name" onChange={handleOnChange} className="text-xl w-full outline-none"></input>
                    </div>
                    <div className=" w-full  mt-3 boarder-2 border-b-2"> <h1 className=" text-blue-950 text-xl">Lead Status</h1>
                        <div className="flex justify-between">
                            <select className=" opacity-25 w-full text-xl w-full outline-none" name="leadStatus" value={formData.leadStatus} onChange={handleOnChange}>
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
                    <div className=" w-full  mt-3 boarder-2 border-b-2"> <h1 className="text-xl">CC</h1>
                        <input placeholder="91" className="text-xl w-full outline-none" name="cc"  value={formData.cc} onChange={handleOnChange}></input>
                    </div>
                    <div className=" w-full  mt-3 boarder-2 border-b-2"> <h1 className=" text-blue-950 text-xl">Lead Source</h1>
                        <div className="flex justify-between">
                            <select className=" opacity-25 w-full text-xl w-full outline-none" name="leadSource" value={formData.leadSource} onChange={handleOnChange}>
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
                    <div className=" w-full  mt-3 boarder-2 border-b-2"> <h1 className="text-xl">Phone</h1>
                        <input placeholder="Phone" className="text-xl w-full outline-none" name="phone" value={formData.phone} onChange={handleOnChange}></input>
                    </div>
                    <div className=" w-full  mt-3 boarder-2 border-b-2"> <h1 className=" text-blue-950 text-xl">Stack</h1>
                        <div className="flex justify-between">
                            <select className="opacity-25 text-xl w-full outline-none" name="stack" value={formData.stack} onChange={handleOnChange}>
                                <option className="text-xl">Select Stack</option>
                                <option>Life Skills</option>
                                <option>Study Abroad</option>
                                <option>HR</option>
                            </select>
                        </div>
                    </div>
                </div>


                <div className="flex gap-x-10">
                    <div className=" w-full  mt-3 boarder-2 border-b-2"> <h1 className="text-xl">Email</h1>
                        <input placeholder="Email" className="text-xl w-full outline-none" name="email" value={formData.email} onChange={handleOnChange}></input>
                    </div>
                    <div className=" w-full  mt-3 boarder-2 border-b-2"> <h1 className=" text-blue-950 text-xl">Course</h1>
                        <div className="flex justify-between">
                            <select className="opacity-25 text-xl w-full outline-none " name="course" value={formData.course} onChange={handleOnChange}>
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
                    <div className=" w-full  mt-3 boarder-2 border-b-2"> <h1 className="text-xl">Fee Quoted</h1>
                        <input placeholder="Free Quoted" className="text-xl w-full outline-none" name="feeQuoted" value={formData.feeQuoted} onChange={handleOnChange}></input>
                    </div>
                    <div className=" w-full  mt-3 boarder-2 border-b-2"> <h1 className=" text-blue-950 text-xl">Class Mode</h1>
                        <div className="flex justify-between">
                            <select className=" opacity-25 w-full outline-none text-xl" name="classMode" value={formData.classMode} onChange={handleOnChange}>
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
                    <div className=" w-full  mt-3 boarder-2 border-b-2"> <h1 className="text-xl">Batch Timing</h1>
                        <input placeholder="Batch Timing" className="text-xl w-full outline-none" name="batchTiming" value={formData.batchTiming} onChange={handleOnChange}></input>
                    </div>
                    <div className=" w-full  mt-3 boarder-2 border-b-2"> <h1 className=" text-xl">Next FollowUp</h1>
                        <div className=" flex justify-between">
                            <input type="datetime-local" className="w-full w-full outline-none" name="nextFollowup" value={formData.nextFollowUp} onChange={handleOnChange}></input>
                        </div>
                    </div>
                </div>



                <div className="flex gap-x-10">
                    <div className=" w-full  mt-3 boarder-2 border-b-2"> <h1 className="text-xl">Description</h1>
                        <input placeholder="Description" className="text-xl w-full outline-none" name="description" value={formData.description} onChange={handleOnChange}></input>
                    </div>

                </div>

                <div className=" flex mt-1">
                
                        <button className="ml-[33%] w-[15%] p-1 border border-blue-500 rounded-lg text-center text-blue-500 mt-1" onClick={() => setShowEditLead(false)}>Cancel</button>
                    
                    
                        <button className="ml-[20px] w-[15%] p-1 border border-blue-500 bg-blue-500 rounded-lg text-center text-white mt-1">Create</button>

                    
                </div>



            </div>






        </div>
    )
}