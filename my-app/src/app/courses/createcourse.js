'use client';
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Createcourse(props) {
    const { setShowCreateCourse } = props;

    const [coursename, setCourseName] = useState("");
    const [coursefee, setCourseFee] = useState("");
    const [description, setDescription] = useState("");
    const [coursebrochure, setCourseBrochure] = useState("");

    
    
        
        const courseCreation = async() => {
        try {
                if (!coursename || !coursefee  || !coursebrochure) {
                    toast.error('All fields must be filled out before submitting!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
            }

            else {
            const response = await axios.post("http://localhost:3001/coursedata", data);
            console.log(response);
            toast.success('Created course!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }) 
            setTimeout(() => {
                setShowCreateLearner(false)
                window.location.reload()
            }, 1500);
        }

        } 
        catch (err) {
            console.log(err);
            toast.error('Failed to create course!', {
                position: "top-right",
                autoClose: 5000,
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
        <div className="w-full h-[100vh] border-2 absolute top-0 left-0 bg-black bg-opacity-50">
            <ToastContainer />
            <div className="w-3/5 h-3/4 rounded-lg border-2 ml-[20%] mt-[50px] p-5 bg-white">
                <div className="flex justify-between">
                    <div className="flex">
                        <p><FontAwesomeIcon icon={faAddressCard} className="mr-2 text-blue-500 p-2 text-4xl" /></p>
                        <h1 className="text-2xl mt-3">Create Course</h1>
                    </div>
                    <button>
                        <FontAwesomeIcon icon={faXmark} className="mr-2 text-gray-300 p-2 text-2xl" onClick={() => setShowCreateCourse(false)} />
                    </button>
                </div>
                <h1 className="text-2xl p-2">Course Image</h1>
                <h1 className="text-2xl p-2">Edit</h1>
                <h1 className="text-2xl p-2">Course Information</h1>

                <div className="grid grid-cols-2 gap-x-10">
                    <div className="w-full p-2 mt-6 border-b-2">
                        <h1 className="text-xl">Course Name<span className="text-red-400">*</span></h1>
                        <input
                            placeholder="Course Name"
                            className="text-xl"
                            value={coursename}
                            onChange={(e) => setCourseName(e.target.value)}
                        />
                    </div>
                    <div className="w-full p-2 mt-6 border-b-2">
                        <h1 className="text-xl">Course Fee<span className="text-red-400">*</span></h1>
                        <input
                            placeholder="Course Fee"
                            className="text-xl"
                            value={coursefee}
                            onChange={(e) => setCourseFee(e.target.value)}
                        />
                    </div>
                    <div className="w-full p-2 mt-6 border-b-2">
                        <h1 className="text-xl">Description</h1>
                        <input
                            placeholder="Description"
                            className="text-xl"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="w-full p-2 mt-6 border-b-2">
                        <h1 className="text-xl">Course Brochure<span className="text-red-400">*</span></h1>
                        <input
                            placeholder="Course Brochure"
                            className="text-xl"
                            value={coursebrochure}
                            onChange={(e) => setCourseBrochure(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex mt-12 gap-x-4">
                    <button
                        className="ml-[33%] w-[15%] p-2 border border-blue-500 rounded-lg text-center text-blue-500"
                        onClick={() => setShowCreateCourse(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="ml-[20px] w-[15%] p-2 border border-blue-500 bg-blue-500 rounded-lg text-center text-white"
                        onClick={courseCreation}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}
