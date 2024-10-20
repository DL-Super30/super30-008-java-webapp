'use client'
import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faChevronLeft, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Editopportunity(props) {
    const { setShowEditOpportunity, selectopportunityid, selectedOpportunity } = props;
    const [name, setName] = useState("")

    const Api_Url = process.env.NEXT_PUBLIC_API_URL


    const [formData, setFormData] = useState({
        name: selectedOpportunity.name || "",
        opportunitystatus: selectedOpportunity.opportunitystatus || "",
        cc: selectedOpportunity.cc || "",
        opportunitystage: selectedOpportunity.opportunitystage || "",
        phone: selectedOpportunity.phone || "",
        demoattendedstage: selectedOpportunity.demoattendedstage || "",
        email: selectedOpportunity.email || "",
        visitedstage: selectedOpportunity.visitedstage || "",
        feeQuoted: selectedOpportunity.feeQuoted || "",
        lostopportunityreason: selectedOpportunity.lostopportunityreason || "",
        batchTiming: selectedOpportunity.batchTiming || "",
        nextFollowUp: selectedOpportunity.nextFollowUp || "",
        leadStatus: selectedOpportunity.leadStatus || "",
        leadSource: selectedOpportunity.leadSource || "",
        course: selectedOpportunity.course || "",
        classmode: selectedOpportunity.classmode || "",
        description: selectedOpportunity.description || ""
    })



    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }


    const updateOpportunity = async (opportunityid) => {
        const data = {
            createdAt: selectedOpportunity.createdAt,
            name: formData.name,
            opportunitystatus: formData.opportunitystatus,
            cc: formData.cc,
            opportunitystage: formData.opportunitystage,
            phone: formData.phone,
            demoattendedstage: formData.demoattendedstage,
            email: formData.email,
            visitedstage: formData.visitedstage,
            feeQuoted: formData.feeQuoted,
            lostopportunityreason: formData.lostopportunityreason,
            batchTiming: formData.batchTiming,
            nextFollowUp: formData.nextFollowUp,
            leadStatus: formData.leadStatus,
            leadSource: formData.leadSource,
            course: formData.course,
            classmode: formData.classmode,
            description: formData.description

        }
        try {
            await axios.put(`${Api_Url}/opportunitydata/${opportunityid}`, data)
            toast.success('opportuunity updated!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                // transition: Bounce,
            });
            setTimeout(() => {
                window.location.reload();
                setShowEditOpportunity(false);
            }, 2000)
        }
        catch (err) {
            console.log(err)
            toast.error('failed to update!', {
                position: "top-right",
                autoClose: 2000,
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
        <div className="w-full h-[100vh]  border-2 absolute top-0 bg-black bg-opacity-50 py-4"  >

            <div className="w-[60%] h-[88vh] rounded-lg border-2 mx-auto bg-white p-3 ">
                <div className="flex justify-between ">
                    <div className="flex">
                        <button onClick={() => setShowEditOpportunity(false)} className="w-32 border p-1 text-2xl  mx-auto"><FontAwesomeIcon icon={faChevronLeft} className="mx-auto  text-2xl" />Back</button>

                        <p><FontAwesomeIcon icon={faAddressCard} className="mr-2 text-blue-500 p-2 text-4xl" /></p>
                        <h1 className="text-2xl mt-3">Create Opportunity</h1>
                        <div className="flex gap-x-10">
                            <div className="items-center flex gap-x-4">
                                <button className="w-20 bg-blue-500 border text-white p-2 rounded-md" onClick={(e) => updateOpportunity(selectedOpportunity.id)}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-x-10 kesava h-[75vh]">
                <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Name</h1>
                    <input placeholder="Name" className="text-xl" value={formData.name} name="name" onChange={handleOnChange}></input>
                </div>
                <div className=" w-full p-2  mt-6 boarder-2 border-b-2">
                    <h1 className="opacity-25 text-blue-950 text-xl">Opportunity Status</h1>
                    <select className="w-full text-xl" value={formData.opportunitystatus} name="opportunitystatus" onChange={handleOnChange}>
                        <option className="text-lg">Select Opportunity Status</option>
                        <option>Visiting</option>
                        <option>Visited</option>
                        <option>Demo Attended</option>
                        <option>Lost Opportunity</option>
                    </select>
                </div>

                <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">CC</h1>
                    <input placeholder="CC" className="text-xl" value={formData.cc} name="cc" onChange={handleOnChange}></input>
                </div>
                <div className=" w-full p-2  mt-6 boarder-2 border-b-2">
                    <h1 className="opacity-25 text-blue-950 text-xl">Opportunity Stage</h1>

                    <select className="w-full text-xl" value={formData.opportunitystage} name="opportunitystage" onChange={handleOnChange}>
                        <option className="text-xl">Select Opportunity Stage</option>
                        <option>None</option>
                        <option>Ready To Join</option>
                        <option>Need Time This Week</option>
                        <option>Need Time Next Week</option>
                    </select>
                </div>


                <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Phone</h1>
                    <input placeholder="Phone" className="text-xl" value={formData.phone} name="phone" onChange={handleOnChange}></input>
                </div>
                <div className=" w-full p-2  mt-6 boarder-2 border-b-2">
                    <h1 className="opacity-25 text-blue-950 text-xl">Demo Attended Stage</h1>

                    <select className="w-full text-xl" value={formData.demoattendedstage} name="demoattendedstage" onChange={handleOnChange}>
                        <option className="text-xl">Select Demo Attended Stage</option>
                        <option>None</option>
                        <option>Ready To Join</option>
                        <option>Need Time This Week</option>
                        <option>Need Time Next Week</option>
                    </select>
                </div>


                <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Email</h1>
                    <input placeholder="Email" className="text-xl" value={formData.email} name="email" onChange={handleOnChange}></input>
                </div>
                <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="opacity-25 text-blue-950 text-xl">Visited Stage</h1>
                    <select className="w-full text-xl" value={formData.visitedstage} name="visitedstage" onChange={handleOnChange}>
                        <option className="text-xl">Select Demo Attended Stage</option>
                        <option>None</option>
                        <option>Ready To Join</option>
                        <option>Need Time This Week</option>
                        <option>Need Time Next Week</option>
                    </select>
                </div>


                <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className="text-xl">Fee Quoted</h1>
                    <input placeholder="Free Quoted" className="text-xl" value={formData.feeQuoted} name="feeQuoted" onChange={handleOnChange}></input>
                </div>
                <div className=" w-full p-2  mt-6 boarder-2 border-b-2">
                    <h1 className="opacity-25 text-blue-950 text-xl">Lost Opportunity Reason</h1>
                    <select className="w-full text-xl" value={formData.lostopportunityreason} name="lostopportunityreason" onChange={handleOnChange}>
                        <option className="text-xl">Select Lost Opportunity Reason</option>
                        <option>None</option>
                        <option>Invalid Number</option>
                        <option>Not Intrested</option>
                        <option>Asking Free Course</option>
                    </select>
                </div>




                <div className=" w-full p-2  mt-6 boarder-2 border-b-2">
                    <h1 className="text-xl">Batch Timing</h1>
                    <input placeholder="Batch Timing" className="text-xl" value={formData.batchTiming} name="batchTiming" onChange={handleOnChange}></input>
                </div>
                <div className=" w-full p-2  mt-6 boarder-2 border-b-2"> <h1 className=" text-xl">Next FollowUp</h1>
                    <input type="datetime-local" className="w-full" value={formData.nextFollowUp} name="nextFollowUp" onChange={handleOnChange}></input>
                </div>


                <div className=" w-full p-2  mt-6 boarder-2 border-b-2">
                    <h1 className="opacity-25 text-blue-950 text-xl">Lead Status</h1>
                    <select className="w-full text-xl" value={formData.leadStatusstatus} name="leadStatusstatus" onChange={handleOnChange}>
                        <option className="text-xl">Select Lead Status</option>
                        <option>Not Contacted</option>
                        <option>Attempted</option>
                        <option>Warm Lead</option>
                        <option>Cold Lead</option>
                    </select>
                </div>


                <div className=" w-full p-2  mt-6 boarder-2 border-b-2">
                    <h1 className="opacity-25 text-blue-950 text-xl">Lead Source</h1>
                    <select className="w-full text-xl" value={formData.leadSource} name="leadSource" onChange={handleOnChange}>
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
                    <select className="w-full text-xl" value={formData.stack} name="stack" onChange={handleOnChange}>
                        <option className="text-xl">Select Stack</option>
                        <option>Life Skills</option>
                        <option>Study Abroad</option>
                        <option>HR</option>
                    </select>
                </div>



                <div className=" w-full  mt-6 boarder-2 border-b-2">
                    <h1 className="opacity-25 text-blue-950 text-xl">Course</h1>
                    <div className="flex justify-between">
                        <select className="w-full text-xl " value={formData.course} name="course" onChange={handleOnChange}>
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
                    <select className="w-full text-xl" value={formData.classmode} name="classmode" onChange={handleOnChange}>
                        <option className="text-xl">Select Class Mode</option>
                        <option>International Online</option>
                        <option>India Online</option>
                        <option>BLR Classroom </option>
                        <option>HYD Classroom</option>
                    </select>
                </div>


                <div className=" w-full  mt-6 boarder-2 border-b-2">
                    <h1 className="text-xl">Description</h1>
                    <input placeholder="Description" className="text-xl" value={formData.description} name="description" onChange={handleOnChange}></input>
                </div>


            </div>
            </div>


            





        </div>


    )
}
