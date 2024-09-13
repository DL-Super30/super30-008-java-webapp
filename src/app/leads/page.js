'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faChartBar } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown, faTable, faChevronRight, faChevronLeft ,faPenToSquare,faTrash} from "@fortawesome/free-solid-svg-icons";
import Kanban from "../kanban/page";
import CreateLead from "../createlead/page";
import LeadForm from "../leadform/page";
import UpdateLead from "../updatelead/page";


export default function DashBoard() {
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


  const recordsPerPage = 10;

  useEffect(() => {
    getLastRecords();
  }, [pageDisplay, selectedFilter, searchTerm]); 

  useEffect( () =>{
    setShowKanban(true)
  },[])

  const getLastRecords = async () => {
    try {
      let response = await fetch(
        `http://localhost:3001/signUpData?_page=1&_per_page=1000`, 
        {
          method: "GET",
        }
      );
      const data = await response.json();

      const sortedRecords = data.data.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA; 
      });

      // Filter records based on the selected filter and search term
      const filteredRecords = filterRecords(sortedRecords);

      // Calculate pagination
      const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
      const paginatedRecords = filteredRecords.slice((pageDisplay - 1) * recordsPerPage, pageDisplay * recordsPerPage);

      // console.log(sortedRecords);
      // console.log(paginatedRecords);

      // Update state with sorted and paginated records
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

  // Function to filter records based on the selected filter and search term
  const filterRecords = (records) => {
    const today = new Date();
    let filteredRecords = records;
  
    switch (selectedFilter) {
      case "Today's Leads":
        filteredRecords = filteredRecords.filter(record => {
          const recordDate = new Date(record.date);
          return recordDate.toDateString() === today.toDateString();
        });
        break;
      case "Yesterday's leads":
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        filteredRecords = filteredRecords.filter(record => {
          const recordDate = new Date(record.date);
          return recordDate.toDateString() === yesterday.toDateString();
        });
        break;
      case "This week Leads":
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        filteredRecords = filteredRecords.filter(record => {
          const recordDate = new Date(record.date);
          return recordDate >= startOfWeek && recordDate <= today;
        });
        break;
      case "Last Month Leads":
        const startOfMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        filteredRecords = filteredRecords.filter(record => {
          const recordDate = new Date(record.date);
          return recordDate >= startOfMonth && recordDate <= endOfMonth;
        });
        break;
        case "Not Contacted":
        filteredRecords = filteredRecords.filter(record => record.status === "Not Contacted");
        break;
      case "Attempted":
        filteredRecords = filteredRecords.filter(record => record.status === "Attempted");
        break;
      case "Warm Lead":
        filteredRecords = filteredRecords.filter(record => record.status === "Warm Lead");
        break;
      case "Cold Lead":
        filteredRecords = filteredRecords.filter(record => record.status === "Cold Lead");
        break;
      default:
        break;
    }

    // Apply search filter based on the search term
    if (searchTerm) {
      filteredRecords = filteredRecords.filter(record =>
        record.name.toLowerCase().includes(searchTerm.toLowerCase()) || record.phone.includes(searchTerm)
      );
    }

    return filteredRecords;
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pages.length) {
      setPageDisplay(newPage);
    }
  };

  // Function to handle filter changes
  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    setPageDisplay(1); 
  };

  // Function to handle search input changes
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
    setLeadId(e)
    setDeletePopUp(true)

  }

  const confirmDelete =async () =>{
    try {
      await fetch(`http://localhost:3001/signUpData/${leadId}`, { method: "DELETE" });
      getLastRecords();
      setDeletePopUp(false)
    } 
    catch (err) {
      console.log(err);
    }
  }
  const showUpdateScreen =async ( _updateLeadId) =>{
    setShowUpdate(true)
    try {
      await fetch(`http://localhost:3001/signUpData/${leadId}`, { method: "PUT" });
      
      
    } 
    catch (err) {
      console.log(err);
    }
  }

  const hideUpdateScreen = ( ) =>{
    setShowUpdate(false)
  }

  


  return (
    <div className="w-full pt-[70px]">
      <div className="w-[95%] h-auto mx-auto border-2 p-2 rounded">
        <div className="flex items-center w-full justify-between">
          <div className="flex w-60 justify-between">
            <FontAwesomeIcon
              icon={faAddressCard}
              className="text-3xl bg-[#1B96FF] text-white p-2 rounded"
            />
            <select
              className="w-40 outline-none"
              value={selectedFilter}
              onChange={handleFilterChange}
            >
              <option>All Leads</option>
              <option>My Leads</option>
              <option>Today's Leads</option>
              <option>Yesterday's leads</option>
              <option>This week Leads</option>
              <option>Last Month Leads</option>
            </select>
          </div>
          <div className="w-72 flex justify-between">
          
              <button className="w-32 rounded bg-[#1B96FF] p-2 text-white" onClick={() =>setShowCreateLead(true)}>
                Create Lead
                <span>
                  <FontAwesomeIcon icon={faChevronDown} />
                </span>
              </button>
            
            <button
              className="w-32 border-2 rounded p-2"
              onClick={() => setDisplayActivity(true)}
              onDoubleClick={() => setDisplayActivity(false)}
            >
              Action
              <span>
                <FontAwesomeIcon icon={faChevronDown} />
              </span>
            </button>
          </div>
        </div>
        <div className="mt-3 flex">
          <input
            type="search"
            className="border p-1 rounded w-72 outline-none"
            placeholder="Search by name or phone"
            value={searchTerm}
            onChange={handleSearchChange} />
          <div className="flex w-3/5 justify-evenly items-center border-lg ml-3">
            <button className={`flex w-full p-1 border justify-center ${selectedFilter === 'All Leads' ? 'bg-blue-500 text-white ' : 'bg-white'}`} onClick={() =>handleStatusClick("All Leads")}>All leads </button>
            <button className={`w-full border p-1 text-center flex justify-center ${selectedFilter === 'Not Contacted' ? 'bg-blue-500 text-white' : 'bg-white'}`} onClick={() =>handleStatusClick("Not Contacted")}>Not Contacted </button>
            <button className={`w-full border p-1 text-center flex justify-center ${selectedFilter === 'Attempted' ? 'bg-blue-500 text-white' : 'bg-white'}`} onClick={() =>handleStatusClick("Attempted")}>Attempted </button>
            <button className={`w-full border p-1 text-center flex justify-center ${selectedFilter === 'Warm Lead' ? 'bg-blue-500 text-white' : 'bg-white'}`} onClick={() =>handleStatusClick("Warm Lead")}>Warm Leads </button>
            <button className={`w-full border p-1 text-center flex justify-center ${selectedFilter === 'Cold Lead' ? 'bg-blue-500 text-white' : 'bg-white'}`} onClick={() =>handleStatusClick("Cold Lead")}>Cold Leads </button>

          </div>
          <div className="w-60 border rounded ml-8">
            <button className={`w-1/2 p-1 border ${showKanban ?  'bg-[#1B96FF] text-white' :'bg-white'}` } onClick={() =>setShowKanban(true)}><FontAwesomeIcon icon={faTable} className="text-xl" /> Table</button>
            <button className={`w-1/2 p-1 border ${showKanban ? 'bg-white' : 'bg-[#1B96FF] text-white'}` } onClick={() =>setShowKanban(false)}><FontAwesomeIcon icon={faChartBar} /> Kanban</button>
          </div>
        </div>
        <div className="w-full h-auto border-2 mt-5">
          {showKanban ? ( 
           <table className="w-full">
            <thead className="border-b-2">
              <tr>
                <th className="w-1/7 border-r-2 p-2">Created on</th>
                <th className="w-1/7 border-r-2 p-2">Lead Status</th>
                <th className="w-1/7 border-r-2 p-2">Name</th>
                <th className="w-1/7 border-r-2 p-2">Phone</th>
                <th className="w-1/7 border-r-2 p-2">Email</th>
                <th className="w-1/7 border-r-2 p-2">Course</th>
                <th className="w-1/7 border-r-2 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {showKanban && records && records.length > 0 ? (
                records.map((d, i) => (
                  <tr key={i} className="border-b">
                    <td className="w-1/7 text-center text-sm p-3">
                      {new Date(d.date).toISOString().split("T")[0]}
                    </td>
                    <td className="w-1/7 text-center text-sm p-3 "><p className={`rounded-lg ${d.status === "Not Contacted" ? 'bg-orange-300' : d.status === 'Attempted' ? 'bg-green-400' : d.status === 'Warm Lead' ? 'bg-yellow-300' : d.status === 'Cold Lead' ? 'bg-red-400' : ''} }`}>{d.status}</p></td>
                    <td className="w-1/7 text-center text-sm p-3">{d.name}</td>
                    <td className="w-1/7 text-center text-sm p-3">{d.phone}</td>
                    <td className="w-1/7 text-center text-sm p-3">{d.email}</td>
                    <td className="w-1/7 text-center text-sm p-3"><p className={`rounded-lg ${d.course == 'MERN' ? 'bg-red-300' : d.course == 'TOFEL' ? 'bg-[#96F7E2]' : d.course == 'AWS + Devops' ? 'bg-[#90C7FD]' : d.course == 'JFS' ? 'bg-green-300' : d.course =="PFS" ? 'bg-orange-300' : d.course == 'HR Business Partner' ? 'bg-[#92C6FB]': d.course =='HR Generalist' ? 'bg-red-300': d.course == 'HR Analytics' ?'bg-green-300': d.course == 'Spoken English' ? 'bg-red-300' : d.course =='Public Speaking' ? 'bg-[#92C6FB]': d.course == 'Communication Skills'? 'bg-red-300' : d.course == 'Soft Skills' ? 'bg-green-300' : d.course == 'Aptitude' ? 'bg-red-300' : d.course =='IELTS' ? 'bg-[#92C6FB]' : d.course == 'GRE' ? 'bg-green-300' : d.course == 'Azure + Devops' ? 'bg-green-300' : '' }`}>{d.course}</p></td>
                    {displayActivity && (
                      <td className="w-1/7 text-center text-sm ">
                      <div className="flex w-full gap-x-2 mx-auto justify-center">
                        <button className=" bg-lime-200 rounded-lg w-2/5" onClick={() => showUpdateScreen(d.id)}>Update<FontAwesomeIcon icon={faPenToSquare} className="text-sm ms-1" /></button>
                        <button className="btn bg-red-500 text-white rounded-lg w-2/5" onClick={() => showPop(d.id)}> delete <FontAwesomeIcon icon={faTrash} className="text-sm"/> </button>                 
                      </div>
                    </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center w-full h-96">
                   
                    <div>No Data Found</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>):(<Kanban />) 
          }
        </div>
        <div className="w-full h-7 flex justify-end text-sm gap-x-10 items-center">
          <div className="flex mr-14">
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
        </div>
        {/* ------- Delete Pop up ----------- */}
        { deletePopUp && (
          <div
          id="deleteModal"
          className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center ">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold text-gray-800">Confirm Deletion</h2>

            <p className="text-gray-600 mt-4">
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>
            <div className="flex justify-end mt-6">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                onClick={() =>setDeletePopUp(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
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
            <CreateLead closeForm={closeForm}/>
          )
        }
        {
          showupdate && (
           <UpdateLead hideUpdateScreen={hideUpdateScreen}/> 
          )
        }
      </div>
    </div>
  );
}
