'use client'

import React,{useState,useEffect} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown,faChevronLeft,faChevronRight,faTable,faChartBar,faPenToSquare,faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
// import KanbanOppurtunity from "../kanbanOppurtunity/page";
import KanbanOppurtunity from "../kanban/oppurtunityKanban";
import CreateOpportunity from "./createOppurtunity";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateOppurtunity from "./updateoppurtunity";


export default function Oppurtunities(){

    const [records, setRecords] = useState([]);
  const [pageConfig, setPageConfig] = useState({});
  const [pageDisplay, setPageDisplay] = useState(1);
  const [pages, setPages] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All Leads");
  const [searchTerm, setSearchTerm] = useState(""); 
  const [showKanban , setShowKanban] = useState(false);
  const [displayActivity,setDisplayActivity] = useState(false);
  const [deletePopUp,setDeletePopUp] = useState(false);
  const [leadId,setLeadId] = useState();
  const [showUpdate,setShowUpdate] = useState(false);
  const [showCreateOpp, setShowCreateOpp] = useState(false);
  const [selectedRows , setSelectedRows] = useState([]);
  const [selectLeadId,setSelectLeadId] = useState(null);
  const [opportunityData, setOpputunityData] = useState(null);



  const recordsPerPage = 10;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`
  }

  useEffect(() => {
    getLastRecords();
  }, [pageDisplay,selectedFilter, searchTerm]); 

  

  const getLastRecords = async () => {
    const ApiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      let response = await fetch(`${ApiUrl}/api/opportunity?page=1&limit=10`, { method: "GET" });
      const data = await response.json();
      console.log(data.data)
      const sortedRecords = data.data.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA ; 
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
      case "All Oppurtunities":
        filteredRecords ;
        break;
      case "Today's Oppurtunities":
        filteredRecords = filteredRecords.filter(record => {
          const recordDate = new Date(record.createdAt);
          return recordDate.toDateString() === today.toDateString();
        });
        break;
      case "Yesterday's Oppurtunities":
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        filteredRecords = filteredRecords.filter(record => {
          const recordDate = new Date(record.createdAt);
          return recordDate.toDateString() === yesterday.toDateString();
        });
        break;
      case "This week Oppurtunities":
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        filteredRecords = filteredRecords.filter(record => {
          const recordDate = new Date(record.createdAt);
          return recordDate >= startOfWeek && recordDate <= today;
        });
        break;
      case "Last Month Oppurtunities":
        const startOfMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        filteredRecords = filteredRecords.filter(record => {
          const recordDate = new Date(record.createdAt);
          return recordDate >= startOfMonth && recordDate <= endOfMonth;
        });
        break;
        case "Visiting":
        filteredRecords = filteredRecords.filter(record => record.opportunityStatus === "Visiting");
        break;
        // case "All Oppurtunities":
        //   filteredRecords = filteredRecords.filter(record => record.status === "All Oppurtunities");
        //   break;
      case "visited":
        filteredRecords = filteredRecords.filter(record => record.opportunityStatus === "Visited");
        break;
      case "Demo Attended":
        filteredRecords = filteredRecords.filter(record => record.opportunityStatus === "Demo Attended");
        break;
      case "Lost Oppurtunity":
        filteredRecords = filteredRecords.filter(record => record.opportunityStatus === "Lost Oppurtunity");
        break;
      default:
        break;
    }

    // Apply search filter based on the search term
    if (searchTerm) {
      filteredRecords = filteredRecords.filter(record => {
        const name = record.name ? record.name.toLowerCase() : "";
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

  const confirmDelete =async () =>{
    try {
      // await fetch(`http://localhost:4000/api/opportunity/${leadId}`, { method: "DELETE" });
      await Promise.all(selectedRows.map(id => fetch(`http://localhost:4000/api/opportunity/${id}`,{method : "DELETE"})))
      toast.success('Deleted !', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      setTimeout(() =>{
        getLastRecords();
        setDeletePopUp(false)
        window.location.reload()
      },1500)
    } 
    catch (err) {
      console.log(err); 
      toast.warn('Failed to Delete ', {
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
  }

  const showPop = (e ) =>{
    
    if(selectedRows.length == 0) {
      toast.warn('Select atleast one record !', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })
    }
    else{
      setLeadId(e)
      setDeletePopUp(true);
    }

  }

  const handleCheckboxChange = (recordId) => {
    setSelectedRows(prev => {
      if(prev.includes(recordId)){
        return prev.filter(id => id !== recordId)
      }
      else{
        return [...prev,recordId]
      }
    })
  }

  const showUpdateScreen = (oppdata) => {
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
      const selectOpportunity =records.find(record => record.id === selectedRows[0]);
      setOpputunityData(selectOpportunity);
      setShowUpdate(true);
    }
  };

  const handleRowClick =(oppdata) =>{
    setOpputunityData(oppdata)
    setShowUpdate(true)
  }

  
  

 


    return (
        <div className=" p-4 bg-[#E5D9F2] h-[91vh]"> 
        <ToastContainer />
            <div className="w-full h-[87vh] border border-[#CDC1FF] rounded-lg p-4">
                <div className="w-full flex justify-between items-center">
                    <div className="flex gap-x-4">
                        <h1><FontAwesomeIcon icon={faAddressCard} className="text-2xl bg-[#A594F9] rounded text-white p-2" /></h1>
                        <select className="text-xl outline-none bg-[#E5D9F2]" value={selectedFilter} onChange={handleFilterChange}>
                            <option className="text-md">All Oppurtunities</option>
                            {/* <option className="text-md">My Oppurtunities</option> */}
                            <option className="text-md">Today's Oppurtunities</option>
                            <option className="text-md">Yesterday's Oppurtunities</option>
                            <option className="text-md">This week Oppurtunities</option>
                            <option className="text-md">Last Month Oppurtunities</option>
                        </select>
                    </div>
                    <div className="gap-x-2 flex items-center ">
                        <button className="w-44 p-1 bg-[#A594F9] font-semibold text-white rounded text-md " onClick={() => setShowCreateOpp(true)}>Create Oppurtunity <span><FontAwesomeIcon icon={faChevronDown} className="text-sm"/></span></button>
                        <button className={`w-36 p-1 border border-[#A594F9] font-semibold rounded bg-[#CDC1FF] `} onClick={() => !displayActivity ? setDisplayActivity(true) : setDisplayActivity(false)}>Action <span>{ !displayActivity ? (<FontAwesomeIcon icon={faChevronDown} className="text-sm"/>) : (<FontAwesomeIcon icon={faXmark} className="text-sm"/>)}</span></button>
                    </div>
                    {
                      displayActivity && (
                        <div className="w-36 absolute top-[18.5%] right-[2.1%] bg-[#F5F7F8] ease-in-out">
                          <button className="w-full  p-2 text-blue-500" onClick={showUpdateScreen}>Update <FontAwesomeIcon icon={faPenToSquare} className="ms-1"/> </button>
                          <button className="w-full  p-2 text-red-500" onClick={showPop}>Delete<FontAwesomeIcon icon={faTrash} className="ms-2  " /> </button>
                        </div>
                      )
                    }
                </div>
                <div className="flex gap-x-4  mt-3 items-center">
                    <input type="search" className="border border-[#A594F9] px-5 outline-none rounded-md w-80 p-1 bg-[#F5EFFF]" placeholder="search" value={searchTerm} onChange={handleSearchChange}/>
                    <div className="w-1/2 flex justify-between items-center">
                        <button className={`flex w-full p-1 border border-[#A594F9] justify-center rounded-l-md  ${selectedFilter === 'All Oppurtunities' ? 'bg-[#A594F9] text-white ' : 'bg-[#CDC1FF]'}`} onClick={() =>handleStatusClick("All Oppurtunities")}>All Oppurtunities </button>
                        <button className={`flex w-full p-1 border justify-center border-[#A594F9]   ${selectedFilter === 'Visiting' ? 'bg-[#A594F9] text-white ' : 'bg-[#CDC1FF]'}`} onClick={() =>handleStatusClick("Visiting")}>Visiting</button>
                        <button className={`flex w-full p-1 border border-[#A594F9] justify-center ${selectedFilter === 'visited' ? 'bg-[#A594F9] text-white ' : 'bg-[#CDC1FF]'}`} onClick={() =>handleStatusClick("visited")}>Visited</button>
                        <button className={`flex w-full p-1 border border-[#A594F9] justify-center ${selectedFilter === 'Demo Attended' ? 'bg-[#A594F9] text-white ' : 'bg-[#CDC1FF]'}`} onClick={() =>handleStatusClick("Demo Attended")}>Demo Attended</button>
                        <button className={`flex w-full p-1 border border-[#A594F9] justify-center rounded-r-md ${selectedFilter === 'Lost Oppurtunity' ? 'bg-[#A594F9] text-white ' : 'bg-[#CDC1FF]'}`} onClick={() =>handleStatusClick("Lost Oppurtunity")}>Lost Oppurtunity</button>
                    </div>
                    <div className="flex border border-[#5A639C] rounded-md">
                      <button className={`w-36 p-1 rounded-l-md ${showKanban ? 'bg-[#CDC1FF]' : 'bg-[#A594F9] text-white'}`} onClick={() => setShowKanban(false)}><FontAwesomeIcon icon={faTable} className="text-lg" /> Table</button>
                      <button className={`w-36 p-1  rounded-r-md ${showKanban ?  'bg-[#A594F9] text-white' :'bg-[#CDC1FF]'}`} onClick={() => setShowKanban(true)}><FontAwesomeIcon icon={faChartBar} />Kanban</button>
                    </div>
                </div>
                
                    {
                      showKanban ? ( <KanbanOppurtunity />) : (
                      <table className="w-full mt-2 border-2">
                        <thead className="bg-[#CDC1FF]">
                        <tr>
                          <th className="w-10"><input type="checkbox" className="scale-150 accent-neutral-900" onChange={(e) => setSelectedRows(e.target.checked ? records.map(record=> record.id) : []) }></input></th>
                            <th className="w-1/7 border-r-2 p-2">Created on</th>
                            <th className="w-[200px] border-r-2 p-2">Oppurtunity Status</th>
                            <th className="w-1/7 border-r-2 p-2">Name</th>
                            <th className="w-1/7 border-r-2 p-2">Phone</th>
                            <th className="w-1/7 border-r-2 p-2">Stack</th>
                            <th className="w-1/7 p-1">Course</th>
                            {/* { displayActivity ? (
                            <th className="w-1/7 border-l-2 p-1">Actions </th>
                            ):'' } */}
                        </tr>
                        </thead>
                        <tbody className="bg-[#F5EFFF]">
                            {
                                records && records.length>0? (records.map((d, i) => (
                                    <tr key={i} className="border-b border-b-[#CDC1FF]" onClick={() => handleRowClick(d)}>
                                      <td><input type="checkbox" className="w-10 scale-150 m-2 accent-slate-200" checked={selectedRows.includes(d.id)} onChange={() => handleCheckboxChange(d.id)}></input></td>
                                      <td className="w-1/7 text-center text-sm p-3">
                                        {/* {new Date(d.date).toISOString().split("T")[0]} */}
                                        {/* {d.date} */}
                                        {/* {d.date ? new Date(d.date).toISOString().split("T")[0] : 'Invalid Date'} */}
                                        {formatDate(d.createdAt)}

                                      </td>
                                      <td className="w-1/7 text-center text-sm p-3 "><p className={`rounded-lg ${d.opportunityStatus === "Visited" ? 'bg-orange-300' : d.opportunityStatus === 'Visiting' ? 'bg-green-400' : d.opportunityStatus === 'Demo Attended' ? 'bg-yellow-300' : d.opportunityStatus === 'Lost Oppurtunity' ? 'bg-red-400' : ''} }`}>{d.opportunityStatus}</p></td>
                                      <td className="w-1/7 text-center text-sm p-3">{d.name}</td>
                                      <td className="w-1/7 text-center text-sm p-3">{d.phone}</td>
                                      <td className="w-1/7 text-center text-sm p-3 "><p className={`rounded-lg ${d.stack == "Life Skill" ? 'bg-[#FECACC]' : d.stack == "Study Abroad" ? "bg-[#9EF4E7]":d.stack =="HR" ? 'bg-[#94C3FC]':'' }`}>{d.stack}</p></td>
                                      <td className="w-1/7 text-center text-sm p-3 "><p className={`rounded-lg ${d.course == 'MERN' ? 'bg-red-300' : d.course == 'TOFEL' ? 'bg-[#96F7E2]' : d.course == 'AWS + Devops' ? 'bg-[#90C7FD]' : d.course == 'JFS' ? 'bg-green-300' : d.course =="PFS" ? 'bg-orange-300' : d.course == 'HR Business Partner' ? 'bg-[#92C6FB]': d.course =='HR Generalist' ? 'bg-red-300': d.course == 'HR Analytics' ?'bg-green-300': d.course == 'Spoken English' ? 'bg-red-300' : d.course =='Public Speaking' ? 'bg-[#92C6FB]': d.course == 'Communication Skills'? 'bg-red-300' : d.course == 'Soft Skills' ? 'bg-green-300' : d.course == 'Aptitude' ? 'bg-red-300' : d.course =='IELTS' ? 'bg-[#92C6FB]' : d.course == 'GRE' ? 'bg-green-300' : d.course == 'Azure + Devops' ? 'bg-green-300' : '' }`}>{d.course}</p></td>
                                      {/* { displayActivity ? (
                                      <td className="w-[200px] text-center text-sm ">
                                        <div className="flex justify-center gap-x-2">
                                          <button className="w-20 bg-lime-300 rounded-lg">Edit <FontAwesomeIcon icon={faPenToSquare} className="text-sm ms-1" /></button>
                                          <button className="w-20 bg-red-500 rounded-lg" onClick={() => showPop(d.id)}>Delete <FontAwesomeIcon icon={faTrash} className="text-sm"/></button>
                                        </div>
                                      </td>
                                      ) : '' }                                       */}
                                    </tr>
                                  ))):(<tr>
                                    <td colSpan={6} className="text-center w-full h-96">
                                      <div className="items-center">
                                        <img src="./images/nodata.svg" className="w-1/4 h-60 mx-auto"></img>
                                        <h1 className=" text-3xl text-center mt-3 ml-10">No Data Found</h1>
                                      </div>
                                    </td>
                                  </tr>)
                            }
                        </tbody>
                    </table>)
                    }
                    <div className="w-full h-7 flex justify-center text-sm gap-x-10 items-center">
          { showKanban ? '' :(
            <div className="flex ">
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
          ) }
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
          showCreateOpp && (<CreateOpportunity setShowCreateOpp={setShowCreateOpp}/>)
        }
        {showUpdate && (<UpdateOppurtunity setShowUpdate={setShowUpdate} opportunityData={opportunityData}/>)}
        
        </div>
    )
}