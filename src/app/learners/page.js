'use client'

import React,{useState,useEffect, Fragment} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faChartBar, faChevronDown, faChevronLeft, faChevronRight, faTable, faTrash, faXmark} from '@fortawesome/free-solid-svg-icons';
import LearnersKanban from "../../components/learnersKanban";

export default function Learners(){

    const [records,setRecords] = useState([]);
    const [pages,setPages] = useState([]);
    const [pageConfig, setPageConfig] = useState({});
    const [pageDisplay, setPageDisplay] = useState(1); 
    const [displayActivity ,setDisplayActivity] = useState(false);
    const [showKanban,setShowKanban] = useState(false);
  const [deletePopUp , setDeletePopUp] = useState(false);
  const [leadId,setLeadId] = useState();



    const recordsPerPage = 10;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
        return `${day}/${month}/${year}`
      }



    useEffect( () =>{
        fetchedData();
    },[pageDisplay] )

    const fetchedData = async () =>{
        try{
            const response = await fetch("http://localhost:4000/api/learner?page=1&limit=10")
        const data = await response.json();
        
        const sortedRecords = data.data.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA; 
          });
        

        const totalPages = Math.ceil(sortedRecords.length / recordsPerPage)
      const paginatedRecords = sortedRecords.slice((pageDisplay - 1) * recordsPerPage, pageDisplay * recordsPerPage);
        setRecords(paginatedRecords)

        setPageConfig({
            isPrevious: pageDisplay > 1,
            isNext: pageDisplay < totalPages
          });
    
        const tempArr = []
        for(let i=1;i<=totalPages;i++){
            tempArr.push(i)
        }
        setPages(tempArr);
        }
        catch (err){
            console.log(err)
        }
    }

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pages.length) {
          setPageDisplay(newPage);
        }
      };

      const showPop = (e ) =>{
        setLeadId(e)
        setDeletePopUp(true);
    
      }
    
      const confirmDelete =async () =>{
        try {
          await fetch(`http://localhost:3001/signUpData/${leadId}`, { method: "DELETE" });
          fetchedData();
          setDeletePopUp(false);
        } 
        catch (err) {
          console.log(err); 
        }
      }
    

    return (
        <div className="pt-[70px] p-4 h-[100vh] bg-[#E5D9F2] ">
            <div className="w-full border border-[#CDC1FF] h-[88vh] p-3">
                <div className="flex justify-between">
                    <div className="flex gap-x-5">
                        <p><FontAwesomeIcon icon={faAddressCard}  className="text-white bg-[#A594F9] p-2 text-xl rounded "/></p>
                        <select className="outline-none text-xl bg-[#E5D9F2]">
                            <option>All Learners</option>
                            <option>My Learners</option>
                            <option>Toda's Learners</option>
                            <option>Yesterday's Learners</option>
                            <option>This week Learners</option>
                            <option>Last Month Learners</option>
                        </select>
                    </div>
                    <div className="flex gap-x-2">
                        <button className="w-40 p-2 bg-[#A594F9] text-white rounded">Create Learner</button>
                        <button className="w-40 p-2 border-2 border-[#A594F9] bg-[#CDC1FF] rounded items-center" onClick={() => !displayActivity ? setDisplayActivity(true) : setDisplayActivity(false)}> Action <span className="text-md">{ !displayActivity ? (<FontAwesomeIcon  icon={faChevronDown}/>) : ( <FontAwesomeIcon icon={faXmark}/> ) }</span></button>
                    </div>
                </div>
                <div className="mt-4 flex gap-x-3">
                    <input type="search" className="border border-[#A594F9] bg-[#F5EFFF] outline-none w-72 p-1 rounded-md " placeholder="search"></input>
                    <div className="flex w-1/2">
                        <button className="w-1/4 p-1 border border-[#A594F9] rounded-l-md">Up coming</button>
                        <button className="w-1/4 p-1 border border-[#A594F9]">On Going</button>
                        <button className="w-1/4 p-1 border border-[#A594F9]">On Hold</button>
                        <button className="w-1/4 p-1 border border-[#A594F9] rounded-r-md">Completed</button>
                    </div>
                    <div className="">
                        <button className={`w-36 p-1 rounded-l-md ${!showKanban ? 'bg-[#A594F9] text-white' : 'bg-[#CDC1FF]'}`} onClick={() => setShowKanban(!showKanban)}><FontAwesomeIcon icon={faTable} />Table</button>
                        <button className={`w-36 p-1 rounded-r-md ${showKanban ? 'bg-[#A594F9] text-white' : 'bg-[#CDC1FF]'}`} onClick={() =>setShowKanban(!showKanban)}><FontAwesomeIcon icon={faChartBar} />Kanban</button>
                    </div>
                </div>
                <div className="mt-5">
                    { !showKanban ? (
                        <table className="w-full border border-[#A594F9] mt-3 ">
                        <thead className=" bg-[#A594F9]">
                            <tr className="">
                                <th className="w-1/7 p-2">Created on</th>
                                <th className="w-1/7 p-2">Lead Status</th>
                                <th className="w-1/7 p-2">Name</th>
                                <th className="w-1/7 p-2">Phone</th>
                                <th className="w-1/7 p-2">Stack</th>
                                <th className="w-1/7 p-2">Course</th>
                                {displayActivity && (<th className="w-1/7 p-2 ">Actions</th>) }
                            </tr>
                        </thead>
                        <tbody className="bg-[#F5EFFF]">
                            {records && records.length>0 ? records.map((record ,index) =>(
                                <tr key={index} className="border-b p-1 border-[#CDC1FF] border text-center">
                                    <td className="text-center w-1/7 px-5 p-2">{formatDate(record.createdAt)}</td>
                                    <td className="w-1/7 px-5 p-2">{ record.status}</td>
                                    {/* <td className="w-1/7 px-5 p-2">-</td> */}
                                    <td className="w-1/7 px-5 p-2">{ record.firstname}</td>
                                    <td className="w-1/7 px-5 p-2">{ record.phone}</td>
                                    <td className="text-center w-1/7 px-5 p-2">{ record.stack}</td>
                                    <td className="text-center w-1/7 px-5 p-2"> { record.course}</td>
                                    { displayActivity && (
                                        <td>
                                            <div className="flex justify-center">
                                                <button className="w-20 text-sm bg-[#FF204E] text-center rounded-lg" onClick={() => showPop(record.id)}>Delete <FontAwesomeIcon icon={faTrash} /></button>
                                            </div>
                                        </td>
                                    ) }
                                </tr>
                            )) : <tr >
                                    <td colSpan={6} className="text-center w-full h-96">
                                    <div className="items-center">
                                        <img src="./images/nodata.svg" className="w-1/4 h-60 mx-auto"></img>
                                        <h1 className=" text-3xl text-center mt-3 ml-10">No Data Found</h1>
                                      </div>
                                    </td>
                                </tr> }
                        </tbody>
                    </table>) : (<LearnersKanban />) }
                </div>
                {
                   records.length>0 && !showKanban && (
                    <div className="flex justify-center mt-2">
                        <div className="flex ">
                            <p className={`${pageConfig.isPrevious ? 'cursor-pointer' : 'cursor-not-allowed'}`} onClick={() => handlePageChange(pageDisplay-1)} ><FontAwesomeIcon icon={faChevronLeft} /></p>
                            {pages.map(page => (
                                <p key={page} className={`mx-1 cursor-pointer ${pageDisplay == page ? 'font-bold' : ''} `} onClick={() =>handlePageChange(page)}>{page}</p>
                            ))}
                            <p className={`${pageConfig.isNext?'cursor-pointer' :'cursor-not-allowed'}`} onClick={() => handlePageChange(pageDisplay+1)}><FontAwesomeIcon icon={faChevronRight} /></p>

                        </div>
                    </div>
                    )
                }
            </div>

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

           
        </div>
    )
}