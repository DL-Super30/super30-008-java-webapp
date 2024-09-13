'use client'

import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faXmark } from '@fortawesome/free-solid-svg-icons';
import LeadForm from "../leadform/page";
import axios from "axios";

export default function CreateLead({ closeForm }) {

    const handleFormSubmit = async (leadData) => {
        try {
           
            const response = await axios.post("http://localhost:3001/signUpData", leadData);
            console.log("Successfully submitted:", response.data);
            closeForm(); 
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    return (
        <div className="w-full h-[100vh] absolute top-[0] left-[0] bg-black bg-opacity-50">
            <div className="w-3/4 mx-auto pt-[75px]">
                <div className="flex justify-between items-center border-b p-1 bg-white rounded-t-md">
                    <div className="flex items-center gap-x-5">
                        <span><FontAwesomeIcon icon={faAddressCard} className="bg-[#1B96FF] text-xl text-white p-2 rounded" /></span>
                        <h1 className="text-2xl">Create Lead</h1>
                    </div>
                    <button onClick={closeForm}><FontAwesomeIcon icon={faXmark} className="text-2xl text-gray-500 p-2 rounded" /></button>
                </div>
                <div className="mt-[-4px]">
                    <LeadForm onSubmit={handleFormSubmit} closeForm={closeForm} />
                </div>
            </div>
        </div>
    )
}
