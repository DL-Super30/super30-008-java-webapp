"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp(props) {
  const router = useRouter();

  const [leadname, setLeadName] = useState('');   
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
            
  
  const { handleClose, setShowSignUp } = props;

  // const ApiUrl = process.env.NEXT_PUBLIC_API_URL;


  const handleSubmit = async (e) => {
    e.preventDefault(); 
  
    // Check if required fields are filled
    if (!leadname || !phone || !email) {
      toast.error('Please enter Required Fields!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return; 
    }
  
    try {
      // Create data object with only required fields
      const data = {
        leadname: leadname,
        phone: "+91" + phone,
        email: email,
        feeQuoted: "20000",         // Empty value
        batchTiming: "",       // Empty value
        leadStatus: "Not Contacted",        // Empty value
        leadSource: "",        // Empty value
        course: [{"name":"HR Generalist"}],            // Empty value
        selectedClassMode: ""  // Empty value
      };
  
      await axios.post(`http://localhost:4000/api/leads`, data); // Post data to the server
  
      toast.success('Registered Successfully!', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  
      setTimeout(() => {
        setShowSignUp(false);
      }, 3000);
    } 
    catch (error) {
      console.error("Error submitting data:", error);
      toast.error('Failed to signup!', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  

  return (
    <div>
      <div className="absolute top-0 left-0 w-full bg-[#333333] bg-opacity-75 h-[100vh] pt-[150px]">
        <div className="w-4/5 md:w-1/4 h-auto bg-white mx-auto rounded-lg border">
          <div className="w-full h-16 bg-[#E4244B] p-4 flex justify-between items-center rounded">
            <h1 className="text-3xl text-white">Start Now</h1>
            <button>
              <FontAwesomeIcon
                icon={faXmark}
                className="text-3xl text-white"
                onClick={handleClose}
              />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-5">
            <label>Lead Name *</label>
            <input
              type="text"
              className="w-full p-2 border mb-3 bg-[#F5F8FA] outline-none"
              placeholder="Lead Name"
              value={leadname}
              onChange={(e) => setLeadName(e.target.value)}
            />
            <label>Phone *</label>
            <div className="flex mb-3">
              <input className="w-1/5 text-sm md:text-md border p-2 pl-5 bg-[#E9ECEF] outline-none" type="text" value={91} readOnly />
              <input
                type="text"
                className="w-4/5 p-2 border bg-[#F5F8FA] outline-none"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={10}
              />
            </div>
            <label>Email *</label>
            <input
              type="email"
              className="w-full border p-2 rounded bg-[#F5F8FA] outline-none"
              placeholder="Email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* <label>Fee Quoted</label>
            <input
              type="number"
              className="w-full border p-2 rounded bg-[#F5F8FA] outline-none"
              placeholder="Fee Quoted"
              value={feeQuoted}
              onChange={(e) => setFeeQuoted(e.target.value)}
            />
            <label>Batch Timing</label>
            <input
              type="text"
              className="w-full border p-2 rounded bg-[#F5F8FA] outline-none"
              placeholder="Batch Timing"
              value={batchTiming}
              onChange={(e) => setBatchTiming(e.target.value)}
            />
            <label>Lead Status</label>
            <input
              type="text"
              className="w-full border p-2 rounded bg-[#F5F8FA] outline-none"
              placeholder="Lead Status"
              value={leadStatus}
              onChange={(e) => setLeadStatus(e.target.value)}
            />
            <label>Lead Source</label>
            <input
              type="text"
              className="w-full border p-2 rounded bg-[#F5F8FA] outline-none"
              placeholder="Lead Source"
              value={leadSource}
              onChange={(e) => setLeadSource(e.target.value)}
            />
            <label>Course</label>
            <input
              type="text"
              className="w-full border p-2 rounded bg-[#F5F8FA] outline-none"
              placeholder="Course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
            <label>Class Mode</label>
            <input
              type="text"
              className="w-full border p-2 rounded bg-[#F5F8FA] outline-none"
              placeholder="Class Mode"
              value={selectedClassMode}
              onChange={(e) => setSelectedClassMode(e.target.value)}
            /> */}
            <button
              type="submit"
              className="w-full border bg-[#E4244B] p-3 mt-3 rounded text-white"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
