'use client'
import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faXmark } from '@fortawesome/free-solid-svg-icons'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Createopportunity(props) {
    const { setCreateOpportunity } = props;


    const [name, setName] = useState("")
    const [cc, setCc] = useState("+ 91")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [demoattendedstage, setDemoAttendedStage] = useState("")
    const [visitedstage, setVisitedStage] = useState("")
    const [freequoted, SetFreeQuoted] = useState("")
    const [opportunityStatus, setOpportunityStatus] = useState("")
    const [opportunitystage, setOpportunityStage] = useState("")
    const [lostopportunityreason, setLostOpportunityReason] = useState("")
    const [course, setCourse] = useState("")
    const [classMode, setClassMode] = useState("")
    const [nextFollowUp, setNextFollowUp] = useState("")
    const [feeQuoted, setFeeQuoted] = useState("")
    const [batchTiming, setBatchTiming] = useState("")
    const [description, setDescription] = useState("")
    const [opportunitySource, setOpportunitySource] = useState("")
    const [stack, setStack] = useState("")
    const [leadstatus, setLeadStatus] = useState("")
    const [leadsource, setLeadSource] = useState("")



    const createdAt = new Date().toISOString()
    const day = new Date(createdAt).getDay()
    const Month = new Date(createdAt).getMonth()
    const year = new Date(createdAt).getYear()
    const formatDate = `${day}/${Month}/${year}`


    const data = {
        name : name,
        formatDate,
        cc: cc,
        phone: phone,
        email: email,
        feeQuoted: feeQuoted,
        batchTiming: batchTiming,
        description: description,
        opportunityStatus: opportunityStatus,
        opportunitySource: opportunitySource,
        stack: stack,
        course: course,
        classMode: classMode,
        nextFollowUp: nextFollowUp
    }


    const opportunityCreation = async() => {
        try{
            const response  = await axios.post("http://localhost:3001/opportunitydata" , data)
            console.log(response)
            toast.success('opportunity created!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                // transition: Bounce,
                })
                setTimeout( () => {
                    setCreateOpportunity(false)
                    window.location.reload()
                }, 1500);

        }
        catch (err){
            console.log(err)
            toast.error('Failed to create opportunity!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                // transition: Bounce,
                });
                
        }
    }

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
                        <input placeholder="Name" className="text-xl" value={name} onChange={(e) => setName(e.target.value)}></input>
                    </div>
                    <div className=" w-full p-2  mt-6 boarder-2 border-b-2">
                        <h1 className="opacity-25 text-blue-950 text-xl">Opportunity Status</h1>
                        <select className="w-full text-xl" value={opportunityStatus} onChange={(e) =>setOpportunityStatus(e.target.value)}>
                            <option className="text-lg">Select Opportunity Status</option>
                            <option>Visiting</option>
                            <option>Visited</option>
                            <option>Demo Attended</option>
                            <option>Lost Opportunity</option>
                        </select>
                    </div>

                    <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">CC</h1>
                        <input placeholder="CC" className="text-xl" value={cc} onChange={(e) => setCc(e.target.value)}></input>
                    </div>
                    <div className=" w-full p-2  mt-6 boarder-2 border-b-2">
                        <h1 className="opacity-25 text-blue-950 text-xl">Opportunity Stage</h1>

                        <select className="w-full text-xl" value={opportunitystage} onChange={(e) =>opportunitystage(e.target.value)}>
                            <option className="text-xl">Select Opportunity Stage</option>
                            <option>None</option>
                            <option>Ready To Join</option>
                            <option>Need Time This Week</option>
                            <option>Need Time Next Week</option>
                        </select>
                    </div>


                    <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Phone</h1>
                        <input placeholder="Phone" className="text-xl" value={phone} onChange={(e) => setPhone(e.target.value)}></input>
                    </div>
                    <div className=" w-full p-2  mt-6 boarder-2 border-b-2">
                        <h1 className="opacity-25 text-blue-950 text-xl">Demo Attended Stage</h1>

                        <select className="w-full text-xl" value={demoattendedstage} onChange={(e) =>setDemoAttendedStage(e.target.value)}>
                            <option className="text-xl">Select Demo Attended Stage</option>
                            <option>None</option>
                            <option>Ready To Join</option>
                            <option>Need Time This Week</option>
                            <option>Need Time Next Week</option>
                        </select>
                    </div>


                    <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Email</h1>
                        <input placeholder="Email" className="text-xl" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="opacity-25 text-blue-950 text-xl">Visited Stage</h1>
                        <select className="w-full text-xl" value={visitedstage} onChange={(e) => setVisitedStage(e.target.value)}>
                            <option className="text-xl">Select Demo Attended Stage</option>
                            <option>None</option>
                            <option>Ready To Join</option>
                            <option>Need Time This Week</option>
                            <option>Need Time Next Week</option>
                        </select>
                    </div>


                    <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Free Quoted</h1>
                        <input placeholder="Free Quoted" className="text-xl" value={freequoted} onChange={(e) => SetFreeQuoted(e.target.value)}></input>
                    </div>
                    <div className=" w-full p-2  mt-6 boarder-2 border-b-2">
                        <h1 className="opacity-25 text-blue-950 text-xl">Lost Opportunity Reason</h1>
                        <select className="w-full text-xl" value={lostopportunityreason} onChange={(e) => setLostOpportunityReason(e.target.value)}>
                            <option className="text-xl">Select Lost Opportunity Reason</option>
                            <option>None</option>
                            <option>Invalid Number</option>
                            <option>Not Intrested</option>
                            <option>Asking Free Course</option>
                        </select>
                    </div>




                    <div className=" w-full p-2  mt-6 boarder-2 border-b-2">
                        <h1 className="text-xl">Batch Timing</h1>
                        <input placeholder="Batch Timing" className="text-xl" value={batchTiming} onChange={(e) => setBatchTiming(e.target.value)}></input>
                    </div>
                    <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className=" text-xl">Next FollowUp</h1>
                        <input type="datetime-local" className="w-full" value={visitedstage} onChange={(e) => setVisitedStage(e.target.value)}></input>
                    </div>


                    <div className=" w-full p-2  mt-6 boarder-2 border-b-2">
                        <h1 className="opacity-25 text-blue-950 text-xl">Lead Status</h1>
                        <select className="w-full text-xl" value={leadstatus} onChange={(e) => setLeadStatus(e.target.value)}>
                            <option className="text-xl">Select Lead Status</option>
                            <option>Not Contacted</option>
                            <option>Attempted</option>
                            <option>Warm Lead</option>
                            <option>Cold Lead</option>
                        </select>
                    </div>


                    <div className=" w-full p-2  mt-6 boarder-2 border-b-2">
                        <h1 className="opacity-25 text-blue-950 text-xl">Lead Source</h1>
                        <select className="w-full text-xl" value={leadsource} onChange={(e) => setLeadSource(e.target.value)}>
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
                        <select className="w-full text-xl" value={stack} onChange={(e) => setStack(e.target.value)}>
                            <option className="text-xl">Select Stack</option>
                            <option>Life Skills</option>
                            <option>Study Abroad</option>
                            <option>HR</option>
                        </select>
                    </div>



                    <div className=" w-full  mt-6 boarder-2 border-b-2">
                        <h1 className="opacity-25 text-blue-950 text-xl">Course</h1>
                        <div className="flex justify-between">
                            <select className="w-full text-xl " value={course} onChange={(e) => setCourse(e.target.value)}>
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
                        <select className="w-full text-xl" value={classMode} onChange={(e) => setClassMode(e.target.value)}>
                            <option className="text-xl">Select Class Mode</option>
                            <option>International Online</option>
                            <option>India Online</option>
                            <option>BLR Classroom </option>
                            <option>HYD Classroom</option>
                        </select>
                    </div>


                    <div className=" w-full  mt-6 boarder-2 border-b-2">
                        <h1 className="text-xl">Description</h1>
                        <input placeholder="Description" className="text-xl" value={description} onChange={(e) => setDescription(e.target.value)}></input>
                    </div>


                </div>


                <div className=" flex mt-5">

                    <button className="ml-[33%] w-[15%] p-2 border border-blue-500 rounded-lg text-center text-blue-500" onClick={() => setCreateOpportunity(false)}>Cancel</button>

                    <button className=" ml-[20px] w-[15%] p-2 border border-blue-500 bg-blue-500 rounded-lg text-centertext-white" onClick={opportunityCreation} >Create</button>

                </div>



            </div>
        </div>
    )
}
