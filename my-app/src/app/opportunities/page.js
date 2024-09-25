'use client'

import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faAngleDown,faXmark, faBell, faAnglesLeft, faAnglesRight, faCalendarDays, faChevronLeft, faChevronRight, faSquarePollVertical, faTable, faUser } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";
import Link from "next/link";
import Createopportunity from "../createopportunity/page";
import OpportunityKanban from "../kanbans/oppurtunitykanban";



export default function Opportunities() {

    const [records, setRecords] = useState([]);
    const [pages, setPages] = useState([]);
    const [pageDisplay, setPageDisplay] = useState(1);
    const [pageConfig, SetPageConfig] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [createopportunity, setCreateOpportunity] = useState(false);
    const [displayActions, setDisplayActions] = useState(false);
    const [showKanban, setShowKanban] = useState(false);


    const recordsPerPage = 10;

    useEffect(() => {
        fetchdata();
    }, [pageDisplay]);

    const fetchdata = async () => {
        try {
            const response = await fetch("http://localhost:3001/signupdata", { method: 'GET' });
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
        record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.phone.includes(searchTerm)
    );




    return (
        <div className="bg-blue-100 w-full p-6 h-[90vh]">
        <div className="bg-white">
            <div className=" p-4 flex justify-between items-center">
                <div className="flex text-2xl ml-12">
                    <p className="text-2xl bg-[#1B96FF] text-white py-1 rounded-md px-2"><FontAwesomeIcon icon={faAddressCard} /></p>
                    <select className="outline-none ml-4 w-56">
                        <option className="text-xl bg-gray-200">All Opportunities </option>
                        <option className="text-xl bg-gray-200">My Opportunities</option>
                        <option className="text-xl bg-gray-200">Today's Opportunities</option>
                        <option className="text-xl bg-gray-200">Yesterday's Opportunities</option>
                        <option className="text-xl bg-gray-200">This week Opportunities</option>
                        <option className="text-xl bg-gray-200">This Month Opportunities</option>
                        <option className="text-xl bg-gray-200">Last Month Opportunities</option>
                    </select>
                </div>
                <div className="flex text-md mr-12">
                    <button className="bg-[#0176D3] p-1 text-white w-44 rounded-md mr-8" onClick={() => setCreateOpportunity(true)}>Create Opportunity<FontAwesomeIcon icon={faAngleDown} className="ms-1 text-md" /></button>
                    <button className={`text-black p-1 border border-black  w-40 rounded-md justify-end ${displayActions ?'bg-red-400':``}`} onClick={() => !displayActions ? setDisplayActions(true) : setDisplayActions(false)}>Actions{!displayActions ? (<FontAwesomeIcon icon={faAngleDown} className="ms-1 text-md" />) : (<FontAwesomeIcon icon={faXmark} className="ms-1 text-md" />) }</button>
                </div>
            </div>
            <div className=" flex justify-between ">
                <div >
                    <input className="w-72 p-1 border border-green-900 rounded-md outline-none ml-5" type="search" placeholder="Search" value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <div>
                    <button className="border border-green-900  w-40 p-1 rounded-l-lg ">Visiting</button>
                    <button className="border border-green-900  w-40 p-1 ">Visited</button>
                    <button className="border border-green-900  w-40 p-1 ">Demo attended</button>
                    <button className="border border-green-900  w-40 p-1 rounded-r-lg">Lost Opportunity</button>
                </div>
                <div className="mr-14 flex ">
                    <button className={`border border-green-900 w-40 p-1 rounded-l-lg ${!showKanban ? 'bg-blue-500 text-white' :''} `} onClick={()=>setShowKanban(false)}><FontAwesomeIcon icon={faTable} className="mr-1 text-md" />Table</button>
                    <button className={`border border-green-900 w-40 p-1 rounded-r-lg ${showKanban ? 'bg-blue-500 text-white' : ''}`} onClick={()=>setShowKanban(true)}><FontAwesomeIcon icon={faSquarePollVertical} className="mr-1 text-md" />Kanban</button>
                </div>
            </div>



            <div className="p-12">
             { !showKanban ? (   
                <table className="w-full border">
                    <thead>
                        <tr className="border-bottom border bg-blue-100">
                            <th className="p-2">Created on</th>
                            <th>Status</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Course</th>
                            {
                                displayActions && (
                                    <th>Actions</th>
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredRecords.length > 0 ? (
                                filteredRecords.map((d) => (
                                    <tr key={d.id} className="border-b">
                                        <td className="text-center p-1">-</td>
                                        <td className="text-center p-1">-</td>
                                        <td className="text-center p-1">{d.name}</td>
                                        <td className="text-center p-1">{d.phone}</td>
                                        <td className="text-center p-1">{d.email}</td>
                                        <td className="text-center p-1">-</td>
                                        {
                                            displayActions && (
                                                <td>
                                                <div className="w-40 mx-auto">
                                                    <button className="w-20 bg-lime-300 rounded-text-center ">Edit</button>
                                                    <button className="bg-red-500 w-20 rounded text-center">Delete</button>
                                                </div>
                                            </td>
                                            )
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
                </table>) : ( <OpportunityKanban/> )

             }

                { 
                    !showKanban ? (
                    <div className="flex justify-center mt-6 mr-12 gap-x-4">
                    <p className="cursor-pointer"><FontAwesomeIcon icon={faAnglesLeft} onClick={() => setPageDisplay(1)} /></p>
                    <p className={`${pageConfig.isPrevious ? 'cursor-pointer' : 'cursor-not-allowed'}`} onClick={() => handlePageChange(pageDisplay - 1)}><FontAwesomeIcon icon={faChevronLeft} /></p>
                    {pages.map(page => (
                        <p key={page} onClick={() => handlePageChange(page)} className={`cursor-pointer ${pageDisplay === page ? 'font-bold' : ''}`}>{page}</p>
                    ))}
                    <p className={`${pageConfig.isNext ? 'cursor-pointer' : 'cursor-not-allowed'}`} onClick={() => handlePageChange(pageDisplay + 1)}><FontAwesomeIcon icon={faChevronRight} /></p>
                    <p className="cursor-pointer"><FontAwesomeIcon icon={faAnglesRight} onClick={() => setPageDisplay(pages[pages.length - 1])} /></p>
                </div>) : ( <></>)

                }


            </div>


            { createopportunity  && (<Createopportunity setCreateOpportunity={setCreateOpportunity} />)}


        </div>
        </div>
    );
}
