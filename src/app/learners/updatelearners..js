'use client'

import React from "react"

export default function UpdateLearner() {
    return (
        <div>
            <div className="w-3/4 bg-[#F5EFFF] rounded h-[90vh] mx-auto ">
                   <div className="w-full p-4 bg-[#CDC1FF] p-2 items-center rounded-t-md flex justify-between">
                        <div className="flex gap-x-4 items-center">
                            <span className="bg-[#A594F9] text-xl text-white p-2  rounded-md px-3"><FontAwesomeIcon icon={faAddressCard}/></span>
                            <h1 className="font-bold text-2xl">Create Learner</h1>
                        </div>
                        <button className="text-3xl" onClick={() => setShowCreateLearner(false)}><FontAwesomeIcon icon={faXmark}/></button>
                   </div>
                   <div className="p-4">
                        <div className="w-full h-[67vh] border border-[#A594F9] rounded-md overflow-y-scroll p-2">
                           <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label>First Name</label> <br></br>
                                        <input type="text"  className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="first name"></input>
                                    </div>
                                    <div>
                                        <label>Last Name</label> <br></br>
                                        <input type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="last name"></input>
                                    </div>
                                    <div>
                                        <label>Id Proof</label> <br></br>
                                        <input type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Id Proof"></input>
                                    </div>
                                    <div>
                                        <label>Phone</label> <br></br>
                                        <input type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="phone"></input>
                                    </div>
                                    <div>
                                        <label>Date Of Birth</label> <br></br>
                                        <input type="date" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="DOB"></input>
                                    </div>
                                    <div>
                                        <label>Email</label> <br></br>
                                        <input type="email" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Email"></input>
                                    </div>
                                    <div>
                                        <label>Registration Date</label> <br></br>
                                        <input type="date" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Registration Date"></input>
                                    </div>
                                    <div>
                                        <label>Location</label> <br></br>
                                        <input type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Location"></input>
                                    </div>
                                    <div>
                                        <label>batchId</label> <br></br>
                                        <input type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Batch Id"></input>
                                    </div>
                                    <div>
                                        <label>Alternate Phone</label> <br></br>
                                        <input type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Alternate Phone" maxLength={10}></input>
                                    </div>
                                    <div>
                                        <label>Description</label> <br></br>
                                        <input type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Description" ></input>
                                    </div>
                                    <div>
                                        <label>Exchange Rate</label> <br></br>
                                        <input type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Exchange Rate" ></input>
                                    </div>
                                    <div>
                                        <label>Source</label> <br></br>
                                        <input type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Source" ></input>
                                    </div>
                                    <div>
                                        <label>Attend Demo</label> <br></br>
                                        <input type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Attended Demo" ></input>
                                    </div>
                                    <div>
                                        <label>Learner Owner</label> <br></br>
                                        <input type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Learner Owner" ></input>
                                    </div>
                                    <div>
                                        <label>Learner Stage</label> <br></br>
                                        <input type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Learner Stage" ></input>
                                    </div>
                                    <div>
                                        <label>Currency</label> <br></br>
                                        <input type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Currency" ></input>
                                    </div>
                                    <div>
                                        <label>Lead crated time</label> <br></br>
                                        <input type="datetime-local" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Source" ></input>
                                    </div>
                                    <div>
                                        <label>Counseling Done BY</label> <br></br>
                                        <input type="number" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Counseling Done BY" ></input>
                                    </div>
                           </div>
                           <h1 className="mt-4 text-xl font-semibold">Course Details</h1>
                           <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label>Registered Course</label> <br></br>
                                    <input type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Registered Course"></input>
                                </div>
                                <div>
                                    <label>Preferable Time</label> <br></br>
                                    <input type="datetime-local" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Preferable Time"></input>
                                </div>
                                <div>
                                    <label>Tech Stack</label> <br></br>
                                    <input type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Tech Stack"></input>
                                </div>
                                <div>
                                    <label>Batch Timing</label> <br></br>
                                    <input type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Batch Timing"></input>
                                </div>
                                <div>
                                    <label>Course Comments</label> <br></br>
                                    <input type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Course Comments"></input>
                                </div>
                                <div>
                                    <label>Mode Of Class</label> <br></br>
                                    <input type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Mode Of Class"></input>
                                </div>
                                <div>
                                    <label>Slack Access</label> <br></br>
                                    <input type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Slack Access"></input>
                                </div>
                                <div>
                                    <label>Comment</label> <br></br>
                                    <input type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Comment"></input>
                                </div>
                                <div>
                                    <label>LMS Access</label> <br></br>
                                    <input type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="LMS Access"></input>
                                </div>
                            </div>
                        </div>
                   </div>
                   <div className="flex justify-center gap-x-3">
                        <button className="w-36 p-1 rounded-md border bg-[#CDC1FF] border-[#A594F9] " onClick={() => setShowCreateLearner(false)}>Cancel</button>
                        <button className="w-36 p-1 bg-[#A594F9] rounded-md">Create</button>
                   </div>
            </div>
        </div>
    )
}