'use client'

import React,{useState} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAddressCard,faPenFancy, faXmark} from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";

export default function CreateCourse(props){
    
    const {setShowCreateCourse} = props;

    return (
        <div className="absolute top-0 left-0 w-full pt-[100px] h-[100vh] bg-black bg-opacity-50">
            <div className="w-3/5 h-[70vh] border-2 bg-white mx-auto rounded-lg p-4">
                <div className="flex gap-x-3 text-xl items-center w-full border-b pb-2 justify-between">
                    <div className="flex items-center gap-x-4">
                        <p><FontAwesomeIcon icon={faAddressCard} className="text-2xl bg-blue-400 text-white p-2 rounded" /></p>
                        <p>Create Course</p>
                    </div>
                    <button type="file"><FontAwesomeIcon icon={faXmark} onClick={() => setShowCreateCourse(false)}/></button>
                </div>
                <div className="mt-2">
                    <p className="text-xl">Course Image</p>
                    <p className="mt-3"><FontAwesomeIcon icon={faUserCircle} className="text-7xl opacity-50"/> <span className="cursor-pointer border-b-2"><FontAwesomeIcon icon={faPenFancy} /> Edit</span></p>
                    <p className="mt-2 text-xl">Course Information</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 border-b-2 pb-12">
                    <div >
                        <p>Course Name</p>
                        <input type="text" placeholder="Course Name" className="p-1 border-b-2  w-full outline-none"></input>
                    </div>
                    <div>
                        <p>Course Fee</p>
                        <input type="text" placeholder="Course Fee" className="p-1 border-b-2 w-full outline-none"></input>
                    </div>
                    <div>
                        <p>Description</p>
                        <input type="text" placeholder="Description" className="p-1 border-b-2 w-full outline-none"></input>
                    </div>
                    <div>
                        <p>Course Brochure</p>
                        <input type="file"  placeholder="Course Brochure" className="p-1 border-b-2 w-full outline-none"></input>
                    </div>
                </div>
                <div className="flex gap-x-2 justify-center mt-3">
                    <button className="w-40 p-2 border-2" onClick={() => setShowCreateCourse(false)}>Cancel</button>
                    <button className="w-40 p-2 bg-blue-400 text-white" >Create</button>
                </div>
            </div>
        </div>
    )
}