'use client'

import React,{useState,useEffect, Fragment} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faChartBar, faChevronLeft, faChevronRight, faTable, faTrash} from '@fortawesome/free-solid-svg-icons';
import LearnersKanban from "../../components/learnersKanban";

export default function Learners(){

    const [records,setRecords] = useState([]);
    const [pages,setPages] = useState([]);
    const [pageConfig, setPageConfig] = useState({});
    const [pageDisplay, setPageDisplay] = useState(1); 
    const [displayActivity ,setDisplayActivity] = useState(false);
    const [showKanban,setShowKanban] = useState(false);


    const recordsPerPage = 8;



    useEffect( () =>{
        fetchedData();
    },[pageDisplay] )

    const fetchedData = async () =>{
        try{
            const response = await fetch("http://localhost:3001/signUpData?_page=1&_per_page=1000")
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

    

    return (
        <div className="pt-[70px] p-4">
            <div className="w-full border-2 h-[88vh] p-3">
                <div className="flex justify-between">
                    <div className="flex gap-x-5">
                        <p><FontAwesomeIcon icon={faAddressCard}  className="text-white bg-blue-400 p-2 text-xl rounded "/></p>
                        <select className="outline-none text-xl">
                            <option>All Learners</option>
                            <option>My Learners</option>
                            <option>Toda's Learners</option>
                            <option>Yesterday's Learners</option>
                            <option>This week Learners</option>
                            <option>Last Month Learners</option>
                        </select>
                    </div>
                    <div className="flex gap-x-2">
                        <button className="w-40 p-2 bg-blue-400 text-white rounded">Create Learner</button>
                        <button className="w-40 p-2 border-2 rounded" onClick={() => !displayActivity ? setDisplayActivity(true) : setDisplayActivity(false)}>Action</button>
                    </div>
                </div>
                <div className="mt-4 flex gap-x-3">
                    <input type="search" className="border outline-none w-72 p-1 rounded " placeholder="search"></input>
                    <div className="flex w-1/2">
                        <button className="w-1/4 p-1 border">Up coming</button>
                        <button className="w-1/4 p-1 border">On Going</button>
                        <button className="w-1/4 p-1 border">On Hold</button>
                        <button className="w-1/4 p-1 border">Completed</button>
                    </div>
                    <div>
                        <button className={`w-36 p-1 border  ${!showKanban ? 'bg-blue-500 text-white' : 'bg-white'}`} onClick={() => setShowKanban(!showKanban)}><FontAwesomeIcon icon={faTable} />Table</button>
                        <button className={`w-36 p-1 border ${showKanban ? 'bg-blue-500 text-white' : 'bg-white'}`} onClick={() =>setShowKanban(!showKanban)}><FontAwesomeIcon icon={faChartBar} />Kanban</button>
                    </div>
                </div>
                <div className="mt-5">
                    { !showKanban ? (<table className="w-full border mt-3 rounded">
                        <thead className="border-2 bg-[#F8F8F8] ">
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
                        <tbody>
                            { records.map((record ,index) =>(
                                <tr key={index} className="border-b p-1">
                                    <td className="text-center w-1/7 px-5 p-2">{new Date(record.date).toLocaleDateString()}</td>
                                    <td className="w-1/7 px-5 p-2">{ record.status}</td>
                                    <td className="w-1/7 px-5 p-2">{ record.name}</td>
                                    <td className="w-1/7 px-5 p-2">{ record.phone}</td>
                                    <td className="text-center w-1/7 px-5 p-2">{ record.stack}</td>
                                    <td className="text-center w-1/7 px-5 p-2"> { record.course}</td>
                                    { displayActivity && (
                                        <td>
                                            <div className="flex justify-center">
                                                <button className="w-20 text-sm bg-red-500 text-center rounded-lg">Delete <FontAwesomeIcon icon={faTrash} /></button>
                                            </div>
                                        </td>
                                    ) }
                                </tr>
                            )) }
                        </tbody>
                    </table>) : (<LearnersKanban />) }
                </div>
                {
                    !showKanban && (
                        <div className="flex justify-center">
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

           
        </div>
    )
}