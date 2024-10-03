'use client'

import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { faChevronRight,faChevronLeft, faXmark, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import CreateCourse from "./createcourse";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateCourse from "./updateCourse";

export default function Courses() {

        const [records,setRecords] = useState([]);
        const [pages,setPages] = useState([]);
        const [pageDisplay, setPageDisplay] = useState(1);
        const [pageConfig, setPageConfig] = useState({});
        const [searchTerm,setSearchTerm] = useState("")
        const [showCreateCourse,setShowCreateCourse] = useState(false);
        const [displayActivity,setDisplayActivity] = useState(false);
        const [deletePopUp, setDeletePopUp] = useState(false)
        const [selectedRows , setSelectedRows] = useState([]);
        const [selectedLead, setSelectedLead] = useState(null);
        const [leadId,setLeadId] = useState();
        const [showupdate ,setShowUpdate] = useState(false);



        const recordsPerPage = 8;

        useEffect( () =>{
            fetchData();
        },[pageDisplay,searchTerm])

        const ApiUrl = process.env.NEXT_PUBLIC_API_URL;


        const fetchData = async () =>{
            try{
            const response = await fetch(`${ApiUrl}/api/courses`,{ method: 'GET' });
            const data = await response.json()
            console.log(data.data)

            const sortedRecords = data.data.sort((a, b) => a.id - b.id);

            // setRecords(data.data)
            // console.log(data.data)

            const filteredRecords = filterRecords(sortedRecords);
            
            const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
            const paginatedRecords = filteredRecords.slice((pageDisplay - 1) * recordsPerPage, pageDisplay * recordsPerPage);
            setRecords(paginatedRecords);
            
            
            setPageConfig({
                isPrevious: pageDisplay > 1,
                isNext: pageDisplay < totalPages
              });

            const tempArr = [];
            for (let i = 1; i <= totalPages; i++) {
              tempArr.push(i);
            }
            setPages(tempArr);

            }
            catch (err){
                console.log(err);
            }
        }

        const handlePageChange = (newPage) =>{
            if (newPage >= 1 && newPage <= pages.length) {
                setPageDisplay(newPage);
              }
        }

        const filterRecords = (records) => {
            let filteredRecords = records;

            // Apply search filter based on the search term
            if (searchTerm) {
              filteredRecords = filteredRecords.filter(record =>
                record.courseName.toLowerCase().includes(searchTerm.toLowerCase()) || record.courseDescription.toLowerCase().includes(searchTerm.toLowerCase())
              );
            }
        
            return filteredRecords;
          };
          const handleSearchChange = (event) => {
            setSearchTerm(event.target.value);
            setPageDisplay(1); 
          };

          const confirmDelete =async () =>{
            try {
              
              // await fetch(`http://localhost:4000/api/leads/${leadId}`, { method: "DELETE" });
              await Promise.all(
                selectedRows.map(id => fetch(`${ApiUrl}/api/courses/${id}`,{method : 'DELETE'}))
              );
              setSelectedRows([])
              if(selectedRows.length == 0){
                // alert("please select atleast one")
                toast.warning('Please Select Atleast One ', {
                  position: "top-center",
                  autoClose: 1500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }
              else{
                // getLastRecords();
                fetchData();
                toast.success(' Deleted Suucessfully !', {
                  position: "top-center",
                  autoClose: 1498,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored"
                  });
                setTimeout(() =>{
                  setDeletePopUp(false)
                },2000)
              }
            } 
            catch (err) {
              console.log(err); 
            }
          }

        const showPop = (e ) =>{
            if(selectedRows.length == 0){
              // alert("select atleast one !")
              toast.warning('Please Select Atleast One ', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
            else{
              setLeadId(e);
              setDeletePopUp(true);
            }
        
          }

          const handleCheckBoxChange = (e,recordId) => {
            e.stopPropagation();
            setSelectedRows(prev =>{
              if (prev.includes(recordId)){
                return prev.filter(id => id !== recordId)
              }
              else{
                return [...prev,recordId]
              }
            })
          }

          const showUpdateScreen = () => {
            if (selectedRows.length !== 1) {
              // alert("Please select exactly one record for update!");
              toast.warning('Please Select Exactly One record for Update ', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            } else {
              const selectedLead = records.find(record => record.id === selectedRows[0]);
              
              setSelectedLead(selectedLead);
              setShowUpdate(true);
            }
          };

          const handlerowClick = (e, lead) => {
            // Check if the click was on the checkbox or its label
            if (e.target.type === 'checkbox' || e.target.tagName === 'LABEL') {
              return; // Do nothing if the click was on the checkbox or its label
            }
            setSelectedLead(lead);
            setShowUpdate(true);
          };


        

    return (
        <>
            <div className="p-4 w-full h-[91vh] p-4 bg-[#E5D9F2]">
            <ToastContainer />
                <div className="w-full h-full border-2 border-[#CDC1FF] rounded p-3">
                    <div className="flex justify-between">
                        <div className="flex items-center gap-x-3">
                            <p><FontAwesomeIcon icon={faAddressCard} className="text-2xl bg-[#A594F9] text-white p-2 rounded"/></p>
                            <h1 className="text-2xl">Courses</h1>
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <button className="w-36 p-1 bg-[#A594F9] text-white rounded font-semibold" onClick={() => setShowCreateCourse(true)}>Create course</button>
                            <button className="w-36 p-1 border border-[#A594F9] bg-[#CDC1FF] rounded font-semibold" onClick={() => !displayActivity ? setDisplayActivity(true) : setDisplayActivity(false)}>Action { displayActivity ? <FontAwesomeIcon icon={faXmark} className="text-md ms-2"/> :<FontAwesomeIcon icon={faChevronDown} />  }  </button>
                        </div>
                        {
                            displayActivity && (
                                <div className="absolute top-[18.2%] right-[2%] w-36 bg-white">
                                    <button className="w-36 border p-1" onClick={showUpdateScreen}>Update</button>
                                    <button className="w-36 border p-1" onClick={showPop}>Delete</button>
                                </div>
                            )
                        }
                    </div>
                    <div>
                        <input type="search" className="w-72 border border-[#A594F9] mt-2 p-1 px-3 outline-none rounded-md bg-[#F5EFFF]" placeholder="search course" value={searchTerm} onChange={handleSearchChange}/>
                    </div>
                    <div className="w-full h-4/5 mt-2" >
                        <table className="w-full">
                            <thead className="border border-[#CDC1FF] bg-[#A594F9]">
                                <tr className="">
                                    <th className="w-1/8 p-2 px-5 ml-5"><input type="checkbox" className="scale-150" onChange={(e) => setSelectedRows(e.target.checked ? records.map(record => record.id) : [])}></input></th>
                                    <th className="w-1/3 p-2 border-r-2">Course</th>
                                    <th className="w-1/3 p-2 border-r-2">Decription</th>
                                    <th className="w-1/3 p-2 border-r-2">Fee</th>
                                    {/* { displayActivity ? (<th className="p-2">Actions</th>) : '' } */}
                                </tr>
                            </thead>
                            <tbody>
                                { records && records.length > 0 ?records.map(record => (
                                    <tr className="border border-[#CDC1FF] bg-[#F5EFFF]" key={record.id} onClick={(e) => handlerowClick(e,record)}>
                                        <td className="w-1/8 m-2 p-2 px-5"><input type="checkbox" className="scale-150" checked={selectedRows.includes(record.id)} onChange={(e) => handleCheckBoxChange(e,record.id)}></input></td>
                                        <td className=" w-1/5 p-2 ps-8">{record.courseName}</td>
                                        <td className=" w-1/5 p-2 ps-5">{record.courseDescription}</td>
                                        <td className="text-center w-1/5 p-2">{record.courseFee}</td>
                                        {/* { displayActivity ? (<td className="w-1/6 p-2">
                                        <div className="flex gap-x-3 mx-auto justify-center">
                                            <button className="w-24 bg-lime-200 rounded-lg">Edit</button>
                                            <button className="w-24 bg-red-400 rounded-lg">Delete</button>
                                        </div>
                                        </td>) : '' } */}
                                    </tr>
                                ) ) : <tr className="bg-[#F5EFFF]">
                                        <td colSpan={4} className="text-center w-full h-96">
                                        <div className="items-center">
                                            <img src="./images/nodata.svg" className="w-44 h-60 mx-auto"></img>
                                            <h1 className=" text-xl text-center mt-3 ml-10">No Data Found</h1>
                                        </div>
                                    </td>
                                    </tr>}
                            </tbody>
                        </table>
                    </div>
                    {
                        records.length > 0 && (
                            <div className="justify-center flex mt-2">
                                <p><FontAwesomeIcon icon={faChevronLeft} className={`text-sm mr-4 ${pageConfig.isPrevious ? 'cursor-pointer' : 'cursor-not-allowed'} `} onClick={() => handlePageChange(pageDisplay - 1)}/></p>
                                { pages.map((page) =>(
                                    <p key={page} className={`mx-1 cursor-pointer ${page==pageDisplay ? 'font-semibold' : ''}`} onClick={() => handlePageChange(page)}>{page}</p>
                                ))}
                                <p><FontAwesomeIcon icon={faChevronRight} className={`text-sm ml-4 ${pageConfig.isNext ? 'cursor-pointer' : 'cursor-not-allowed'}`} onClick={() => handlePageChange(pageDisplay + 1)}/></p>

                            </div>
                        )
                    }
                </div>
            </div>
                { deletePopUp && (
                <div
                id="deleteModal"
                className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center ">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <img src="./images/delete.svg"></img>
                    <h2 className="text-lg font-bold text-red-800 text-center mt-2 text-center">Confirm Deletion</h2>

                    <p className="text-gray-600 mt-4 text-center">
                    Are you sure you want to delete this item? This action cannot be
                    undone.
                    </p>
                    <div className="flex justify-end mt-6">
                    <button
                        className="bg-[#E5D9F2] text-gray-700 px-4 py-2 rounded mr-2 border border-[#A594F9]"
                        onClick={() =>setDeletePopUp(false)}
                        >
                        Cancel
                    </button>
                    <button
                        className="bg-[#A594F9] text-white px-4 py-2 rounded"
                        onClick={confirmDelete}
                    >
                        Delete
                    </button>
                    </div>
                </div>
                
                </div>
                )}
            {
                showCreateCourse && <CreateCourse setShowCreateCourse={setShowCreateCourse}/>
            }
            {
            showupdate && (
                <UpdateCourse setShowUpdate={setShowUpdate} updateData={selectedLead}/>
          )
        }
        </>
    )
}