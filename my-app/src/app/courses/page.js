'use client'

import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faAngleDown, faBell, faAnglesLeft, faAnglesRight, faCalendarDays, faChevronLeft, faChevronRight, faSquarePollVertical, faTable, faUser } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";
import Createcourse from "../createcourse/page";



export default function Opportunities() {

    const [records, setRecords] = useState([]);
    const [pages, setPages] = useState([]);
    const [pageDisplay, setPageDisplay] = useState(1);
    const [pageConfig, SetPageConfig] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [showCreateCourse,setShowCreateCourse] = useState(false);
    const [displayActions, setDisplayActions] = useState(false);

    const recordsPerPage = 10;

    useEffect(() => {
        fetchdata();
    }, [pageDisplay]);

    const fetchdata = async () => {
        try {
            const response = await fetch("http://localhost:3001/coursedata", { method: 'GET' });
            const result = await response.json();

            const totalPages = Math.ceil(result.length / recordsPerPage);
            const paginateRecords = result.slice(recordsPerPage * (pageDisplay - 1), recordsPerPage * pageDisplay);
            setRecords(paginateRecords);

            const tempArr = [];
            for (let i = 1; i <= totalPages; i++) {
                tempArr.push(i);
            }
            setPages(tempArr);

            SetPageConfig({
                isPrevious: pageDisplay > 1,
                isNext: pageDisplay < totalPages
            });

        } catch (err) {
            console.log(err);
        }
    };

    const handlePageChange = (newpage) => {
        if (newpage >= 1 && newpage <= pages.length) {
            setPageDisplay(newpage);
        }
    };

    const filteredRecords = records.filter(record =>
        record.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.course_fee.includes(searchTerm)
    );




    return (
        <div className="w-full h-[91vh] p-2.5 bg-[#987070]">
        <div className="bg-[#F1E5D1] rounded-md">
            <div className=" p-4 flex justify-between items-center">
                <div className="flex text-2xl ml-12">
                    <p className="text-2xl bg-[#987070] text-white py-1 rounded-md px-2"><FontAwesomeIcon icon={faAddressCard} /></p>
                    <select className="outline-none bg-[#F1E5D1] ml-4 w-32">
                        <option className="text-xl bg-gray-200">Courses </option>
                    </select>
                </div>
                <div className="flex text-md mr-12 gap-x-4">
                     <button className="bg-[#987070] p-1 text-white w-44 rounded-md " onClick={()=>setShowCreateCourse(true)}>Create course<FontAwesomeIcon icon={faAngleDown} className="ms-1 text-md" /></button>
                    <button className={`text-white p-1 border border-black  w-40 rounded-md justify-end ${!displayActions ?'bg-[#DBB5B5] ':'bg-[#987070]'}`} onClick={() => !displayActions ? setDisplayActions(true) : setDisplayActions(false)}>Actions<FontAwesomeIcon icon={faAngleDown} className="ms-1 text-md" /></button>
                </div>
            </div>
            <div className=" flex justify-between ">
                <div >
                    <input className="w-72 p-1 border border-[#987070] bg-[#EEEEEE] rounded-md outline-none ml-5" type="search" placeholder="Search" value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} />
                </div>


            </div>



            <div className="p-5">
                <table className="w-full border border-[#987070]">
                    <thead>
                        <tr className=" bg-[#987070] text-white">
                            <th className="p-2">Course</th>
                            <th>Description</th>
                            <th>Course Fee</th>
                            {
                                displayActions && (<th>Actions</th>)
                            }

                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredRecords.length > 0 ? (
                                filteredRecords.map((d) => (
                                    <tr key={d.id} className="border-b-[#987070] border-b bg-[#DBB5B5]">

                                        <td className="text-center p-2">{d.course}</td>
                                        <td className="text-center p-1">{d.description}</td>
                                        <td className="text-center p-1">{d.course_fee}</td>
                                        {
                                            displayActions && (<td className="flex justify-center">
                                                <button className="w-20 p-1 bg-red-400 rounded ">Delete</button>
                                            </td>)
                                        }
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">No results found</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>


                <div className="flex justify-center mt-6 mr-12 gap-x-4">
                    <p className="cursor-pointer"><FontAwesomeIcon icon={faAnglesLeft} onClick={() => setPageDisplay(1)} /></p>
                    <p className={`${pageConfig.isPrevious ? 'cursor-pointer' : 'cursor-not-allowed'}`} onClick={() => handlePageChange(pageDisplay - 1)}><FontAwesomeIcon icon={faChevronLeft} /></p>
                    {pages.map(page => (
                        <p key={page} onClick={() => handlePageChange(page)} className={`cursor-pointer ${pageDisplay === page ? 'font-bold' : ''}`}>{page}</p>
                    ))}
                    <p className={`${pageConfig.isNext ? 'cursor-pointer' : 'cursor-not-allowed'}`} onClick={() => handlePageChange(pageDisplay + 1)}><FontAwesomeIcon icon={faChevronRight} /></p>
                    <p className="cursor-pointer"><FontAwesomeIcon icon={faAnglesRight} onClick={() => setPageDisplay(pages[pages.length - 1])} /></p>
                </div>
            </div>

            { showCreateCourse && (<Createcourse setShowCreateCourse = {setShowCreateCourse}/>)}

        </div>
        </div>
    );
}
