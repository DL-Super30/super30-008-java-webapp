'use client'
import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faXmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Createlead(props) { 
    const {setCreateLead} = props;

    const [name , setName] = useState("")
    const [cc ,setCc] = useState("+ 91")
    const [phone , setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [feeQuoted , setFeeQuoted] = useState("")
    const [batchTiming , setBatchTiming] = useState("")
    const [description , SetDescription] = useState("")
    const [leadStatus, setLeadStatus] = useState("")
    const [leadSource , setLeadSource] = useState("")
    const [stack , setStack] = useState("")
    const [course , setCourse] = useState("")
    const [classMode,setClassMode] = useState("")
    const [nextFollowUp , setNextFollowUp] = useState("")

    const isValidInput = () => {
        if(!name || !phone ||!email || !feeQuoted){
            toast.error('All fields must be filled out before submitting!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return false;
            
        }
    };

    const createdAt= new Date().toISOString()
    const day = new Date(createdAt).getDay()
    const Month = new Date(createdAt).getMonth()
    const year = new Date(createdAt).getFullYear()
    const formatDate = `${day}/${Month}/${year}`
    console.log(`${day}/${Month}/${year}`)

    const data = {
        name : name,
        createdAt : formatDate,
        cc : cc,
        phone : phone,
        email : email,
        feeQuoted : feeQuoted,
        batchTiming : batchTiming,
        description : description,
        leadStatus : leadStatus,
        leadSource : leadSource,
        stack : stack,
        course : course,
        classMode : classMode,
        nextFollowUp : nextFollowUp
    }

    const leadCreation = async () =>{
        try{
            if(!name || !phone ||!email || !feeQuoted){
                toast.error('All fields must be filled out before submitting!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            }
            else {

            
            const response = await axios.post("http://localhost:3001/signupdata" , data)
            console.log(response)
            toast.success('lead created !', {
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
            setTimeout( () => {
                setCreateLead(false)
                window.location.reload()
            },1500)
        }

        }
        catch (err){
            console.log(err)
            toast.error('failed to create lead !', {
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
        <div className="w-full h-auto border-2 absolute top-0  left-0 bg-black bg-opacity-50 py-14">
            <ToastContainer />
            <div className="w-[60%] h-[84vh] rounded-lg border-2 mx-auto p-3 bg-white">
                <div className="flex justify-between bg-gray-200 p-3">
                    <div className="flex">
                        <p><FontAwesomeIcon icon={faAddressCard} className="text-blue-500 text-4xl" /></p>
                        <h1 className="text-2xl">Create Lead</h1> 
                    </div>
                    <button><FontAwesomeIcon icon={faXmark} className="text-2xl text-gray-300  mx-auto" onClick={() => setCreateLead(false)} /></button>
                </div>
                <div className="flex gap-x-10">
                    <div className=" w-full  mt-3 boarder-2 border-b-2"> <h1 className="text-xl">Name<span className="text-red-500"> *</span></h1>
                        <input placeholder="Name" className="text-xl w-full outline-none" value={name} onChange={(e) => setName(e.target.value)}></input>
                    </div>
                    <div className=" w-full  mt-3 boarder-2 border-b-2"> <h1 className="opacity-25 text-blue-950 text-xl">Lead Status</h1>
                        <div className="flex justify-between">
                            <select className="w-full text-xl" value={leadStatus} onChange={(e) => setLeadStatus(e.target.value)}>
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
                    <div className=" w-full  mt-3 boarder-2 border-b-2">
                         <h1 className="text-xl" >CC</h1>
                        <input placeholder="91" className="text-xl w-full outline-none" value={cc} onChange={(e) =>setCc(e.target.value)}></input>
                    </div>
                    <div className=" w-full  mt-3 boarder-2 border-b-2"> <h1 className="opacity-25 text-blue-950 text-xl">Lead Source</h1>
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
                    <div className=" w-full  mt-3 boarder-2 border-b-2">
                        <h1 className="text-xl">Phone<span className="text-red-500"> *</span></h1>
                        <input placeholder="Phone" className="text-xl w-full outline-none" value={phone} onChange={(e)=>setPhone(e.target.value) }></input>
                    </div>
                    <div className=" w-full  mt-3 boarder-2 border-b-2"> <h1 className="opacity-25 text-blue-950 text-xl">Stack</h1>
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
                    <div className=" w-full  mt-3 boarder-2 border-b-2"> <h1 className="text-xl">Email<span className="text-red-500"> *</span></h1>
                        <input placeholder="Email" className="text-xl w-full outline-none" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                    </div>
                    <div className=" w-full  mt-3 boarder-2 border-b-2"> <h1 className="opacity-25 text-blue-950 text-xl">Course</h1>
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
                    <div className=" w-full  mt-3 boarder-2 border-b-2"> <h1 className="text-xl">Fee Quoted<span className="text-red-500"> *</span> </h1>
                        <input type="number" placeholder="Free Quoted" className="text-xl w-full outline-none" value={feeQuoted} onChange={(e) =>setFeeQuoted(e.target.value)}></input>
                    </div>
                    <div className=" w-full  mt-3 boarder-2 border-b-2"> <h1 className="opacity-25 text-blue-950 text-xl">Class Mode</h1>
                        <div className="flex justify-between">
                            <select className="w-full text-xl" value={classMode} onChange={(e) =>setClassMode(e.target.value)}>
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
                        <input placeholder="Batch Timing" className="text-xl w-full outline-none" value={batchTiming} onChange={(e) =>setBatchTiming(e.target.value)}></input>
                    </div>
                    <div className=" w-full  mt-3 boarder-2 border-b-2"> <h1 className=" text-xl">Next FollowUp</h1>
                        <div className=" flex justify-between">
                            <input type="datetime-local" className="w-full" value={nextFollowUp} onChange={(e) =>setNextFollowUp(e.target.value)}></input>
                        </div>
                    </div>
                </div>



                <div className="flex gap-x-10">
                    <div className=" w-full  mt-3 boarder-2 border-b-2"> <h1 className="text-xl">Description</h1>
                        <input placeholder="Description" className="text-xl w-full outline-none" value={description} onChange={(e) =>SetDescription(e.target.value)}></input>
                    </div>

                </div>

                <div className=" flex mt-1">
                
                        <button className="ml-[33%] w-[15%] p-1 border border-blue-500 rounded-lg text-center text-blue-500 mt-1" onClick={() => setCreateLead(false)}>Cancel</button>
                    
                    
                        <button className="ml-[20px] w-[15%] p-1 border border-blue-500 bg-blue-500 rounded-lg text-center text-white mt-1" onClick={leadCreation}>Create</button>

                    
                </div>



            </div>






        </div>
    )
}