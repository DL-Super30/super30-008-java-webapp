'use client'

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faAddressCard, faPhone } from "@fortawesome/free-solid-svg-icons";

export default function UpdateLead(props) {
    const { hideUpdateScreen, updateData } = props;

    // Create a local state to store the form data
    const [formData, setFormData] = useState({
        name: updateData.name || "",
        status: updateData.status || "",
        phone: updateData.phone || "",
        email: updateData.email || "",
        source: updateData.source || "",
        // Add other fields as necessary, based on updateData structure
    });

    // Handle changes in form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="w-full h-[100vh] p-3 absolute top-[0] left-[0] bg-black bg-opacity-50">
            <div className="w-4/5 mx-auto">
                <div className="w-full h-16 mt-14 bg-white flex justify-between items-center">
                    <div className="p-2 ml-5 items-center flex gap-x-3">
                        <button className="text-lg" onClick={hideUpdateScreen}>
                            <FontAwesomeIcon icon={faChevronLeft} className="mr-1" /> Back
                        </button>
                        <div className="flex items-center gap-x-2">
                            <p className="items-center">
                                <FontAwesomeIcon icon={faAddressCard} className="p-2 bg-[#1998FF] text-white text-xl rounded" />
                            </p>
                            <p className="text-xl font-semibold">{formData.name}</p>
                        </div>
                    </div>
                    <button className="w-20 h-10 bg-[#1998FF] rounded text-white mr-5">Convert</button>
                </div>

                <div className="w-full bg-white flex gap-x-2 h-14 border-2 items-center">
                    <div className="w-1/4 p-3">
                        <h1>Lead Source</h1>
                        <p className="text-[#1998FF] font-semibold">{formData.source}</p>
                    </div>
                    <div className="w-1/4 p-3">
                        <h1>Phone</h1>
                        <p className="text-[#1998FF] font-semibold">
                            <FontAwesomeIcon icon={faPhone} className="text-sm me-2" />
                            <span>{formData.phone}</span>
                        </p>
                    </div>
                    <div className="w-1/4 p-3">
                        <h1>Email</h1>
                        <p className="text-[#1998FF] font-semibold">{formData.email}</p>
                    </div>
                    <div className="w-1/4 p-3">
                        <h1>Lead Status</h1>
                        <p className={`font-semibold ${formData.status === 'Not Contacted' ? 'text-orange-500' : formData.status === 'Attempted' ? 'text-green-500' : formData.status === 'Warm Lead' ? 'text-yellow-400' : formData.status === 'Cold Lead' ? 'text-red-500' : ''}`}>{formData.status}</p>
                    </div>
                </div>

                <div className="w-full h-[70vh] mt-0 bg-white">
                    <div className="w-full h-10 border-b-2 flex gap-x-5">
                        <button className="ml-12 border-b-2 border-[blue]">Details</button>
                        <button>Activity</button>
                        <button>Notes</button>
                        <button>Ask Ai</button>
                    </div>

                    <div className="w-full border bg-white mx-auto p-3">
                        <div className="grid grid-cols-2 gap-x-5">
                            <div>
                                <label className="ml-2 text-[#B9D1E5] text-lg">Name</label><br />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Name"
                                    className="border-b-2 p-1 mb-2 w-full outline-none"
                                />
                            </div>
                            <div>
                                <label className="ml-2 text-[#B9D1E5] text-lg">Lead Status</label><br />
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="border-b-2 p-1 mt-1 w-full outline-none"
                                >
                                    <option>Select Lead Status</option>
                                    <option>Not Contacted</option>
                                    <option>Attempted</option>
                                    <option>Warm Lead</option>
                                    <option>Cold Lead</option>
                                </select>
                            </div>
                            <div>
                                <label className="ml-2 text-[#B9D1E5] text-lg">Phone</label><br />
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="Phone"
                                    className="border-b-2 p-1 mb-2 w-full outline-none"
                                />
                            </div>
                            <div>
                                <label className="ml-2 text-[#B9D1E5] text-lg">Email</label><br />
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                    className="border-b-2 p-1 mb-2 w-full outline-none"
                                />
                            </div>
                            <div>
                                <label className="ml-2 text-[#B9D1E5] text-lg">Lead Source</label><br />
                                <select
                                    name="source"
                                    value={formData.source}
                                    onChange={handleInputChange}
                                    className="border-b-2 p-1 mt-1 w-full outline-none"
                                >
                                    <option>Select Lead Source</option>
                                    <option>None</option>
                                    <option>Walk in</option>
                                    <option>Student Refferal</option>
                                    <option>Demo</option>
                                    <option>Website</option>
                                    <option>Website Chat</option>
                                    <option>Inbound Call</option>
                                    <option>Google Adverts</option>
                                    <option>Facebook Ads</option>
                                    <option>Google Business</option>
                                    <option>WhatsApp Skill Capital</option>
                                </select>
                            </div>
                            {/* Add more input fields for additional data as needed */}
                        </div>
                        <div className="w-full p-1">
                            <label className="text-[#ACC9E1]">Description</label><br />
                            <input
                                name="description"
                                value={formData.description || ""}
                                onChange={handleInputChange}
                                className="border-b-2 w-full outline-none"
                                placeholder="Description"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
