'use client'
import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faChevronLeft, faXmark } from '@fortawesome/free-solid-svg-icons'
export default function Editlearner(props) {
    const { setShowEditLearner } = props;
    return (
        <div className="w-full h-[100vh] border-2 absolute top-0 bg-black bg-opacity-50 py-4" >
            <div className="w-[60%] h-[88vh] rounded-lg border-2 mx-auto bg-white p-3 ">
                <div className="flex justify-between">
                    <div className="flex">
                    <button onClick={() => setShowEditLearner(false)} className="w-32 border p-1 text-2xl  mx-auto"><FontAwesomeIcon icon={faChevronLeft}   />Back</button>

                        <p><FontAwesomeIcon icon={faAddressCard} className="mr-2 text-blue-500 p-2 text-4xl" /></p>
                        <h1 className="text-2xl mt-3">Create Learners</h1>
                    </div>
                </div>


                <div className="w-full h-[75.5vh] kesava">
                    <div className="grid grid-cols-2 gap-x-10">
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">First Name</h1>
                            <input placeholder="First Name" className="text-xl"></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Last Name</h1>
                            <input placeholder="Last Name" className="text-xl"></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">ID Proof</h1>
                            <input placeholder="ID Proof" className="text-xl"></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Phone</h1>
                            <input placeholder="Phone" className="text-xl"></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className=" text-xl">Date Of Birth</h1>
                            <input type="date" className="w-full"></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Email</h1>
                            <input placeholder="Email" className="text-xl"></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className=" text-xl">Registered Date</h1>
                            <input type="date" className="w-full"></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="opacity-25 text-blue-950 text-xl">Location</h1>
                            <select className="w-full text-xl" >
                                <option className="text-xl">Select Location</option>
                                <option>None</option>
                                <option>Ready To Join</option>
                                <option>Need Time This Week</option>
                                <option>Need Time Next Week</option>
                            </select>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Batch ID's</h1>
                            <input placeholder="Batch ID's" className="text-xl"></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Alternate phone</h1>
                            <input placeholder="Alternate phone" className="text-xl"></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Description</h1>
                            <input placeholder="Description" className="text-xl"></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Exchange Rate</h1>
                            <input placeholder="Exchange Rate" className="text-xl"></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Source</h1>
                            <input placeholder="Source" className="text-xl"></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="opacity-25 text-blue-950 text-xl">Attended Demo</h1>
                            <select className="w-full text-xl" >
                                <option className="text-xl">Select Attended Demo</option>
                                <option>None</option>
                                <option>Ready To Join</option>
                                <option>Need Time This Week</option>
                                <option>Need Time Next Week</option>
                            </select>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Learner Owner</h1>
                            <input placeholder="Learner Owner" className="text-xl"></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="opacity-25 text-blue-950 text-xl">Learner Stage</h1>
                            <select className="w-full text-xl" >
                                <option className="text-xl">Select Learner Stage</option>
                                <option>None</option>
                                <option>Ready To Join</option>
                                <option>Need Time This Week</option>
                                <option>Need Time Next Week</option>
                            </select>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Currency</h1>
                            <input placeholder="Currency" className="text-xl"></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className=" text-xl">Lead crated time</h1>
                            <input type="datetime-local" className="w-full"></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Counseling Done BY</h1>
                            <input placeholder="Counseling Done BY" className="text-xl"></input>
                        </div>

                    </div>


                    <h1 className="text-2xl mt-16">Course Details</h1>
                    <div className="grid grid-cols-2 gap-x-10">


                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Registered Course</h1>
                            <input placeholder="Registered Course" className="text-xl"></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className=" text-xl">Preferable time</h1>
                            <input type="datetime-local" className="w-full"></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Tech Stack</h1>
                            <input placeholder="Tech Stack" className="text-xl"></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className=" text-xl">Batch timing</h1>
                            <input type="datetime-local" className="w-full"></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Course Comments</h1>
                            <input placeholder="Course Comments" className="text-xl"></input>
                        </div><div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Mode Of Class</h1>
                            <input placeholder="Mode Of Class" className="text-xl"></input>
                        </div><div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Slack Access</h1>
                            <input placeholder="Slack Access" className="text-xl"></input>
                        </div><div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Comment</h1>
                            <input placeholder="Comment" className="text-xl"></input>
                        </div><div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">LMS Access</h1>
                            <input placeholder="LMS Access" className="text-xl"></input>
                        </div>
                    </div>
                </div>



            
            </div>
        </div>
    )
}
