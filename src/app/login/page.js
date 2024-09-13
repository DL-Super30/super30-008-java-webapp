"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    
    axios.get("http://localhost:3001/logindata")
    .then(res => {
      setUsers(res.data)
      console.log(res.data)
    })
    
    .catch(err => console.log(err)) 
  };

  const validate = () => {
    const validUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (validUser) {
      setShowSuccess(true); 
      setShowError(false); 
      setUsername('');
      setPassword('');
      setTimeout(() => {
        router.push('/dashboard'); 
      }, 1000); 
    } else {
      setShowError(true);
      setShowSuccess(false); 
      setUsername('');
      setPassword('');
    }
  };

  const close = () => {
    setShowError(false);
    setShowSuccess(false); 
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      validate();
    }
  };

  return (
    <div className="flex-col md:flex-row flex w-full h-[100vh] md:relative">
      <div className="w-full md:w-1/2 p-0 md:p-5 bg-white">
        <div className="w-[68%] h-[80vh] mt-[60px] mx-auto">
          <div>
            <img className="mx-auto" src="https://crm.skillcapital.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fskillcapital.41121682.png&w=640&q=75" alt="Logo" />
          </div>
          <div className="login-form w-full rounded border-black h-[460px] mt-8 p-5">
            <label className="text-sm">User Name</label>
            <input type="text" required className="w-full border outline-none p-3 rounded mb-5" name="username" value={username} onChange={e => setUsername(e.target.value)} onKeyDown={handleKeyPress} // Handle Enter key press
            />
            <label className="text-sm">Password</label>
            <input type="password" required className="w-full border outline-none p-3 rounded" name="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={handleKeyPress} // Handle Enter key press
            />

            {username && password && (
              <button className="w-full p-2 rounded-lg text-white font-bold login-btn justify-center flex mt-8 border" onClick={validate}>Login</button>
            )}

            <input type="checkbox" className="scale-150 mt-8" /> <span className="text-sm align-center ml-2">Remember me</span>
            <p className="mt-[90px] text-center opacity-50">©2024, All rights reserved</p>
          </div>
        </div>
      </div>
      <div className="invisible md:visible w-0 md:w-1/2 bg-white">
        <div>
          <h1 className="text-3xl text-center text-[#042d60] font-bold mt-8"> Seamlessly manage all learner data in a <br /> unified platform. </h1>
          <p className="text-md text-center text-[#042d60] px-5 mt-5"> Centralize customer data effortlessly. Streamline communication, sales, and support for seamless growth. </p>
        </div>
        <div className="bg-[url('/images/loginpage.png')] bg-cover bg-center w-full h-[75vh]"></div>
      </div>

      {showError && (
        <div className="error-msg w-4/5 md:w-1/5 h-36 rounded-lg border bg-[#F4F6FA] absolute right-[40%]  top-[30%]  p-2 items-center shadow-xl border-b-8 border-b-[#E1264C]">
          <p className="text-2xl text-center"> <FontAwesomeIcon icon={faTriangleExclamation} className="text-[#E1264C]" /> </p>
          <p className="text-lg text-center mt-2"> Invalid Username or Password !! </p>
          <button className="w-1/2 text-white p-1 mt-2 rounded-lg mx-auto align-center flex justify-center bg-[#E1264C]" onClick={close}> Try Again </button>
        </div>
      )}



      {showSuccess && (
        <div className="success-msg w-4/5 md:w-1/5 h-80 rounded-lg border bg-[#F4F6FA] absolute left-[10%] md:left-[35%] top-[25%] md:top-[30%] p-4 pt-12 items-center shadow-xl">
          <p className="text-5xl text-center"> <FontAwesomeIcon icon={faCircleCheck} className="text-green-500" /> </p>
          <p className="text-2xl text-center mt-5"> Successfully Logged In !! </p>
          {/* <button className="w-1/2 text-white p-2 rounded-lg mx-auto align-center flex justify-center mt-12 bg-green-500" onClick={close}> OK </button> */}
        </div>
      )}

    </div>
  );
}
