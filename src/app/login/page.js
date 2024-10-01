"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";

export default function Login() {
  const { register, handleSubmit, formState: { errors }, setError, setValue } = useForm();
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  // Check if credentials are stored in localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (storedUsername && storedPassword) {
      setValue('username', storedUsername);
      setValue('password', storedPassword);
      setRememberMe(true); // Automatically check the box if credentials are stored
    }
  }, [setValue]);

  const ApiUrl = process.env.NEXT_PUBLIC_API_URL;


  // Handle form submission
  const onSubmit = async (data) => {
    const { username, password } = data;

    try {
      const response = await axios.post(`${ApiUrl}/api/users/login`, {
        username,
        password
      });

      console.log('Token:', response.data.token);
      if (response.data.token) {
        toast.success('Login Success!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        // Store credentials if "Remember Me" is checked
        if (rememberMe) {
          localStorage.setItem('username', username);
          localStorage.setItem('password', password);
        } else {
          localStorage.removeItem('username');
          localStorage.removeItem('password');
        }

        // Redirect to dashboard after a short delay
        setTimeout(() => {
          router.push('/dashboard');
        }, 3000);
      } else {
        toast.error('Invalid Credentials', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error('Login failed. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  // const handleKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     handleSubmit(onSubmit);
  //   }
  // };

  return (
    <div className="flex-col md:flex-row flex w-full h-[100vh] md:relative">
      <div className="w-full md:w-1/2 p-0 md:p-5 bg-white">
        <div className="w-[68%] h-[80vh] mt-[60px] mx-auto">
          <div>
            <img className="mx-auto" src="https://crm.skillcapital.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fskillcapital.41121682.png&w=640&q=75" alt="Logo" />
          </div>
          <div>
            <form className="login-form w-full rounded border-black h-[460px] mt-8 p-5" onSubmit={handleSubmit(onSubmit)}>
              <label className="text-sm">User Name</label>
              <input
                type="text"
                className="w-full border outline-none p-3 rounded"
                {...register('username', { required: "Username is required" })}
                // onKeyDown={handleKeyPress}
              />
              {errors.username && <p className="text-red-500">Please Enter Username</p>}

              <label className="text-sm">Password</label>
              <input
                type="password"
                className="w-full border outline-none p-3 rounded"
                {...register('password', { required: "Password is required" })}
                // onKeyDown={handleKeyPress}
              />
              {errors.password && <p className="text-red-500">Please Enter Password</p>}

              <button className="w-full p-2 rounded-lg text-white font-bold login-btn justify-center flex mt-8 border">
                Login
              </button>

              <input
                type="checkbox"
                className="scale-150 mt-8"
                checked={rememberMe}
                onChange={handleRememberMe}
              /> <span className="text-sm align-center ml-2">Remember me</span>

              <p className="mt-[90px] text-center opacity-50">©2024, All rights reserved</p>
            </form>
          </div>
        </div>
      </div>
      <div className="invisible md:visible w-0 md:w-1/2 bg-white">
        <div>
          <h1 className="text-3xl text-center text-[#042d60] font-bold mt-8"> Seamlessly manage all learner data in a <br /> unified platform. </h1>
          <p className="text-md text-center text-[#042d60] px-5 mt-5"> Centralize customer data effortlessly. Streamline communication, sales, and support for seamless growth. </p>
        </div>
        <div className="bg-[url('/images/loginsvg.svg')] bg-cover bg-center w-full h-[75vh]"></div>
      </div>
      <ToastContainer />
    </div>
  );
}
