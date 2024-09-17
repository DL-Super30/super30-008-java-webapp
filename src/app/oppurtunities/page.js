'use client'

import React,{useState,useEffect} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown,faChevronLeft,faChevronRight,faTable,faChartBar,faPenToSquare,faTrash } from "@fortawesome/free-solid-svg-icons";
import KanbanOppurtunity from "../kanbanOppurtunity/page";

export default function Oppurtunities(){

    const [records, setRecords] = useState([]);
  const [pageConfig, setPageConfig] = useState({});
  const [pageDisplay, setPageDisplay] = useState(1);
  const [pages, setPages] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All Leads");
  const [searchTerm, setSearchTerm] = useState(""); 
  const [showKanban , setShowKanban] = useState(false);
  const [displayActivity,setDisplayActivity] = useState(false);
 
  


  const recordsPerPage = 10;

  useEffect(() => {
    getLastRecords();
  }, [pageDisplay,selectedFilter, searchTerm]); 

  

  const getLastRecords = async () => {
    try {
      let response = await fetch(`http://localhost:3001/signUpData?_page=1&_per_page=1000`, { method: "GET" });
      const data = await response.json();
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
      case "Today's Oppurtunities":
        filteredRecords = filteredRecords.filter(record => {
          const recordDate = new Date(record.date);
          return recordDate.toDateString() === today.toDateString();
        });
        break;
      case "Yesterday's Oppurtunities":
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        filteredRecords = filteredRecords.filter(record => {
          const recordDate = new Date(record.date);
          return recordDate.toDateString() === yesterday.toDateString();
        });
        break;
      case "This week Oppurtunities":
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        filteredRecords = filteredRecords.filter(record => {
          const recordDate = new Date(record.date);
          return recordDate >= startOfWeek && recordDate <= today;
        });
        break;
      case "Last Month Oppurtunities":
        const startOfMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        filteredRecords = filteredRecords.filter(record => {
          const recordDate = new Date(record.date);
          return recordDate >= startOfMonth && recordDate <= endOfMonth;
        });
        break;
        // case "visiting":
        // filteredRecords = filteredRecords.filter(record => record.visitStatus === "visiting");
        // break;
      case "visited":
        filteredRecords = filteredRecords.filter(record => record.visitStatus === "visited");
        break;
      case "Demo Attended":
        filteredRecords = filteredRecords.filter(record => record.visitStatus === "Demo Attended");
        break;
      case "Lost Oppurtunity":
        filteredRecords = filteredRecords.filter(record => record.visitStatus === "Lost Opputunity");
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
  

 


    return (
        <div className="pt-[75px] p-4"> 
            <div className="w-full h-[87vh] border-2 rounded-lg p-4">
                <div className="w-full flex justify-between items-center">
                    <div className="flex gap-x-4">
                        <h1><FontAwesomeIcon icon={faAddressCard} className="text-2xl bg-[#1B96FF] rounded text-white p-2" /></h1>
                        <select className="text-xl outline-none" value={selectedFilter} onChange={handleFilterChange}>
                            <option className="text-md">All Oppurtunities</option>
                            <option className="text-md">My Oppurtunities</option>
                            <option className="text-md">Today's Oppurtunities</option>
                            <option className="text-md">Yesterday's Oppurtunities</option>
                            <option className="text-md">This week Oppurtunities</option>
                            <option className="text-md">Last Month Oppurtunities</option>
                        </select>
                    </div>
                    <div className="gap-x-2 flex items-center">
                        <button className="w-44 p-1 bg-[#1B96FF] text-white rounded text-md">Create Oppurtunity <span><FontAwesomeIcon icon={faChevronDown} className="text-sm"/></span></button>
                        <button className="w-36 p-1 border rounded" onClick={() => !displayActivity ? setDisplayActivity(true) : setDisplayActivity(false)}>Action <span><FontAwesomeIcon icon={faChevronDown} className="text-sm"/></span></button>
                    </div>
                </div>
                <div className="flex gap-x-4 mt-3 items-center">
                    <input type="search" className="border outline-none rounded w-72 p-1" placeholder="search" value={searchTerm} onChange={handleSearchChange}/>
                    <div className="w-2/5 flex justify-between items-center">
                        <button className={`flex w-full p-1 border justify-center ${selectedFilter === 'All Oppurtunities' ? 'bg-blue-500 text-white ' : 'bg-white'}`} onClick={() =>handleStatusClick("All Oppurtunities")}>All Oppurtunities </button>
                        {/* <button className={`flex w-full p-1 border justify-center ${selectedFilter === 'visiting' ? 'bg-blue-500 text-white ' : 'bg-white'}`} onClick={() =>handleStatusClick("visiting")}>Visiting</button> */}
                        <button className={`flex w-full p-1 border justify-center ${selectedFilter === 'visited' ? 'bg-blue-500 text-white ' : 'bg-white'}`} onClick={() =>handleStatusClick("visited")}>Visited</button>
                        <button className={`flex w-full p-1 border justify-center ${selectedFilter === 'Demo Attended' ? 'bg-blue-500 text-white ' : 'bg-white'}`} onClick={() =>handleStatusClick("Demo Attended")}>Demo Attended</button>
                        <button className={`flex w-full p-1 border justify-center ${selectedFilter === 'Lost Oppurtunity' ? 'bg-blue-500 text-white ' : 'bg-white'}`} onClick={() =>handleStatusClick("Lost Oppurtunity")}>Lost Oppurtunity</button>
                    </div>
                    <div className="flex">
                      <button className={`w-36 p-1 border ${showKanban ? 'bg-white' : 'bg-[#1B96FF] text-white'}`} onClick={() => setShowKanban(false)}><FontAwesomeIcon icon={faTable} className="text-lg" /> Table</button>
                      <button className={`w-36 p-1 border ${showKanban ?  'bg-[#1B96FF] text-white' :'bg-white'}`} onClick={() => setShowKanban(true)}><FontAwesomeIcon icon={faChartBar} />Kanban</button>
                    </div>
                </div>
                
                    {
                      showKanban ? ( <KanbanOppurtunity />) : (
                      <table className="w-full mt-2 border-2">
                        <thead className="border-2">
                        <tr>
                            <th className="w-1/7 border-r-2 p-1">Created on</th>
                            <th className="w-1/7 border-r-2 p-1">Oppurtunity Status</th>
                            <th className="w-1/7 border-r-2 p-1">Name</th>
                            <th className="w-1/7 border-r-2 p-1">Phone</th>
                            <th className="w-1/7 border-r-2 p-1">Stack</th>
                            <th className="w-1/7 p-1">Course</th>
                            { displayActivity ? (
                            <th className="w-1/7 border-l-2 p-1">Actions</th>
                            ):'' }
                        </tr>
                        </thead>
                        <tbody>
                            {
                                records && records.length>0? (records.map((d, i) => (
                                    <tr key={i} className="border-b">
                                      <td className="w-1/7 text-center text-sm p-3">
                                        {new Date(d.date).toISOString().split("T")[0]}
                                      </td>
                                      <td className="w-1/7 text-center text-sm p-3 "><p className={`rounded-lg ${d.status === "Not Contacted" ? 'bg-orange-300' : d.status === 'Attempted' ? 'bg-green-400' : d.status === 'Warm Lead' ? 'bg-yellow-300' : d.status === 'Cold Lead' ? 'bg-red-400' : ''} }`}>{d.status}</p></td>
                                      <td className="w-1/7 text-center text-sm p-3">{d.name}</td>
                                      <td className="w-1/7 text-center text-sm p-3">{d.phone}</td>
                                      <td className="w-1/7 text-center text-sm p-3 "><p className={`rounded-lg ${d.stack == "Life Skill" ? 'bg-[#FECACC]' : d.stack == "Study Abroad" ? "bg-[#9EF4E7]":d.stack =="HR" ? 'bg-[#94C3FC]':'' }`}>{d.stack}</p></td>
                                      <td className="w-1/7 text-center text-sm p-3 "><p className={`rounded-lg ${d.course == 'MERN' ? 'bg-red-300' : d.course == 'TOFEL' ? 'bg-[#96F7E2]' : d.course == 'AWS + Devops' ? 'bg-[#90C7FD]' : d.course == 'JFS' ? 'bg-green-300' : d.course =="PFS" ? 'bg-orange-300' : d.course == 'HR Business Partner' ? 'bg-[#92C6FB]': d.course =='HR Generalist' ? 'bg-red-300': d.course == 'HR Analytics' ?'bg-green-300': d.course == 'Spoken English' ? 'bg-red-300' : d.course =='Public Speaking' ? 'bg-[#92C6FB]': d.course == 'Communication Skills'? 'bg-red-300' : d.course == 'Soft Skills' ? 'bg-green-300' : d.course == 'Aptitude' ? 'bg-red-300' : d.course =='IELTS' ? 'bg-[#92C6FB]' : d.course == 'GRE' ? 'bg-green-300' : d.course == 'Azure + Devops' ? 'bg-green-300' : '' }`}>{d.course}</p></td>
                                      { displayActivity ? (
                                      <td className="w-[200px] text-center text-sm ">
                                        <div className="flex justify-center gap-x-2">
                                          <button className="w-20 bg-lime-300 rounded-lg">Update <FontAwesomeIcon icon={faPenToSquare} className="text-sm ms-1" /></button>
                                          <button className="w-20 bg-red-500 rounded-lg">Delete <FontAwesomeIcon icon={faTrash} className="text-sm"/></button>
                                        </div>
                                      </td>
                                      ) : '' }                                      
                                    </tr>
                                  ))):(<tr>
                                    <td colSpan={6} className="text-center w-full h-96">
                                     
                                      <div>No Data Found</div>
                                    </td>
                                  </tr>)
                            }
                        </tbody>
                    </table>)
                    }
                    <div className="w-full h-7 flex justify-center text-sm gap-x-10 items-center">
          { showKanban ? '' :(
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
          ) }
        </div>
                
            </div>
        </div>
    )
}