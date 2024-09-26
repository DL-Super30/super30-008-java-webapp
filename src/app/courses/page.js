'use client'

import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { faChevronRight,faChevronLeft, faXmark, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import CreateCourse from "../createcourse/page";

export default function Courses() {

        const [records,setRecords] = useState([]);
        const [pages,setPages] = useState([]);
        const [pageDisplay, setPageDisplay] = useState(1);
        const [pageConfig, setPageConfig] = useState({});
        const [searchTerm,setSearchTerm] = useState("")
        const [showCreateCourse,setShowCreateCourse] = useState(false);
        const [displayActivity,setDisplayActivity] = useState(false);

        const recordsPerPage = 10;

        useEffect( () =>{
            fetchData();
        },[pageDisplay,searchTerm])

        const fetchData = async () =>{
            try{
            const response = await fetch('http://localhost:3001/courses',{ method: 'GET' });
            const data = await response.json()
            // console.log(data.data)
            // setRecords(data.data)

            const filteredRecords = filterRecords(data);
            
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
                record.course.toLowerCase().includes(searchTerm.toLowerCase()) || record.description.toLowerCase().includes(searchTerm.toLowerCase())
              );
            }
        
            return filteredRecords;
          };
          const handleSearchChange = (event) => {
            setSearchTerm(event.target.value);
            setPageDisplay(1); 
          };


        

    return (
        <>
            <div className="pt-[70px] w-full h-[100vh] p-4 bg-[#E5D9F2]">
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
                    </div>
                    <div>
                        <input type="search" className="w-72 border border-[#A594F9] mt-2 p-1 px-3 outline-none rounded-md bg-[#F5EFFF]" placeholder="search course" value={searchTerm} onChange={handleSearchChange}/>
                    </div>
                    <div className="w-full h-4/5 mt-2" >
                        <table className="w-full">
                            <thead className="border border-[#CDC1FF] bg-[#A594F9]">
                                <tr className="">
                                    <th className="p-2 border-r-2">Course</th>
                                    <th className="p-2 border-r-2">Decription</th>
                                    <th className="p-2 border-r-2">Fee</th>
                                    { displayActivity ? (<th className="p-2">Actions</th>) : '' }
                                </tr>
                            </thead>
                            <tbody>
                                { records && records.length >0 ?records.map(record => (
                                    <tr className="border border-[#CDC1FF] bg-[#F5EFFF]" key={record.id}>
                                        <td className=" w-1/5 p-2 ps-5">{record.course}</td>
                                        <td className=" w-1/5 p-2 ps-5">{record.description}</td>
                                        <td className="text-center w-1/5 p-2">{record.fee}</td>
                                        { displayActivity ? (<td className="w-1/6 p-2">
                                        <div className="flex gap-x-3 mx-auto justify-center">
                                            <button className="w-24 bg-lime-200 rounded-lg">Edit</button>
                                            <button className="w-24 bg-red-400 rounded-lg">Delete</button>
                                        </div>
                                        </td>) : '' }
                                    </tr>
                                ) ) : <tr className="bg-[#F5EFFF]">
                                        <td colSpan={4} className="text-center w-full h-96">
                                        <div className="items-center">
                                            <img src="./images/nodata.svg" className="w-1/4 h-60 mx-auto"></img>
                                            <h1 className=" text-3xl text-center mt-3 ml-10">No Data Found</h1>
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
            {
                showCreateCourse && <CreateCourse setShowCreateCourse={setShowCreateCourse}/>
            }
        </>
    )
}