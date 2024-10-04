'use client'

import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faAngleDown, faXmark, faAnglesLeft, faAnglesRight, faCalendarDays, faChevronLeft, faChevronRight, faSquarePollVertical, faTable, faUser } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";
import Link from "next/link";
// import Createopportunity from "../createopportunity/page";
import OpportunityKanban from "../kanbans/oppurtunitykanban";
import Editopportunity from "./editopportunity";
import Createopportunity from "./createopportunity";
import { get } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Opportunities() {

    const [records, setRecords] = useState([]);
    const [pages, setPages] = useState([]);
    const [pageDisplay, setPageDisplay] = useState(1);
    const [pageConfig, SetPageConfig] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [createopportunity, setCreateOpportunity] = useState(false);
    const [displayActions, setDisplayActions] = useState(false);
    const [showKanban, setShowKanban] = useState(false);
    const [ShowEditOpportunity, setShowEditOpportunity] = useState(false)
    const [deletePopUp , setDeletePopUp] = useState(false)
    const [selectopportunityid, setSelectOpportunityId] = useState(null)


    const recordsPerPage = 10;

    useEffect(() => {
        fetchdata();
    }, [pageDisplay]);

    const fetchdata = async () => {
        try {
            const response = await fetch("http://localhost:3001/opportunitydata", { method: 'GET' });
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
        (record.name && record.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (record.email && record.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (record.phone && record.phone.includes(searchTerm))
    );

    const deleteOpportunity =( opportunityid ) => {
        try{
          fetch(`http://localhost:3001/opportunitydata/${opportunityid}` , {method : 'DELETE'})
          fetchdata()
          toast.success('Deleted', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
            });
            setTimeout(() => {
                setDeletePopUp(false)
                window.location.reload()
            }, 1500);
        }
        catch (err){
            console.log(err)
            toast.error('Failed to delete', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                // transition: Bounce,
                });
        }
    }

    return (
        <div className="bg-[#987070] w-full p-2.5 h-[91vh]">
            <ToastContainer />
            <div className="bg-[#F1E5D1] rounded-md">
                <div className=" p-4 flex justify-between items-center">
                    <div className="flex text-2xl ml-12">
                        <p className="text-2xl bg-[#987070] text-white py-1 rounded-md px-2"><FontAwesomeIcon icon={faAddressCard} /></p>
                        <select className="outline-none bg-[#F1E5D1] ml-4 w-56">
                            <option className="text-xl bg-gray-200">All Opportunities </option>
                            <option className="text-xl bg-gray-200">My Opportunities</option>
                            <option className="text-xl bg-gray-200">Today's Opportunities</option>
                            <option className="text-xl bg-gray-200">Yesterday's Opportunities</option>
                            <option className="text-xl bg-gray-200">This week Opportunities</option>
                            <option className="text-xl bg-gray-200">This Month Opportunities</option>
                            <option className="text-xl bg-gray-200">Last Month Opportunities</option>
                        </select>
                    </div>
                    <div className="flex text-md mr-12 gap-x-4">
                        <button className="bg-[#987070] p-1 text-white w-44 rounded-md" onClick={() => setCreateOpportunity(true)}>Create Opportunity<FontAwesomeIcon icon={faAngleDown} className="ms-1 text-md" /></button>
                        <button className={`text-white p-1 w-40 rounded-md justify-end ${!displayActions ? 'bg-[#DBB5B5]' : 'bg-[#987070]'}`} onClick={() => !displayActions ? setDisplayActions(true) : setDisplayActions(false)}>Actions{!displayActions ? (<FontAwesomeIcon icon={faAngleDown} className="ms-1 text-md" />) : (<FontAwesomeIcon icon={faXmark} className="ms-1 text-md" />)}</button>
                    </div>
                </div>
                <div className=" flex justify-between ">
                    <div >
                        <input className="w-72 p-1 border-2 border-[#987070] rounded-md bg-[#EEEEEE] outline-none ml-5" type="search" placeholder="Search" value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <div className="mr-14 flex border border-[#987070] rounded-lg">
                        <button className={` w-40 p-1 rounded-l-lg ${!showKanban ? 'bg-[#987070] text-white' : ''}`} onClick={() => setShowKanban(false)}><FontAwesomeIcon icon={faTable} className="mr-1 text-md" />Table</button>
                        <button className={` w-40 p-1 rounded-r-lg ${showKanban ? 'bg-[#987070]' : ''}`} onClick={() => setShowKanban(true)}><FontAwesomeIcon icon={faSquarePollVertical} className="mr-1 text-md" />Kanban</button>
                    </div>
                </div>

                <div className="p-5">
                    {!showKanban ? (
                        <table className="w-full border border-[#987070]">
                            <thead>
                                <tr className=" bg-[#987070] text-white">
                                    <th className="p-2">Created on</th>
                                    <th>Status</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Course</th>
                                    {displayActions && (
                                        <th>Actions</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRecords.length > 0 ? (
                                    filteredRecords.map((d) => (
                                        <tr key={d.id} className=" border-b-[#987070] border-b bg-[#DBB5B5]">
                                            <td className="text-center p-2">{d.formatDate}</td>
                                            <td className="text-center p-1">-</td>
                                            <td className="text-center p-1">{d.name}</td>
                                            <td className="text-center p-1">{d.phone}</td>
                                            <td className="text-center p-1">{d.email}</td>
                                            <td className="text-center p-1">-</td>
                                            {displayActions && (
                                                <td>
                                                    <div className="w-40 mx-auto">
                                                        <button className="w-20 bg-lime-300 rounded-text-center " onClick={() => setShowEditOpportunity(true)}>Edit</button>
                                                        <button className="bg-red-500 w-20 rounded text-center" onClick={()=>{setDeletePopUp(true); setSelectOpportunityId(d.id)}}>Delete</button>
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">No results found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>) : (<OpportunityKanban />)
                    }

                    {!showKanban ? (
                        <div className="flex justify-center mt-6 mr-12 gap-x-4">
                            <p className="cursor-pointer"><FontAwesomeIcon icon={faAnglesLeft} onClick={() => setPageDisplay(1)} /></p>
                            <p className={`${pageConfig.isPrevious ? 'cursor-pointer' : 'cursor-not-allowed'}`} onClick={() => handlePageChange(pageDisplay - 1)}><FontAwesomeIcon icon={faChevronLeft} /></p>
                            {pages.map(page => (
                                <p key={page} onClick={() => handlePageChange(page)} className={`cursor-pointer ${pageDisplay === page ? 'font-bold' : ''}`}>{page}</p>
                            ))}
                            <p className={`${pageConfig.isNext ? 'cursor-pointer' : 'cursor-not-allowed'}`} onClick={() => handlePageChange(pageDisplay + 1)}><FontAwesomeIcon icon={faChevronRight} /></p>
                            <p className="cursor-pointer"><FontAwesomeIcon icon={faAnglesRight} onClick={() => setPageDisplay(pages[pages.length - 1])} /></p>
                        </div>) : (<></>)
                    }
                </div>

                {createopportunity && (<Createopportunity setCreateOpportunity={setCreateOpportunity} />)}
                {ShowEditOpportunity && (<Editopportunity setShowEditOpportunity={setShowEditOpportunity} />)}

                { deletePopUp && (
                    <div className="absolute top-0 left-0 w-full h-[100vh]  bg-black bg-opacity-60 content-center">
                        <div className="w-1/4 h-80 bg-white rounded mx-auto text-center p-14 ">
                            <h1>confirm to delete</h1>
                            <div className="flex justify-center pt-14 gap-x-4">
                                <button className="w-32 p-1 text-md font-semibold rounded-md border" onClick={() => setDeletePopUp(false)}>cancel</button>
                                <button className="w-32 bg-red-300 text-white rounded-md font-semibold text-md" onClick={() => deleteOpportunity(selectopportunityid)}>Delete</button>
                            </div>
                        </div> 
                    </div>
                )}

            </div>
        </div>
    );
}
