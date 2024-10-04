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
import { motion } from "framer-motion";



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


  const showUpdateScreen = () => {
    if (selectedRows.length !== 1) {
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
    if (e.target.type === 'checkbox' || e.target.tagName === 'LABEL') {
      return; // Do nothing if the click was on the checkbox or its label
    }
    setSelectedLead(lead);
    setShowUpdate(true);
  };


 
  
  const dataOpp = {
    name : records.name || "",
    cc : records.cc || "",
    phone : records.phone || "",
    email : records.email || "",
    feeQuoted : records.feeQuoted || "",
      batchTiming : records.batchTiming || "",
      leadStatus : records.leadStatus || "",
      stack : records.stack || "",
      ClassMode : records.ClassMode || "",
      opportunityStatus : records.opportunityStatus || "",
      opportunitySatge : records.opportunitySatge || "",
      DemoAttendedStage : records.DemoAttendedStage || "",
      visitedStage : records.visitedStage || "",
      lostOpportunityReason : records.lostOpportunityReason || "",
      nextFollowUp : records.nextFollowUp || "",
      leadSource : records.leadSource || "",
      course : "",
      // course : records.course || "",
      description : records.description || "",
  }


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
          // const deleteRequest = axios.delete(`${ApiUrl}/api/leads/${id}`);
          const postRequest = axios.post(`${ApiUrl}/api/opportunity`,dataOpp)
      
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
    <div className="w-full p-4 min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
      <ToastContainer />
      <div className="w-[95%] h-auto mx-auto border-2 border-indigo-300 p-4 rounded-lg shadow-lg bg-white">
        <div className="flex items-center w-full justify-between mb-6">
          <div className="flex w-72 gap-x-4 items-center">
            <FontAwesomeIcon
              icon={faAddressCard}
              className="text-3xl bg-indigo-600 text-white p-2 rounded-full"
            />
            <select
              className="w-60 outline-none bg-transparent text-xl font-semibold text-indigo-800"
              value={selectedFilter}
              onChange={handleFilterChange}
            >
              <option>All Leads</option>
              <option>Today's Leads</option>
              <option>Yesterday's leads</option>
              <option>This week Leads</option>
              <option>Last Month Leads</option>
            </select>
          </div>
          <div className="flex gap-4">
            <button 
              className="px-4 py-2 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105" 
              onClick={() => setShowCreateLead(true)}
            >
              Create Lead
              <FontAwesomeIcon icon={faChevronDown} className="ml-2"/>
            </button>
            <div className="relative">
              <button
                className={`px-4 py-2 rounded-full border-2 border-indigo-600 font-semibold ${displayActivity ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'} hover:bg-indigo-700 hover:text-white transition duration-300 ease-in-out transform hover:scale-105`}
                onClick={() => setDisplayActivity(!displayActivity)}
              >
                Action
                <FontAwesomeIcon icon={displayActivity ? faXmark : faChevronDown} className="ml-2" />
              </button>
              {displayActivity && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10">
                  <button className="w-full p-2 text-left hover:bg-indigo-100 text-indigo-800" onClick={showUpdateScreen}>
                    Update <FontAwesomeIcon icon={faPenToSquare} className="float-right" />
                  </button>
                  <button className="w-full p-2 text-left hover:bg-indigo-100 text-red-600" onClick={showPop}>
                    Delete <FontAwesomeIcon icon={faTrash} className="float-right" />
                  </button>
                  <button className="w-full p-2 text-left hover:bg-indigo-100 text-green-600" onClick={showConvertForm}>
                    Convert <FontAwesomeIcon icon={faLink} className="float-right" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center mb-6">
          <input
            type="search"
            className="flex-grow mr-4 border-2 border-indigo-300 p-2 rounded-full outline-none bg-white focus:border-indigo-500 transition duration-300"
            placeholder="Search by name or phone"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="flex flex-wrap justify-center gap-2">
            {["All Leads", "Not Contacted", "Attempted", "Warm Lead", "Cold Lead"].map((status) => (
              <button
                key={status}
                className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ease-in-out ${
                  selectedFilter === status
                    ? 'bg-indigo-600 text-white'
                    : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
                }`}
                onClick={() => handleStatusClick(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-6 flex justify-end">
          <div className="inline-flex rounded-md shadow-sm border border-indigo-600 rounded-lg">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                showKanban
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-indigo-600 hover:bg-indigo-50'
              }`}
              onClick={() => setShowKanban(true)}
            >
              <FontAwesomeIcon icon={faTable} className="mr-2" /> Table
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                !showKanban
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-indigo-600 hover:bg-indigo-50'
              }`}
              onClick={() => setShowKanban(false)}
            >
              <FontAwesomeIcon icon={faChartBar} className="mr-2" /> Kanban
            </button>
          </div>
        </div>
        <div className="w-full overflow-x-auto border border-indigo-200 rounded-lg shadow-md">
          {showKanban ? (
            <table className="w-full">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="w-10 p-3 accent-neutral-900">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                      onChange={(e) => setSelectedRows(e.target.checked ? records.map(record => record.id) : [])}
                    />
                  </th>
                  <th className="p-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Created on</th>
                  <th className="p-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Lead Status</th>
                  <th className="p-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Name</th>
                  <th className="p-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Phone</th>
                  <th className="p-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Email</th>
                  <th className="p-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Course</th>
                </tr>
              </thead>
              <tbody>
                {showKanban && records && records.length > 0 ? (
                  records.map((d, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="bg-white hover:bg-indigo-50 transition-colors duration-200"
                      onClick={(e) => handlerowClick(e, d)}
                    >
                      <td className="p-3 accent-slate-100	">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                          checked={selectedRows.includes(d.id)}
                          onChange={(e) => handleCheckBoxChange(e, d.id)}
                        />
                      </td>
                      <td className="p-3 text-sm text-gray-800">{formatDate(d.createdAt)}</td>
                      <td className="p-3">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          d.leadStatus === 'Not Contacted' ? 'bg-yellow-100 text-yellow-800' :
                          d.leadStatus === 'Attempted' ? 'bg-blue-100 text-blue-800' :
                          d.leadStatus === 'Warm Lead' ? 'bg-green-100 text-green-800' :
                          d.leadStatus === 'Cold Lead' ? 'bg-red-100 text-red-800' : ''
                        }`}>
                          {d.leadStatus}
                        </span>
                      </td>
                      <td className="p-3 text-sm text-gray-800">{d.leadname}</td>
                      <td className="p-3 text-sm text-gray-800">{d.phone}</td>
                      <td className="p-3 text-sm text-gray-800">{d.email}</td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {parseCourses(d.course).map((course, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full"
                            >
                              {course.name}
                            </span>
                          ))}
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-4">
                      <div className="flex flex-col items-center justify-center">
                        <img src="./images/nodata.svg" className="w-1/4 h-60 mb-4" alt="No data" />
                        <h1 className="text-2xl font-semibold text-gray-500">No Data Found</h1>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <Kanban />
          )}
        </div>
        {records.length > 0 && showKanban && (
          <div className="mt-4 flex justify-center items-center space-x-2">
            <button
              className={`p-2 px-4 rounded-full ${
                pageConfig.isPrevious ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600 cursor-not-allowed'
              }`}
              onClick={() => handlePageChange(pageDisplay - 1)}
              disabled={!pageConfig.isPrevious}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            {pages.map((page) => (
              <button
                key={page}
                className={`px-3 py-1 rounded-full ${
                  page === pageDisplay ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-indigo-100'
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            <button
              className={`p-2 px-4 rounded-full ${
                pageConfig.isNext ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600 cursor-not-allowed'
              }`}
              onClick={() => handlePageChange(pageDisplay + 1)}
              disabled={!pageConfig.isNext}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        )}
      </div>
      {deletePopUp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <img src="./images/delete.svg" alt="Delete confirmation" className="w-60 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">Confirm Deletion</h2>
            <p className="text-gray-600 mb-6 text-center">
              Are you sure you want to delete this item? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-200"
                onClick={() => setDeletePopUp(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {showCreateLead && <CreateLead closeForm={closeForm} />}
      {showupdate && <UpdateLead hideUpdateScreen={hideUpdateScreen} updateData={selectedLead} />}
      {showConvert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md overflow-hidden">
            <div className="bg-indigo-100 p-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-indigo-800">Convert Lead</h2>
              <button onClick={() => setShowConvert(false)}>
                <FontAwesomeIcon icon={faXmark} className="text-2xl text-indigo-600 hover:text-indigo-800" />
              </button>
            </div>
            <div className="p-6">
              <img src="./images/convert.svg" alt="Convert" className="w-48 h-48 mx-auto mb-6" />
              <p className="text-center text-gray-600 mb-6">Convert into corresponding</p>
              <div className="flex justify-center space-x-4">
                <button
                  className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded hover:bg-indigo-200 transition duration-200"
                  onClick={convertLeadToOpp}
                >
                  To Opportunity
                </button>
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-200"
                  onClick={convertLeadToLearner}
                >
                  To Learners
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
