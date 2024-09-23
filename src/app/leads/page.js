'use client'

import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft, faAddressCard, faAngleDown, faTable } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link"

export default function Leads() {

    const [records, setRecords] = useState([]);
    const [pages, setPages] = useState([]);
    const [pageDisplay, setPageDisplay] = useState(1);
    const [pageConfig, setPageConfig] = useState({});
    const [searchTerm,setSearchTerm] = useState('')

    const recordsPerPage = 10;

    useEffect(() => {
        fetchData();
    }, [pageDisplay,searchTerm])

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3001/signupData?_page=1&_per_page=1000", { method: 'GET' });
            const result = await response.json()
            // setRecords(result.data)
            // console.log(result)

            const sortedRecords = result.data.sort( (a,b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date)

                return dateB - dateA ;
            } )

            const unique = filterdRecords(sortedRecords)

            const totalPages = Math.ceil(unique.length / recordsPerPage);
            const paginateRecords = unique.slice(recordsPerPage * (pageDisplay - 1), pageDisplay * recordsPerPage);
            setRecords(paginateRecords);

           

            const tempArr = [] 

            for (let i = 1; i <= totalPages; i++) {
                tempArr.push(i)
            }
            setPages(tempArr)

            setPageConfig({
                isPrevious: pageDisplay > 1,
                isNext: pageDisplay < totalPages
            })

        }
        catch (err) {
            console.log(err)
        }
    }



    const handlePageChange = (newpage) => {
        if (newpage >= 1 && newpage <= pages.length) {
            setPageDisplay(newpage)
        }
    }
    const handleSearch = (f) =>{
        console.log(f)
    }

    const filterdRecords = (result) =>{
        let recordsFiltering = result

        if(searchTerm){
            recordsFiltering = recordsFiltering.filter( recordData =>
                recordData.name.include(searchTerm)
             )
        }

        return recordsFiltering;
    }

    const handleSearchChange = (event) =>{
        setSearchTerm(event.target.value)
        setPageDisplay(1);
    }
    return (
        <div>
            <div className="flex justify-between">
                <div className="flex w-full  items-center">
                    <p><FontAwesomeIcon icon={faAddressCard} className="mr-2 text-blue-500 p-2 text-4xl" /></p>
                    <select className="text-xl">
                        <option className="text-md">All Leads</option>
                        <option className="text-md">My Leads</option>
                        <option className="text-md">Today's Leads</option>
                        <option className="text-md">Yesterday's Leads</option>
                        <option className="text-md">This week Leads</option>
                        <option className="text-md">Last Month Leads</option>
                    </select>
                </div>
                <div className=" flex items-center mr-5">

                <Link href={"/createleads"}> <h1 className="text-center rounded-lg mr-[10px] w-40 p-2 border-2 text-white bg-blue-500 text-lg">Create Lead <FontAwesomeIcon icon={faAngleDown} className="mr-[-10px]" /></h1></Link>
                    <h1 className="text-center rounded-lg w-36 border p-2 text-black  text-lg">Actions <FontAwesomeIcon icon={faAngleDown} className="mr-[-10px]" /></h1>
                </div>
            </div>
            <div className="w-full mt-4 flex">
                <input className="w-72 border p-1 outline-none ms-5 rounded" placeholder="search" type="search" value={searchTerm} onChange={handleSearchChange}></input>
                <div className="w-[150px] p-1 border-2 ml-5 text-center rounded-s-lg"> <h1>Not Contacted</h1></div>
                <div className="w-[150px] p-1 border-2 text-center"> <h1>Attemted</h1></div>
                <div className="w-[150px] p-1 border-2 text-center"> <h1>Warm Lead</h1></div>
                <div className="w-[150px] p-1 border-2 text-center rounded-e-lg"> <h1>Cold Lead</h1></div>
                <div className="w-[130px] p-1 border-2 ml-5 rounded-s-lg text-center bg-blue-500 text-white p-2  flex gap-5"><FontAwesomeIcon icon={faTable} className="text-white text-center ml-2 text-xl"/> <h1>Table</h1></div>
                <div className="w-[150px] p-1 border-2 rounded-e-lg text-center"> <h1>Kanban</h1></div>


            </div>

            <div className="w-full p-5">
                <table className="w-full border mt-3 ">
                    <thead className="border ">
                        <tr className="">
                            <th className="w-1/6 border p-3">Created On</th>
                            <th className="w-1/6 border p-3">Status</th>
                            <th className="w-1/6 border p-3">Name</th>
                            <th className="w-1/6 border p-3">Phone</th>
                            <th className="w-1/6 border p-3">Email</th>
                            <th className="w-1/6 border p-3">Course</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            records.map((record, index) => (
                                <tr key={record.id} className="border-b">
                                    <td className="text-center p-2">-</td>
                                    <td className="text-center p-2">-</td>
                                    <td className="text-center p-2">{record.name}</td>
                                    <td className="text-center p-2">{record.phone}</td>
                                    <td className="text-center p-2">{record.email}</td>
                                    <td className="text-center p-2"></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="flex ml-[45%] mr-12">
                <p className={`${pageConfig.isPrevious ? 'cursor-pointer' : 'cursor-not-allowed'}`} onClick={() => handlePageChange(pageDisplay - 1)}><FontAwesomeIcon icon={faChevronLeft} className="mr-2" /></p>
                {
                    pages.map((page) => (
                        <p key={page} className={` cursor-pointer border p-1 px-2 bg-blue-400 text-white hover:bg-blue-200 ${pageDisplay == page ? 'bg-blue-800' : 'bg-blue-400'}`} onClick={() => setPageDisplay(page)}>{page}</p>
                    ))
                }
                <p className={`${pageConfig.isNext ? 'cursor-pointer' : 'cursor-not-allowed'}`} onClick={() => handlePageChange(pageDisplay + 1)}><FontAwesomeIcon icon={faChevronRight} className="ml-2" /></p>
            </div>
        </div>
    )
}