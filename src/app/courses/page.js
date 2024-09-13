'use client'

import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { faChevronRight,faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function Courses() {

        const [records,setRecords] = useState([]);
        const [pages,setPages] = useState([]);


        const recordsPerPage = 8;

        useEffect( () =>{
            fetchData();
        },[])

        const fetchData = async () =>{
            try{
            const response = await fetch("http://localhost:3001/courses?_page=1&_per_page=1000",{ method: 'GET' });
            const data = await response.json()
            // console.log(data)
            setRecords(data)

            const totalPages = Math.ceil(records.length / recordsPerPage)
            
            const tempArr = [];
            for (let i = 1; i <= totalPages; i++) {
              tempArr.push(i);
            }
            setPages(tempArr);
            }
            catch (err){
                console.log(err)
            }
        }

    return (
        <>
            <div className="pt-[70px] w-full h-[100vh] p-4">
                <div className="w-full h-full border-2 rounded p-3">
                    <div className="flex justify-between">
                        <div className="flex items-center gap-x-3">
                            <p><FontAwesomeIcon icon={faAddressCard} className="text-2xl bg-blue-400 text-white p-2 rounded"/></p>
                            <h1 className="text-2xl">Courses</h1>
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <button className="w-36 p-1 bg-blue-500 text-white rounded ">Create course</button>
                            <button className="w-36 p-1 border rounded ">Action</button>
                        </div>
                    </div>
                    <div>
                        <input type="search"  className="w-72 border mt-2 p-1 outline-none rounded" placeholder="search course"/>
                    </div>
                    <div className="w-full h-4/5 border mt-3" >
                        <table className="w-full">
                            <thead className="border">
                                <tr className="bg-[#F8F8F8]">
                                    <th className="p-1 border-r-2">Course</th>
                                    <th className="p-1 border-r-2">Decription</th>
                                    <th className="p-1 border-r-2">Fee</th>
                                    <th className="p-1">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {records.map(record => (
                                    <tr className="border-b" key={record.id}>
                                        <td className=" w-1/5 p-1">{record.course}</td>
                                        <td className=" w-1/3 p-1">{record.description}</td>
                                        <td className="text-center w-1/5 p-1">{record.fee}</td>
                                        <td className="w-1/5 p-1">-</td>
                                    </tr>
                                ) )} */}
                            </tbody>
                        </table>
                    </div>
                    <div className="justify-end flex mr-14">
                        <p><FontAwesomeIcon icon={faChevronLeft} className="text-sm"/></p>
                        {/* <p className="mx-3">pages</p> */}
                        { pages.map((page) =>(
                        <p>{page}</p>
                        ) )}
                        <p><FontAwesomeIcon icon={faChevronRight} className="text-sm"/></p>

                    </div>
                </div>
            </div>
        </>
    )
}