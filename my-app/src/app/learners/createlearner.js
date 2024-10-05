'use client'
import React from "react"
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faXmark } from '@fortawesome/free-solid-svg-icons'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { comment } from "postcss"

export default function Createlearner(props) {
    const {setShowCreateLearner} = props;

    const [firstname, setFirstName] =useState("")
    const [lastname, setLastName] = useState("")
    const [idproof, setIdProof] = useState("")
    const [phone, setPhone] = useState("")
    const [dateofbirth, setDateOfBirth] = useState("")
    const [email, setEmail] = useState("")
    const [registereddate, setRegisteredDate] = useState("")
    const [location, setLocation] = useState("")
    const [batchid, setBatchId] = useState("")
    const [alternatephone, setAlternatePhone] = useState("")
    const [description, setDescription] = useState("")
    const [exchangerate, setExchangeRate] = useState("")
    const [source, setSource] = useState("")
    const [attendeddemo, setAttendedDemo] = useState("")
    const [learnerowner, setLearnerOwner] = useState("")
    const [learnerstage, setLearnerStage] = useState("")
    const [currency, setCurrency] = useState("")
    const [leadcreatedtime, setLeadCreatedTime] = useState("")
    const [Counselingdoneby, setCounselingDoneBy] = useState("")
    const [registeredcourse, setRegisteredCourse] = useState("")
    const [preferabletime, setPreferableTime] = useState("")
    const [techstack, setTechStack] = useState("")
    const [batchTiming, setBatchTiming] = useState("")
    const [coursecomments, setCourseComments] = useState("")
    const [modeofclass, setModeOfClass] = useState("")
    const [slackaccess,setSlackAccess] = useState("")
    const [comments, setComments] = useState("")
    const [lmsaccess, setLmsAccess] = useState("")

    const createdAt = new Date().toISOString()
    const day = new Date(createdAt).getDay()
    const Month = new Date(createdAt).getMonth()
    const year = new Date(createdAt).getYear()
    const formatDate = `${day}/${Month}/${year}`

    const data = {
        createdAt : formatDate,
        firstname :firstname,
        lastname : lastname,
        idproof: idproof,
        phone : phone,
        dateofbirth:dateofbirth,
        email:email,
        registereddate:registereddate,
        location:location,
        batchid:batchid,
        alternatephone:alternatephone,
        description:description,
        exchangerate:exchangerate,
        source:source,
        attendeddemo:attendeddemo,
        learnerowner:learnerowner,
        learnerstage:learnerstage,
        currency:currency,
        leadcreatedtime:leadcreatedtime,
        Counselingdoneby:Counselingdoneby,
        registeredcourse:registeredcourse,
        preferabletime:preferabletime,
        techstack:techstack,
        batchTiming:batchTiming,
        coursecomments:coursecomments,
        modeofclass:modeofclass,
        slackaccess:slackaccess,
        comments:comments,
        lmsaccess:lmsaccess
    }
   
    const learnerCreation = async() => {
        try{
            if(!firstname || !lastname || !dateofbirth || !batchid ) {
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

            const response = await axios.post("http://localhost:3001/learnerdata", data)
            console.log(response)
            toast.success('Learner Created!', {
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
                setTimeout(() => {
                    setShowCreateLearner(false)
                    window.location.reload()
                }, 1500);
            }
        }
        catch (err){
            console.log(err)
            toast.error('Failed to create learner!', {
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
        <div className="w-full h-auto border-2 absolute top-0 bg-black bg-opacity-50 py-4" >
        <ToastContainer/>
            <div className="w-[60%] h-[100%] rounded-lg border-2 mx-auto bg-white p-3 ">
                <div className="flex justify-between">
                    <div className="flex">
                    <p><FontAwesomeIcon icon={faAddressCard} className="mr-2 text-blue-500 p-2 text-4xl" /></p>
                    <h1 className="text-2xl mt-3">Create Learners</h1>
                    </div>
                    <button><FontAwesomeIcon icon={faXmark} className="mx-auto text-gray-300 p-2 text-2xl"  onClick={()=>setShowCreateLearner(false)}/></button>
                </div>


                <div className="w-full h-[75.5vh] kesava">

                    <div className="grid grid-cols-2 gap-x-10">
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">First Name<span className="text-red-400">*</span></h1>
                            <input placeholder="First Name" className="text-xl w-full outline-none" value={firstname} onChange={(e)=>setFirstName(e.target.value)} ></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Last Name<span className="text-red-400">*</span></h1>
                            <input placeholder="Last Name" className="text-xl w-full outline-none" value={lastname} onChange={(e)=>setLastName(e.target.value)}></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">ID Proof<span className="text-red-400">*</span></h1>
                            <input placeholder="ID Proof" className="text-xl w-full outline-none" value = {idproof} onChange={(e)=>setIdProof(e.target.value)}></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Phone</h1>
                            <input placeholder="Phone" className="text-xl w-full outline-none"value = {phone} onChange={(e)=>setPhone(e.target.value)}></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className=" text-xl">Date Of Birth<span className="text-red-400">*</span></h1>
                            <input type="date" className="w-full"value = {dateofbirth} onChange={(e)=>setDateOfBirth(e.target.value)}></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Email</h1>
                            <input placeholder="Email" className="text-xl w-full outline-none"value = {email} onChange={(e)=>setEmail(e.target.value)}></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className=" text-xl">Registered Date</h1>
                            <input type="date" className="w-full"value = {registereddate} onChange={(e)=>setRegisteredDate(e.target.value)}></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="opacity-25 text-blue-950 text-xl">Location</h1>
                            <select className="w-full text-xl" value = {location} onChange={(e)=>setLocation(e.target.value)}>
                                <option className="text-xl">Select Location</option>
                                <option>None</option>
                                <option>Ready To Join</option>
                                <option>Need Time This Week</option>
                                <option>Need Time Next Week</option>
                            </select>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Batch ID's<span className="text-red-400">*</span></h1>
                            <input placeholder="Batch ID's" className="text-xl w-full outline-none"value = {batchid} onChange={(e)=>setBatchId(e.target.value)}></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Alternate phone</h1>
                            <input placeholder="Alternate phone" className="text-xl w-full outline-none"value = {alternatephone} onChange={(e)=>setAlternatePhone(e.target.value)}></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Description</h1>
                            <input placeholder="Description" className="text-xl w-full outline-none"value = {description} onChange={(e)=>setDescription(e.target.value)}></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Exchange Rate</h1>
                            <input placeholder="Exchange Rate" className="text-xl w-full outline-none"value = {exchangerate} onChange={(e)=>setExchangeRate(e.target.value)}></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Source</h1>
                            <input placeholder="Source" className="text-xl w-full outline-none"value = {source} onChange={(e)=>setSource(e.target.value)}></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="opacity-25 text-blue-950 text-xl">Attended Demo</h1>
                            <select className="w-full text-xl w-full outline-none" value = {attendeddemo} onChange={(e)=>setAttendedDemo(e.target.value)} >
                                <option className="text-xl">Select Attended Demo</option>
                                <option>None</option>
                                <option>Ready To Join</option>
                                <option>Need Time This Week</option>
                                <option>Need Time Next Week</option>
                            </select>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Learner Owner</h1>
                            <input placeholder="Learner Owner" className="text-xl w-full outline-none"value = {learnerowner} onChange={(e)=>setLearnerOwner(e.target.value)}></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="opacity-25 text-blue-950 text-xl">Learner Stage</h1>
                            <select className="w-full text-xl w-full outline-none"value = {learnerstage} onChange={(e)=>setLearnerStage(e.target.value)} >
                                <option className="text-xl">Select Learner Stage</option>
                                <option>None</option>
                                <option>Ready To Join</option>
                                <option>Need Time This Week</option>
                                <option>Need Time Next Week</option>
                            </select>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Currency</h1>
                            <input placeholder="Currency" className="text-xl w-full outline-none"value = {currency} onChange={(e)=>setCurrency(e.target.value)}></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className=" text-xl">Lead crated time</h1>
                            <input type="datetime-local" className="w-full text-xl outline-none"value = {leadcreatedtime} onChange={(e)=>setLeadCreatedTime(e.target.value)}></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Counseling Done BY</h1>
                            <input placeholder="Counseling Done BY" className="text-xl w-full outline-none"value = {Counselingdoneby} onChange={(e)=>setCounselingDoneBy(e.target.value)}></input>
                        </div>

                    </div>


                    <h1 className="text-2xl mt-16">Course Details</h1>
                    <div className="grid grid-cols-2 gap-x-10">


                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Registered Course</h1>
                            <input placeholder="Registered Course" className="text-xl w-full outline-none" value = {registeredcourse} onChange={(e)=>setRegisteredCourse(e.target.value)}></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className=" text-xl">Preferable time</h1>
                            <input type="datetime-local" className="w-full text-xl"value = {preferabletime} onChange={(e)=>setPreferableTime(e.target.value)}></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Tech Stack</h1>
                            <input placeholder="Tech Stack" className="text-xl w-full outline-none" value = {techstack} onChange={(e)=>setTechStack(e.target.value)}></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className=" text-xl">Batch timing</h1>
                            <input type="datetime-local" className="w-full"value = {batchTiming} onChange={(e)=>setBatchTiming(e.target.value)}></input>
                        </div>
                        <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Course Comments</h1>
                            <input placeholder="Course Comments" className="text-xl w-full outline-none"value = {coursecomments} onChange={(e)=>setCourseComments(e.target.value)}></input>
                        </div><div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Mode Of Class</h1>
                            <input placeholder="Mode Of Class" className="text-xl w-full outline-none"value = {modeofclass} onChange={(e)=>setModeOfClass(e.target.value)}></input>
                        </div><div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Slack Access</h1>
                            <input placeholder="Slack Access" className="text-xl w-full outline-none"value = {slackaccess} onChange={(e)=>setSlackAccess(e.target.value)}></input>
                        </div><div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">comments</h1>
                            <input placeholder="Comment" className="text-xl w-full outline-none"value = {comments} onChange={(e)=>setComments(e.target.value)}></input>
                        </div><div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">LMS Access</h1>
                            <input placeholder="LMS Access" className="text-xl w-full outline-none"value = {lmsaccess} onChange={(e)=>setLmsAccess(e.target.value)}></input>
                        </div>
                    </div>
                </div>



                <div className=" flex mt-5">
                    <div className="ml-[33%] w-[15%] p-2 border border-blue-500 rounded-lg text-center">
                            <button className=" text-blue-500" onClick={()=>setShowCreateLearner(false)}>Cancel</button>
                    </div>
                    <div className="ml-[20px] w-[15%] p-2 border border-blue-500 bg-blue-500 rounded-lg text-center">
                    <button className=" text-white" onClick={learnerCreation}>Create</button>

                    </div>
                </div>


            </div>
        </div>
    )
}
