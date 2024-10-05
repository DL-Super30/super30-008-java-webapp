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
                phone: "+ 91 " + phone,
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
        <div className="w-full h-[100vh] absolute top-0 left-0 bg-black bg-opacity-70 flex justify-center items-start pt-[100px]">
            <ToastContainer />
            <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex justify-between items-center p-4 bg-purple-200 border-b">
                    <div className="flex items-center space-x-3">
                        <FontAwesomeIcon icon={faAddressCard} className="bg-purple-500 text-white text-2xl p-2 rounded-full" />
                        <h1 className="text-2xl font-semibold text-gray-800">Create Lead</h1>
                    </div>
                    <button onClick={closeForm}>
                        <FontAwesomeIcon icon={faXmark} className="text-2xl text-gray-600 hover:text-gray-800 transition" />
                    </button>
                </div>
                <div className="px-6 py-4 bg-gray-50">
                    <form onSubmit={handleFormSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Name <span className="text-red-400">*</span></label>
                                <input 
                                    type="text" 
                                    className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm outline-none border border-b-2 border-b-purple-500" 
                                    value={leadname} 
                                    onChange={(e) => setLeadName(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Lead Status</label>
                                <select 
                                    className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm outline-none border border-b-2 border-b-purple-500" 
                                    value={leadStatus} 
                                    onChange={(e) => setLeadStatus(e.target.value)}
                                >
                                    <option value="Not Contacted">Not Contacted</option>
                                    <option value="Attempted">Attempted</option>
                                    <option value="Warm Lead">Warm Lead</option>
                                    <option value="Cold Lead">Cold Lead</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Phone<span className="text-red-400">*</span></label>
                                <input 
                                    type="text" 
                                    maxLength={10} 
                                    className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm outline-none border border-b-2 border-b-purple-500" 
                                    value={phone} 
                                    onChange={(e) => setPhone(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Email<span className="text-red-400">*</span></label>
                                <input 
                                    type="email" 
                                    className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm outline-none border border-b-2 border-b-purple-500" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Lead Source</label>
                                <select 
                                    className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm outline-none border border-b-2 border-b-purple-500" 
                                    value={leadSource} 
                                    onChange={(e) => setLeadSource(e.target.value)}
                                >
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
                                <label className="block text-sm font-medium text-gray-600">Course</label>
                                <Select 
                                    options={courseOptions}
                                    value={selectedCourses}
                                    onChange={handleCourseChange}
                                    isMulti={true}
                                    className="mt-1"
                                    classNamePrefix="select"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Fee Quoted<span className="text-red-400">*</span></label>
                                <input 
                                    type="number" 
                                    className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm outline-none border border-b-2 border-b-purple-500" 
                                    value={feeQuoted} 
                                    onChange={(e) => setFeeQuoted(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Batch Timing</label>
                                <select 
                                    className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm outline-none border border-b-2 border-b-purple-500" 
                                    value={batchTiming} 
                                    onChange={(e) => setBatchTiming(e.target.value)}
                                >
                                    <option value="7-8 AM">7-8 AM</option>
                                    <option value="9-10 AM">9-10 AM</option>
                                    <option value="11-12 AM">11-12 AM</option>
                                    <option value="6-7 PM">6-7 PM</option>
                                    <option value="8-9 PM">8-9 PM</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Class Mode</label>
                                <select 
                                    className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm outline-none border border-b-2 border-b-purple-500" 
                                    value={selectedClassMode} 
                                    onChange={(e) => setSelectedClassMode(e.target.value)}
                                >
                                    <option value="HYD class">HYD class</option>
                                    <option value="HYD Online">HYD Online</option>
                                    <option value="BLR class">BLR class</option>
                                    <option value="BLR Online">BLR Online</option>
                                    <option value="Vizag class">Vizag class</option>
                                    <option value="Vizag Online">Vizag Online</option>
                                    <option value="USA Online">USA Online</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button 
                                type="submit" 
                                className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition focus:outline-none"
                            >
                                Create Lead
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

