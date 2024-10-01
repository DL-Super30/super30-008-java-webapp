'use client'

import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

const courseOptions = [
    { value: 'HR Business Partner', label: 'HR Business Partner' },
    { value: 'HR Generalist', label: 'HR Generalist' },
    { value: 'HR Analytics', label: 'HR Analytics' },
    { value: 'Spoken English', label: 'Spoken English' },
    { value: 'Public Speaking', label: 'Public Speaking' },
    { value: 'Communication Skills', label: 'Communication Skills' },
    { value: 'Soft Skills', label: 'Soft Skills' },
    { value: 'Aptitude', label: 'Aptitude' },
    { value: 'IELTS', label: 'IELTS' },
    { value: 'TOFEL', label: 'TOFEL' },
    { value: 'GRE', label: 'GRE' },
    { value: 'JFS', label: 'JFS' },
    { value: 'PFS', label: 'PFS' },
    { value: 'MERN', label: 'MERN' },
    { value: 'AWS + Devops', label: 'AWS + Devops' },
    { value: 'Azure + Devops', label: 'Azure + Devops' },
    { value: 'Devops', label: 'Devops' },
];

export default function CreateLead({ closeForm }) {
    const [leadname, setLeadName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [leadStatus, setLeadStatus] = useState('Not Contacted');
    const [leadSource, setLeadSource] = useState('Website');
    const [feeQuoted, setFeeQuoted] = useState('');
    const [batchTiming, setBatchTiming] = useState('7-8 AM');
    const [selectedClassMode, setSelectedClassMode] = useState("HYD class");
    const [selectedCourses, setSelectedCourses] = useState([]);
    const ApiUrl = process.env.NEXT_PUBLIC_API_URL;


    const handleCourseChange = (selectedOptions) => {
        setSelectedCourses(selectedOptions);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const formData = {
                leadname,
                email,
                phone : "+ 91 " + phone,
                feeQuoted,
                batchTiming,
                leadStatus,
                leadSource,
                course: selectedCourses.map(course => ({ name: course.value })),
                selectedClassMode
            };

            console.log("Submitting data:", formData);

            const response = await axios.post(`${ApiUrl}/api/leads`, formData);
            console.log("Successfully submitted:", response.data);
            toast.success('Lead Created Successfully!', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
            setTimeout(() => {
                closeForm(); 
                window.location.reload()
            }, 1500);
        } catch (error) {
            console.error("Error submitting data:", error.response?.data || error.message);
            toast.error(`Failed to create Lead: ${error.response?.data?.error || error.message}`, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
        }
    };

    return (
        <div className="w-full h-[100vh] absolute top-[0] left-[0] bg-black bg-opacity-70 pt-[50px]">
            <ToastContainer />
            <div className="w-3/4 mx-auto pt-[75px]">
                <div className="flex justify-between items-center border-b p-1 bg-[#CDC1FF] rounded-t-md">
                    <div className="flex items-center gap-x-5">
                        <span><FontAwesomeIcon icon={faAddressCard} className="bg-[#A594F9] text-xl text-white p-2 rounded" /></span>
                        <h1 className="text-2xl font-semibold">Create Lead</h1>
                    </div>
                    <button onClick={closeForm}><FontAwesomeIcon icon={faXmark} className="text-2xl text-gray-500 p-2 rounded" /></button>
                </div>
                <div className="mt-[-4px] ">
                    <form className="w-full" onSubmit={handleFormSubmit}>
                        <div className="w-full mt-1 border bg-[#F5EFFF] mx-auto p-3">
                            <div className="grid grid-cols-2 gap-x-5">
                                <div>
                                    <label className="ml-2 text-[#B9D1E5] text-lg">Name</label><br />
                                    <input type="text" placeholder="Name" className="border-b-2 border-b-[#A594F9] p-1 mb-2 w-full outline-none rounded" value={leadname} onChange={(e) => setLeadName(e.target.value)} required />
                                </div>
                                <div>
                                    <label className="ml-2 text-[#B9D1E5] text-lg">Lead Status</label><br />
                                    <select className="border-b-2 border-b-[#A594F9] p-1 mt-1 w-full outline-none rounded" value={leadStatus} onChange={(e) => setLeadStatus(e.target.value)}>
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
                                    <label className="ml-2 text-[#B9D1E5] text-lg">Phone</label><br />
                                    <input type="text" placeholder="Phone" className="border-b-2 border-b-[#A594F9] p-1 mb-2 w-full outline-none rounded" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value)} required />
                                </div>
                                <div>
                                    <label className="ml-2 text-[#B9D1E5] text-lg">Lead Source</label><br />
                                    <select className="border-b-2 border-b-[#A594F9] p-1 w-full mt-1 outline-none rounded" value={leadSource} onChange={(e) => setLeadSource(e.target.value)}>
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
                                    <input type="email" placeholder="Email" className="border-b-2 border-b-[#A594F9] p-1 mb-2 w-full outline-none rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div>
                                    <label className="ml-2 text-[#B9D1E5] text-lg">Course</label><br />
                                    <Select 
                                        options={courseOptions}
                                        value={selectedCourses}
                                        onChange={handleCourseChange}
                                        isMulti={true}
                                        className="basic-multi-select "
                                        classNamePrefix="select"
                                    />
                                </div>
                                <div>
                                    <label className="ml-2 text-[#B9D1E5] text-lg">Fee Quoted</label><br />
                                    <input type="number" placeholder="Fee" className="border-b-2 border-b-[#A594F9] p-1 mb-2 w-full outline-none rounded" value={feeQuoted} onChange={(e) => setFeeQuoted(e.target.value)} required />
                                </div>
                                <div>
                                    <label className="ml-2 text-[#B9D1E5] text-lg">Batch Timing</label><br />
                                    <select className="border-b-2 border-b-[#A594F9] p-1 w-full mt-1 outline-none rounded" value={batchTiming} onChange={(e) => setBatchTiming(e.target.value)}>
                                        <option value="7-8 AM">7-8 AM</option>
                                        <option value="8-9 AM">8-9 AM</option>
                                        <option value="9-10 AM">9-10 AM</option>
                                        <option value="10-11 AM">10-11 AM</option>
                                        <option value="11-12 AM">11-12 AM</option>
                                        <option value="12-01 PM">12-01 PM</option>
                                        <option value="01-02 PM">01-02 PM</option>
                                        <option value="02-03 PM">02-03 PM</option>
                                        <option value="03-04 PM">03-04 PM</option>
                                        <option value="04-05 PM">04-05 PM</option>
                                        <option value="05-06 PM">05-06 PM</option>
                                        <option value="06-07 PM">06-07 PM</option>
                                        <option value="07-08 PM">07-08 PM</option>
                                        <option value="08-09 PM">08-09 PM</option>
                                        <option value="09-10 PM">09-10 PM</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="ml-2 text-[#B9D1E5] text-lg">Class Mode</label><br />
                                    <select className="border-b-2 border-b-[#A594F9] p-1 w-full mt-1 outline-none rounded" value={selectedClassMode} onChange={(e) => setSelectedClassMode(e.target.value)}>
                                        <option value="HYD class">HYD class</option>
                                        <option value="Online">Online</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="mx-auto p-3 border w-full mt-4 bg-[#A594F9] text-white font-semibold text-lg">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}