'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faChartBar } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown, faTable, faChevronRight, faChevronLeft ,faPenToSquare,faTrash, faXmark, faLink} from "@fortawesome/free-solid-svg-icons";
import Kanban from "../kanban/leadskanban";
import CreateLead from "./createlead";
import UpdateLead from "./updatelead";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";



export default function Leads() {
  const [records, setRecords] = useState([]);
  const [pageConfig, setPageConfig] = useState({});
  const [pageDisplay, setPageDisplay] = useState(1);
  const [pages, setPages] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All Leads");
  const [searchTerm, setSearchTerm] = useState(""); // Added state for search term
  const [displayActivity,setDisplayActivity] = useState(false)
  const [isVisibleDeleteModel,setIsVisibleDeleteModel] = useState(false)
  const [showKanban , setShowKanban] = useState(false);
  const [deletePopUp , setDeletePopUp] = useState(false);
  const [showCreateLead , setShowCreateLead] = useState(false)
  const [leadId,setLeadId] = useState();
  const [showupdate ,setShowUpdate] = useState(false);
  const [selectStatus , setSelectStatus ]= useState("All Leads")
  const [updateData, setUpdateData] = useState(null);
  const [selectedRows , setSelectedRows] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showConvert , setShowConvert] = useState(false);


  const recordsPerPage = 10;
  const ApiUrl = process.env.NEXT_PUBLIC_API_URL;

  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`
  }

  useEffect(() => {
    getLastRecords();
  }, [pageDisplay, selectedFilter, searchTerm]); 

  useEffect( () =>{
    setShowKanban(true)
  },[])

  const getLastRecords = async () => {

    try {
      let response = await fetch(
        `${ApiUrl}/api/leads?page=1&limit=10`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      // console.log(data)

      const sortedRecords = data.data.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA; 
      });

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
     catch (err) {
      console.log(err);
    }
  };

  const filterRecords = (records) => {
    const today = new Date();
    let filteredRecords = records;
  
    switch (selectedFilter) {
      case "Today's Leads":
        filteredRecords = filteredRecords.filter(record => {
          const recordDate = new Date(record.createdAt);
          return recordDate.toDateString() === today.toDateString();
        });
        break;
      case "Yesterday's leads":
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        filteredRecords = filteredRecords.filter(record => {
          const recordDate = new Date(record.createdAt);
          return recordDate.toDateString() === yesterday.toDateString();
        });
        break;
      case "This week Leads":
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        filteredRecords = filteredRecords.filter(record => {
          const recordDate = new Date(record.createdAt);
          return recordDate >= startOfWeek && recordDate <= today;
        });
        break;
      case "Last Month Leads":
        const startOfMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        filteredRecords = filteredRecords.filter(record => {
          const recordDate = new Date(record.createdAt);
          return recordDate >= startOfMonth && recordDate <= endOfMonth;
        });
        break;
        case "Not Contacted":
        filteredRecords = filteredRecords.filter(record => record.leadStatus === "Not Contacted");
        break;
      case "Attempted":
        filteredRecords = filteredRecords.filter(record => record.leadStatus === "Attempted");
        break;
      case "Warm Lead":
        filteredRecords = filteredRecords.filter(record => record.leadStatus === "Warm Lead");
        break;
      case "Cold Lead":
        filteredRecords = filteredRecords.filter(record => record.leadStatus === "Cold Lead");
        break;
      default:
        break;
    }

    if (searchTerm) {
        filteredRecords = filteredRecords.filter(record => {
          const name = record.leadname ? record.leadname.toLowerCase() : "";
          const phone = record.phone ? record.phone : "";
          return name.includes(searchTerm.toLowerCase()) || phone.includes(searchTerm);
        });
    }
    

    return filteredRecords;
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pages.length) {
      setPageDisplay(newPage);
    }
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    setPageDisplay(1); 
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPageDisplay(1); 
  };
  const handleStatusClick = (status) => {
    setSelectedFilter(status);
    setPageDisplay(1);
  };

  

  const closeForm = () =>{
    setShowCreateLead(false)

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

  const confirmDelete =async () =>{
    try {
      
      // await fetch(`http://localhost:4000/api/leads/${leadId}`, { method: "DELETE" });
      await Promise.all(
        selectedRows.map(id => fetch(`${ApiUrl}/api/leads/${id}`,{method : 'DELETE'}))
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
        getLastRecords();
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

  // const handlerowClick = (e,lead) => {
  
  //   const selectedLead = records.find(record => record.id);
  //   setSelectedLead(selectedLead);
  //   setShowUpdate(true);

  // }

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

  const hideUpdateScreen = ( ) =>{
    setShowUpdate(false)
    
  }
  
  const showConvertForm = (leadId) => {
    if(selectedRows.length > 0){
      setShowConvert(true)

    }
    else{
      toast.warning('Please Select atleast one record for Convert', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }




  const parseCourses = (courseString) => {
    try {
      return JSON.parse(courseString);
    } catch (error) {
      console.error("Error parsing course data:", error);
      return [];
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


 
  
  // const datatoOpp = {
  //   name : records.name || "",
  //   cc : records.cc || "",
  //   phone : records.phone || "",
  //   email : records.email || "",
  //   feeQuoted : records.feeQuoted || "",
  //     batchTiming : records.batchTiming || "",
  //     leadStatus : records.leadStatus || "",
  //     stack : records.stack || "",
  //     ClassMode : records.ClassMode || "",
  //     opportunityStatus : records.opportunityStatus || "",
  //     opportunitySatge : records.opportunitySatge || "",
  //     DemoAttendedStage : records.DemoAttendedStage || "",
  //     visitedStage : records.visitedStage || "",
  //     lostOpportunityReason : records.lostOpportunityReason || "",
  //     nextFollowUp : records.nextFollowUp || "",
  //     leadSource : records.leadSource || "",
  //     course : "",
  //     // course : records.course || "",
  //     description : records.description || "",
  // }


  const convertLeadToOpp = async () => {
    try {
      
      // await fetch(`http://localhost:4000/api/leads/${leadId}`, { method: "DELETE" });
      await Promise.all(
        selectedRows.map(id => fetch(`${ApiUrl}/api/leads/${id}`,{method : 'DELETE'}))
      ) 
      toast.info(' Converted Succesfully !', {
        position: "top-center",
        autoClose: 1498,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
        });
        setTimeout(() => {
          setShowConvert(false)
          window.location.reload()
        },1500)

    }
    catch (err){
      console.log(err)
    }
  }
  const convertLeadToLearner = async () => {
    try {
      
      
      // await fetch(`http://localhost:4000/api/leads/${leadId}`, { method: "DELETE" });
      await Promise.all(
        selectedRows.map(id => {
          const deleteRequest = axios.delete(`${ApiUrl}/api/leads/${id}`);
          // const postRequest = axios.post(`${ApiUrl}/api/opportunity`,datatoOpp)
      
          return Promise.all([deleteRequest, postRequest]); // Wait for both requests
        })
      );


      toast.info(' Converted Succesfully !', {
        position: "top-center",
        autoClose: 1498,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
        });
        setTimeout(() => {
          setShowConvert(false)
          window.location.reload()
        },1500)

    }
    catch (err){
      console.log(err)
    }
  }

  


  return (
    <div className="w-full p-4 h-[110vh] bg-[#E5D9F2]">
     <ToastContainer />
      <div className="w-[95%] h-auto mx-auto border-2 border-[#CDC1FF] p-2 rounded ">
        <div className="flex items-center w-full justify-between ">
          <div className="flex w-72 gap-x-2 justify-between ">
            <FontAwesomeIcon
              icon={faAddressCard}
              className="text-3xl bg-[#A594F9] text-white p-2 rounded"
            />
            <select
              className="w-60 outline-none bg-[#E5D9F2] text-xl"
              value={selectedFilter}
              onChange={handleFilterChange}
            >
              <option>All Leads</option>
              {/* <option>My Leads</option> */}
              <option>Today's Leads</option>
              <option>Yesterday's leads</option>
              <option>This week Leads</option>
              <option>Last Month Leads</option>
            </select>
          </div>
          <div className="w-72 flex justify-between">
          
              <button className="w-34 rounded bg-[#A594F9] p-2 text-white font-semibold" onClick={() =>setShowCreateLead(true)}>
                Create Lead
                <span>
                  <FontAwesomeIcon icon={faChevronDown} className="ml-1"/>
                </span>
              </button>
            
            <button
              className={`w-32 border-2 border-[#A594F9] rounded p-2 bg-[#CDC1FF] font-semibold`}
              onClick={() => !displayActivity ? setDisplayActivity(true) : setDisplayActivity(false)}
            >
              Action
              <span className="ms-1">
                { !displayActivity ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faXmark} /> }
              </span>
            </button>
            {
              displayActivity && (
                <div className="w-32 text-white absolute top-[18.3%] right-[4%] bg-white ">
                  <button className="w-full p-1 border  text-blue-800" onClick={showUpdateScreen}>Update <FontAwesomeIcon icon={faPenToSquare} /></button>
                  <button className="w-full p-1 border  text-red-500" onClick={showPop}>Delete <FontAwesomeIcon icon={faTrash} /></button>
                  <button className="w-full p-1 border  text-green-600" onClick={showConvertForm}>Convert <FontAwesomeIcon icon={faLink}/></button>
                </div>
              )
            }
          </div>
        </div>
        <div className="mt-3 flex">
          <input
            type="search"
            className="border border-[#A594F9] p-1 rounded-md w-72 outline-none bg-[#F5EFFF]"
            placeholder="Search by name or phone"
            value={searchTerm}
            onChange={handleSearchChange} />
          <div className="flex w-3/5 justify-evenly items-center border-lg ml-3">
            <button className={`flex w-full p-1 border border-[#A594F9] justify-center rounded-l-md ${selectedFilter === 'All Leads' ? 'bg-[#A594F9] text-white ' : 'bg-[#CDC1FF]'}`} onClick={() =>handleStatusClick("All Leads")}>All leads </button>
            <button className={`w-full border border-[#A594F9] p-1 text-center flex justify-center ${selectedFilter === 'Not Contacted' ? 'bg-[#A594F9] text-white' : 'bg-[#CDC1FF]'}`} onClick={() =>handleStatusClick("Not Contacted")}>Not Contacted </button>
            <button className={`w-full border border-[#A594F9] p-1 text-center flex justify-center ${selectedFilter === 'Attempted' ? 'bg-[#A594F9] text-white' : 'bg-[#CDC1FF]'}`} onClick={() =>handleStatusClick("Attempted")}>Attempted </button>
            <button className={`w-full border border-[#A594F9] p-1 text-center flex justify-center ${selectedFilter === 'Warm Lead' ? 'bg-[#A594F9] text-white' : 'bg-[#CDC1FF]'}`} onClick={() =>handleStatusClick("Warm Lead")}>Warm Leads </button>
            <button className={`w-full border border-[#A594F9] p-1 text-center flex justify-center rounded-r-md ${selectedFilter === 'Cold Lead' ? 'bg-[#A594F9] text-white' : 'bg-[#CDC1FF]'}`} onClick={() =>handleStatusClick("Cold Lead")}>Cold Leads </button>

          </div>
          <div className="w-60 border border-[#A594F9] rounded-md ml-8">
            <button className={`w-1/2 p-1 rounded-l-md ${showKanban ?  'bg-[#A594F9] text-white' :'bg-[#CDC1FF] ease-in'}` } onClick={() =>setShowKanban(true)}><FontAwesomeIcon icon={faTable} className="text-xl" /> Table</button>
            <button className={`w-1/2 p-1 rounded-r-md ${showKanban ? 'bg-[#CDC1FF] ease-in' : 'bg-[#A594F9] text-white'}` } onClick={() =>setShowKanban(false)}><FontAwesomeIcon icon={faChartBar} /> Kanban</button>
          </div>
        </div>
        <div className="w-full h-auto border-[#A594F9] border mt-5">
          {showKanban ? ( 
           <table className="w-full ">
            <thead className="border border-[#A594F9] bg-[#CDC1FF]">
              <tr>
                <th className="w-10 accent-neutral-900"><input type="checkbox" className="scale-150" onChange={(e) => setSelectedRows(e.target.checked ? records.map(record => record.id) : [])}></input></th>
                <th className="w-[150px] border-r-2 p-2">Created on</th>
                <th className="w-1/7 border-r-2 p-2">Lead Status</th>
                <th className="w-1/4 border-r-2 p-2">Name</th>
                <th className="w-1/6 border-r-2 p-2">Phone</th>
                <th className="w-1/4 border-r-2 p-2">Email</th>
                <th className="w-[180px] border-r-2 p-2">Course</th>
                {/* { displayActivity ? (<th className="w-1/7 border-r-2 p-2">Actions</th>) : '' } */}
              </tr>
            </thead>
            <tbody className="bg-[#F5EFFF]">
              {showKanban && records && records.length > 0 ? (
                records.map((d, i) => (
                  <tr key={i} className="border-b border-b-[#CDC1FF] " onClick={(e) => handlerowClick(e,d)}>
                    <td className="w-10 mt-3 flex justify-center accent-slate-200"><input type="checkbox" className="scale-150" checked={selectedRows.includes(d.id)} onChange={(e) => handleCheckBoxChange(e,d.id)} ></input></td>
                    <td className=" text-center text-sm p-3">
                      {formatDate(d.createdAt)}
                    </td>
                    <td className="w-[150px]"> <p className={`rounded-lg text-center ${d.leadStatus == 'Not Contacted' ? 'bg-orange-300' : d.leadStatus == 'Attempted' ? 'bg-green-400' : d.leadStatus == 'Warm Lead' ? 'bg-yellow-400' : d.leadStatus == 'Cold Lead' ? 'bg-red-400' : '' }`}>{d.leadStatus}</p> </td>
                    {/* <td className="w-[200px] text-center text-sm p-3 "><p className={`rounded-lg ${d.leadStatus === "Not Contacted" ? 'bg-orange-200' : d.leadStatus === 'Attempted' ? 'bg-[#B0EBB4]' : d.leadStatus === 'Warm Lead' ? 'bg-[#FFDB5C]' : d.leadStatus === 'Cold Lead' ? 'bg-[#FA7070]' : ''} }`}>{d.status}</p></td> */}
                    <td className="w-1/7 pl-5 text-sm ">{d.leadname}</td>
                    <td className="w-1/7 pl-4 text-sm">{d.phone}</td>
                    <td className="w-1/7 pl-4 text-sm ">{d.email}</td>
                    <td className="w-1/7 text-center text-sm flex flex-col ">
                        {parseCourses(d.course).map((course, index) => (
                          <span
                            key={index}
                            className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded"
                          >
                            {course.name}
                          </span>
                        ))}
                      </td>
                    {/* <td className="w-1/7 text-center text-sm p-3">{d.course.map(i => i.name)}</td> */}
                    {/* <td className="w-1/7 text-center text-sm p-3"><p className={`rounded-lg ${d.course == 'MERN' ? 'bg-red-300' : d.course == 'TOFEL' ? 'bg-[#96F7E2]' : d.course == 'AWS + Devops' ? 'bg-[#90C7FD]' : d.course == 'JFS' ? 'bg-green-300' : d.course =="PFS" ? 'bg-orange-300' : d.course == 'HR Business Partner' ? 'bg-[#92C6FB]': d.course =='HR Generalist' ? 'bg-red-300': d.course == 'HR Analytics' ?'bg-green-300': d.course == 'Spoken English' ? 'bg-red-300' : d.course =='Public Speaking' ? 'bg-[#92C6FB]': d.course == 'Communication Skills'? 'bg-red-300' : d.course == 'Soft Skills' ? 'bg-green-300' : d.course == 'Aptitude' ? 'bg-red-300' : d.course =='IELTS' ? 'bg-[#92C6FB]' : d.course == 'GRE' ? 'bg-green-300' : d.course == 'Azure + Devops' ? 'bg-green-300' : '' }`}>{d.course}</p></td> */}
                    {/* {displayActivity && (
                      <td className="w-1/7 text-center text-sm ">
                      <div className="flex w-full gap-x-2 mx-auto justify-center">
                        <button className=" bg-[#A6F6FF] rounded-lg w-2/5" onClick={() => showUpdateScreen(d)}>Edit<FontAwesomeIcon icon={faPenToSquare} className="text-sm ms-1" /></button>
                        <button className="btn bg-[#FF204E] text-white rounded-lg w-2/5" onClick={() => showPop(d.id)}> delete <FontAwesomeIcon icon={faTrash} className="text-sm"/> </button>                 
                      </div>
                    </td>
                    )} */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center w-full h-[60vh]">
                   
                    <div className="items-center">
                      <img src="./images/nodata.svg" className="w-1/4 h-60 mx-auto"></img>
                      <h1 className=" text-3xl text-center mt-3 ml-10">No Data Found</h1>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>):(<Kanban />) 
          }
        </div>
        {records.length>0 && showKanban && (<div className="w-full h-7 flex justify-center text-sm gap-x-10 items-center">
          <div className="flex">
            <span
              className={`mr-2 ${
                pageConfig.isPrevious ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              onClick={() => handlePageChange(pageDisplay - 1)}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </span>
            {pages.map((page) => (
              <p
                key={page}
                className={`mx-1 ${
                  page === pageDisplay ? "font-semibold" : "font-normal"
                } cursor-pointer`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </p>
            ))}
            <span
              className={`mr-5 ml-2 ${
                pageConfig.isNext ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              onClick={() => handlePageChange(pageDisplay + 1)}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
          </div>
        </div>) }
        {/* ------- Delete Pop up ----------- */}
        { deletePopUp && (
          <div
          id="deleteModal"
          className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center ">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
           <img src="./images/delete.svg"></img>
            <h2 className="text-lg font-bold text-red-800 mt-2 text-center">Confirm Deletion</h2>

            <p className="text-gray-600 mt-4">
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
        {/* ------delete pop up ended ----------- */}
        {
          showCreateLead && (
            <CreateLead closeForm={closeForm} />
          )
        }
        {
          showupdate && (
           <UpdateLead hideUpdateScreen={hideUpdateScreen} updateData={selectedLead}/> 
          )
        }

        {
          showConvert && (
            <div className="absolute top-0 left-0 w-full h-[100vh] bg-black bg-opacity-70 content-center">
              <div className="w-2/5 h-3/4 bg-[#F5EFFF] rounded-lg mx-auto items-center text-center">
                <div className="flex justify-end h-14 rounded-t-md w-full bg-[#CDC1FF] ">
                  <button className="mr-5 content-center" onClick={() => setShowConvert(false)}><FontAwesomeIcon icon={faXmark} className="text-3xl"/></button>
                </div>
                <img src="./images/convert.svg" className="w-full h-3/5"></img>
                <p className="m-4">Convert Into corresponding</p>
                <div className="flex gap-x-4 mx-auto w-72 m-8">
                  <button className="w-36 p-2 rounded-md bg-[#E5D9F2] border border-[#A594F9]" onClick={convertLeadToOpp}>To Oppurtunity</button>
                  <button className="w-36 p-2 rounded-md bg-[#A594F9] text-white" onClick={convertLeadToLearner}>To Learners</button>
                </div>
              </div>
            </div>
          )
        }

      </div>
    </div>
  );
}
