'use client'
import { useEffect, useState } from "react"
import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faAngleDown, faAnglesLeft, faAnglesRight, faBell, faCalendarDays, faChevronLeft, faChevronRight, faL, faSquarePollVertical, faTable, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
// import Createlead from "../createlead/page";
import Createlead from "./ceatelead";
import LeadsKanban from "../kanbans/leadskanban";
// import Editlead from "../editlead/page";
import Editlead from "./editlead";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export default function Leads() {
    const [records, setRecords] = useState([]);
    const [pages, setPages] = useState([]);
    const [pageDisplay, setPageDisplay] = useState(1);
    const [pageConfig, SetPageConfig] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [createlead, setCreateLead] = useState(false);
    const [displayActions, setDisplayActions] = useState(false);
    const [showKanban, setShowKanban] = useState(false);
    const [showEditLead , setShowEditLead] = useState(false)
    const [deletePopUp , setDeletePopUp] = useState(false)
    const [selectedLeadId, setSelectedLeadId] = useState(null);

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

    const deleteLead =( leadId ) =>{
        try{
        fetch(`http://localhost:3001/signupdata/${leadId}`, { method: 'DELETE' })    
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
            // window.location.reload()
            setTimeout(() =>{
                setDeletePopUp(false)
                window.location.reload()
            },1500)

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
        <div className="bg-[#987070] bg-opacity-90 w-full p-2 h-[91vh]">
            <ToastContainer />
            <div className="bg-[#F1E5D1] rounded-md">
                <div className="p-4 flex justify-between items-center ">
                    <div className="flex text-2xl ml-12">
                        <p className="text-2xl bg-[#987070] text-white py-1 rounded-md px-2"><FontAwesomeIcon icon={faAddressCard} /></p>
                        <select className="outline-none ml-4 w-32 bg-[#F1E5D1] w-56">
                            <option className="text-xl bg-[#F1E5D1]">All Leads</option>
                            <option className="text-xl bg-[#F1E5D1]">My Leads</option>
                            <option className="text-xl bg-[#F1E5D1]">Today's Leads</option>
                            <option className="text-xl bg-[#F1E5D1]">Yesterday's Leads</option>
                            <option className="text-xl bg-[#F1E5D1]0">This week Leads</option>
                            <option className="text-xl bg-[#F1E5D1]">This Month Leads</option>
                            <option className="text-xl bg-[#F1E5D1]">Last Month Leads</option>
                        </select>
                    </div>
                    <div className="flex text-md mr-12">
                        <button className="bg-[#987070] p-1 text-white w-40 rounded-md mr-8" onClick={() => setCreateLead(true)}>Create Lead<FontAwesomeIcon icon={faAngleDown} className="ms-1 text-md" /></button>
                        <button className={`text-white p-1  w-40 rounded-md justify-end ${displayActions ? 'bg-[#987070] border border-[#987070]':'bg-[#DBB5B5]'}`} onClick={() => !displayActions ? setDisplayActions(true) : setDisplayActions(false)}>Actions{!displayActions ? (<FontAwesomeIcon icon={faAngleDown} className="ms-1 text-md" />) : (<FontAwesomeIcon icon={faXmark} className="ms-1 text-md" />)}</button>
                    </div>
                </div>

                <div className="flex justify-between ">
                    <div>
                        <input
                            className="w-72 p-1 border-2 border-[#987070] rounded-md outline-none ml-5 bg-[#EEEEEE]"
                            type="search"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {/* <div>
                        <button className="border border-[#987070] w-40 p-1 rounded-l-lg">Not Contacted</button>
                        <button className="border border-[#987070] w-40 p-1 ">Attempted</button>
                        <button className="border border-[#987070] w-40 p-1 ">Warm Lead</button>
                        <button className="border border-[#987070] w-40 p-1 rounded-r-lg">Cold Lead</button>
                    </div> */}
                    <div className="mr-14 flex border border-[#987070] rounded-lg">
                        <button className={` w-40 p-1 rounded-l-lg ${!showKanban ? 'bg-[#987070] text-white' : ''}`} onClick={() => setShowKanban(false)}><FontAwesomeIcon icon={faTable} className="mr-1 text-md" />Table</button>
                        <button className={` w-40 p-1 rounded-r-lg ${showKanban ? 'bg-[#987070] ' : ''} `} onClick={() => setShowKanban(true)}><FontAwesomeIcon icon={faSquarePollVertical} className="mr-1 text-md" />Kanban</button>
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
                                    {displayActions && (<th>Actions</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredRecords.length > 0 ? (
                                        filteredRecords.map((d) => (
                                            <tr key={d.id} className="border-b border-b-[#987070] bg-[#DBB5B5]">
                                                <td className="text-center p-2">{d.formatDate}</td>
                                                <td className="text-center p-1">-</td>
                                                <td className="text-center p-1">{d.name}</td>
                                                <td className="text-center p-1">{d.phone}</td>
                                                <td className="text-center p-1">{d.email}</td>
                                                <td className="text-center p-1">-</td>
                                                {displayActions && (
                                                    <td>
                                                        <div className="mx-auto w-40 gap-x-2">
                                                            <button className="w-20 bg-lime-200 rounded text-center " onClick={() => setShowEditLead(true)}>Edit</button>
                                                            <button className="w-20 bg-red-300 rounded text-center" onClick={() => { setDeletePopUp(true); setSelectedLeadId(d.id); }}>Delete</button>
                                                        </div>
                                                    </td>
                                                )}
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
                    ) : (
                        <LeadsKanban />
                    )}


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
                            </div>
                        ) : (<></>)

                    }
                </div>

                {createlead && (<Createlead setCreateLead={setCreateLead} />)}
                {/* { showKanban && ( < LeadsKanban /> ) } */}
                { showEditLead && (<Editlead setShowEditLead={setShowEditLead}/>) }

                { deletePopUp && (
                    <div className="absolute top-0 left-0 w-full h-[100vh]  bg-black bg-opacity-60 content-center">
                        <div className="w-1/4 h-80 bg-white rounded mx-auto text-center p-14 ">
                            <h1>confirm to delete</h1>
                            <div className="flex justify-center pt-14 gap-x-4">
                                <button className="w-32 p-1 text-md font-semibold rounded-md border" onClick={() => setDeletePopUp(false)}>cancel</button>
                                <button className="w-32 bg-red-300 text-white rounded-md font-semibold text-md" onClick={() => deleteLead(selectedLeadId)}>Delete</button>
                            </div>
                        </div> 
                    </div>
                )}
            </div>
        </div>
    );
}
