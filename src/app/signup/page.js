"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faChevronDown, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp(props) {
  const router = useRouter();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [ status,setStatus ] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  

  const { handleClose,setShowSignUp } = props;

  useEffect(() => {
    const time = new Date();
    
    setDate(time); 
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    
    if (!name || !phone || !email) {
      // setShowError(true);
      // setShowSuccess(false);
      // setTimeout(() => {
      //   setShowError(false);
      
      //   }, 2000);
      toast.error('please enter Required Fields !', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
        });
      
    
      return; 
    }
    

    
    const data = {
      date: date,
      name: name,
      phone:"+91 "+ phone,
      email: email,
      status:"Not Contacted",
      course : "-",
      source : "None",
      stack :"-",
      fee : "20000",
      classMode : "HYD classroom",
      batchTimings : "7-8 AM",
      nextFollowUp : "2024-9-8",
      Description : "nothing here",
      visitStatus : 'visited'
    };

    try {
      const response = await axios.post("http://localhost:3001/signUpData", data);
      console.log("Successfully submitted:", response.data);
      
      setName('');
      setPhone('');
      setEmail('');
      setDate('')
      setStatus('')
      

      // Show success message
      // setShowSuccess(true);
      // setShowError(false);
      toast.success('Registerd Succesfully !', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
        });

      setTimeout(() => {
        setShowSignUp(false)
      }, 3000);
    } 
    catch (error) {
      console.error("Error submitting data:", error);
      
    
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div>
      <div className="absolute top-0 left-0 w-full bg-[#333333] bg-opacity-75 h-[100vh] pt-[150px]">
        <div className="w-4/5 md:w-1/4 h-[400px] bg-white mx-auto rounded-lg border">
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
            <label>Name *</label>
            <input
              type="text"
              className="w-full p-2 border mb-3 bg-[#F5F8FA] outline-none"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <label>Phone *</label>
            <div className="flex mb-3">
              <input className="w-1/5 text-sm md:text-md border p-2 pl-5 bg-[#E9ECEF] outline-none" type="text" value={91} />
              <input
                type="text"
                className="w-4/5 p-2 border bg-[#F5F8FA] outline-none"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onKeyDown={handleKeyPress}
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
              onKeyDown={handleKeyPress}
            />
            <button
              type="submit"
              className="w-full border bg-[#E4244B] p-3 mt-3 rounded text-white"
            >
              Submit
            </button>
          </form>
        </div>

       
        {showSuccess && (
          <div className="absolute top-[5%] shadow-lg shadow-slate-500 right-[2%] w-1/5 rounded h-24 bg-[#F4F6FA] border-b-8 border-[#1B96FF]">
          <h1 className="text-center mt-2">
            <FontAwesomeIcon icon={faCheckCircle} className="text-3xl text-green-500" />
          </h1>
          <h1 className="text-2xl text-center mt-1">Registered Successfully!!</h1>
          
        </div>
        )}
        
        {showError && (
          <div className="absolute top-[5%] shadow-lg shadow-slate-500 right-[2%] w-1/5 rounded h-24 bg-[#F4F6FA] border-b-8 border-[#E1264C]">
            <h1 className="text-center ">
              <FontAwesomeIcon icon={faXmark} className="text-3xl text-red-500 mt-1" />
            </h1>
            <h1 className="text-2xl text-center mt-2">Please enter details!!</h1>
          </div>
        )}  
      </div>
      <ToastContainer />
    </div>
  );
}
