'use client'

import React, { useState } from "react";

export default function LeadForm({ onSubmit , closeForm }) {
    const [leadname, setLeadName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [leadstatus, setLeadStatus] = useState('Not Contacted');
    const [leadsource, setLeadSource] = useState('None');
    // const [stack, setStack] = useState('HR');
    const [course, setCourse] = useState('');
    const [feeQuoted, setFeeQuoted] = useState('');
    // const [classMode, setClassMode] = useState('HYD classroom');
    const [batchTiming, setBatchTiming] = useState('7-8 AM');
    // const [nextFollowUp, setNextFollowUp] = useState('2024-09-08');
    // const [description, setDescription] = useState('');

    

    const handleSubmit = (e) => {
        e.preventDefault();
        // const date = new Date();
        const leadData = {
            // date: createdAt,
            leadname,
            phone : "+91 " + phone,
            email,
            leadstatus,
            course,
            leadsource,
            // stack,
            feeQuoted,
            // classMode,
            batchTiming,
            // nextFollowUp,
            // Description: description
        };
        onSubmit(leadData); // Pass data back to parent component
    };

    return (
        <form className="w-full" onSubmit={handleSubmit}>
            <div className="w-full mt-1 border bg-[#F5EFFF] mx-auto p-3">
                <div className="grid grid-cols-2 gap-x-5">
                    <div className="">
                        <label className="ml-2 text-[#B9D1E5] text-lg">Name</label><br />
                        <input type="text" placeholder="Name" className="border-b-2 border-b-[#A594F9] p-1 mb-2 w-full outline-none rounded" value={leadname} onChange={(e) => setLeadName(e.target.value)} />
                    </div>
                    <div>
                        <label className="ml-2 text-[#B9D1E5] text-lg">Lead Status</label><br />
                        <select className="border-b-2 border-b-[#A594F9] p-1 mt-1 w-full outline-none rounded" value={leadstatus} onChange={(e) => setLeadStatus(e.target.value)}>
                            <option value="Not Contacted">Not Contacted</option>
                            <option value="Attempted">Attempted</option>
                            <option value="Warm Lead">Warm Lead</option>
                            <option value="Cold Lead">Cold Lead</option>
                        </select>
                    </div>
                    <div>
                        <label className="ml-2 text-[#B9D1E5] text-md">CC</label>
                        <p className="p-1 border-b-2 border-b-[#A594F9] mt-1 rounded">+ 91 </p>
                    </div>
                    <div>
                        <label className="ml-2 text-[#B9D1E5] text-lg" >Phone</label><br />
                        <input type="text" placeholder="Phone" className="border-b-2 border-b-[#A594F9] p-1 mb-2 w-full outline-none rounded" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div>
                        <label className="ml-2 text-[#B9D1E5] text-lg">Lead Source</label><br />
                        <select className="border-b-2 border-b-[#A594F9] p-1 w-full mt-1 outline-none rounded" value={leadsource} onChange={(e) => setLeadSource(e.target.value)}>
                            <option value="None">None</option>
                            <option value="Walk in">Walk in</option>
                            <option value="Student Referral">Student Referral</option>
                            <option value="Demo">Demo</option>
                            <option value="Website">Website</option>
                            <option value="Website Chat">Website Chat</option>
                            <option value="Inbound Call">Inbound Call</option>
                            <option value="Google Adverts">Google Adverts</option>
                            <option value="Facebook Ads">Facebook Ads</option>
                            <option value="Google Business">Google Business</option>
                            <option value="WhatsApp Skill Capital">WhatsApp Skill Capital</option>
                        </select>
                    </div>
                    <div>
                        <label className="ml-2 text-[#B9D1E5] text-lg">Email</label><br />
                        <input type="text" placeholder="Email" className="border-b-2 border-b-[#A594F9] p-1 mb-2 w-full outline-none rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    {/* <div>
                        <label className="ml-2 text-[#B9D1E5] text-lg">Select Stack</label><br />
                        <select className="border-b-2 border-b-[#A594F9] p-1 w-full mt-1 outline-none rounded" value={stack} onChange={(e) => setStack(e.target.value)}>
                            <option value="Life Skill">Life Skill</option>
                            <option value="Study Abroad">Study Abroad</option>
                            <option value="HR">HR</option>
                        </select>
                    </div> */}
                    <div>
                        <label className="ml-2 text-[#B9D1E5] text-lg">Course</label><br />
                        {/* <input type="text" placeholder="Course" className="border-b-2 p-1 mb-2 w-full outline-none" value={course} onChange={(e) => setCourse(e.target.value)} /> */}
                        <select className="border-b-2 border-b-[#A594F9] p-1 mb-2 w-full rounded" value={course} onChange={(e) => setCourse(e.target.value)}>
                            <option>Select Course</option>
                            <option>HR Business Partner</option>
                            <option>HR Generalist</option>
                            <option>HR Analytics</option>
                            <option>Spoken English</option>
                            <option>Public Speaking</option>
                            <option>Communication Skills</option>
                            <option>Soft Skills</option>
                            <option>Aptitude</option>
                            <option>IELTS</option>
                            <option>TOFEL</option>
                            <option>GRE</option>
                            <option>JFS</option>
                            <option>PFS</option>
                            <option>MERN</option>
                            <option>AWS + Devops</option>
                            <option>Azure + Devops</option>
                            <option>Devops</option>
                            <option>Devops</option>
                        </select>
                    </div>
                    <div>
                        <label className="ml-2 text-[#B9D1E5] text-lg">Fee Quoted</label><br />
                        <input type="number" placeholder="Fee" className="border-b-2 border-b-[#A594F9] p-1 mb-2 w-full outline-none rounded" value={ feeQuoted} onChange={(e) => setFeeQuoted(e.target.value)} />
                    </div>
                    {/* <div>
                        <label className="ml-2 text-[#B9D1E5] text-lg">Class Mode</label><br />
                        <select className="border-b-2 border-b-[#A594F9] p-1 w-full mt-1 outline-none rounded" value={classMode} onChange={(e) => setClassMode(e.target.value)}>
                            <option value="International Online">International Online</option>
                            <option value="India Online">India Online</option>
                            <option value="BLR classroom">BLR classroom</option>
                            <option value="HYD classroom">HYD classroom</option>
                        </select>
                    </div> */}
                    <div>
                        <label className="ml-2 text-[#B9D1E5] text-lg">Batch Timing</label><br />
                        <select className="border-b-2 border-b-[#A594F9] p-1 w-full mt-1 outline-none rounded" value={batchTiming} onChange={(e) => setBatchTiming(e.target.value)}>
                            <option value="7-8 AM">7-8 AM</option>
                            <option value="8-9 AM">8-9 AM</option>
                            <option value="9-10 AM">9-10 AM</option>
                            <option value="10-11 AM">10-11 AM</option>
                            <option value="11-12 AM">11-12 AM</option>
                            <option value="12-01 PM">12-01 AM</option>
                            <option value="01-02 PM">01-02 PM</option>
                            <option value="02-03 PM">02-03 PM</option>
                            <option value="03-04 PM">03-04 PM</option>
                            <option value="04-05 PM">04-05 PM</option>
                            <option value="05-06 PM">05-06 PM</option>
                            <option value="06-07 PM">06-07 PM</option>
                            <option value="07-08 PM">07-08 PM</option>
                            <option value="08-09 PM">08-09 PM</option>
                        </select>                   
                         </div>
                    {/* <div>
                        <label className="ml-1 text-[#B9D1E5] text-lg">Next FollowUp</label><br />
                        <input type="datetime-local" placeholder="Next FollowUp" className="border-b-2 border-b-[#A594F9] rounded p-1 mb-1 w-full outline-none" value={nextFollowUp} onChange={(e) => setNextFollowUp(e.target.value)} />
                    </div> */}
                </div>
                {/* <div className="w-full p-1">
                    <label className="text-[#ACC9E1]">Description</label> <br/>
                    <input className="border-b-2 border-b-[#A594F9] w-full outline-none p-4 rounded" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div> */}
                <div className="w-1/2 p-1 mt-4 mx-auto flex gap-x-2">
                    <button type="submit" className="w-1/2 bg-[#A594F9] text-white p-2 rounded">Submit</button>
                    <button className="w-1/2 border-2 border-b-[#A594F9] p-2 bg-[#E5D9F2] border-[#A594F9] rounded" onClick={closeForm}>Cancel</button>
                </div>
            </div>
        </form>
    )
}
