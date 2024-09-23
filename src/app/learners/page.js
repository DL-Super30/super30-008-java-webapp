'use client'
import React from "react";
import { useEffect,useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faAngleDown,faTable,faChevronLeft,faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";
import CreateLearner from "../createlearners/page";


export default function Learner() {
    const [records,setRecords] = useState([]);
    const [pages,setPages]=useState([]);
    const [pageConfig,setPageConfig] = useState({});
    const [pageDisplay,setPageDisplay] = useState(1);
    const [showCreateLearner,setShowCreateLearner] = useState(false)

    const recordesperPage=10;

    useEffect( () =>{   
        fetchData();
    } ,[pageDisplay])

    const fetchData = async () =>{
        try{
            const response = await fetch("http://localhost:3001/signupData");
            const data = await response.json()
            // console.log(data);

            const sortedRecords = data.sort( (a,b) =>{
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB - dateA
            })
            const totalPages=Math.ceil(sortedRecords.length/recordesperPage);
            const paginatedRecords = sortedRecords.slice((pageDisplay - 1) * recordesperPage , pageDisplay * recordesperPage)
            setRecords(paginatedRecords)
            

            const tempArr=[];
            for (let i=1;i<=totalPages;i++){
                tempArr.push(i);
            }
            setPages(tempArr);
            setPageConfig({
                isPrevious : pageDisplay > 1,
                isNext : pageDisplay < totalPages
            })

            


        }
        catch (err){
            console.log(err)
        }
    }
    
            
    const handlePageChange = (newpage) =>{
        if(newpage >= 1 && newpage <=pages.length){
            setPageDisplay(newpage)
        }
    }

    return (
        <div className="p-4 border-2 w-full h-[100vh]">

            <div className="flex justify-between">
                <div className="flex w-full  items-center">
                    <p><FontAwesomeIcon icon={faAddressCard} className="mr-2 text-blue-500 p-2 text-4xl" /></p>
                    <select className="text-xl outline-none">
                        <option className="text-md">All Learner</option>
                        <option className="text-md">My Learner</option>
                        <option className="text-md">Todays Learner</option>
                        <option className="text-md">Yesterdays Learner</option>
                        <option className="text-md">This week Learner</option>
                        <option className="text-md">Last Month Learner</option>
                    </select>
                </div>
                <div className=" flex items-center mr-5">

                 <button className="text-center rounded-lg mr-[10px] w-52 p-2  border-2 text-white bg-blue-500 text-lg" onClick={() => setShowCreateLearner(true)}>Create Learner<FontAwesomeIcon icon={faAngleDown} className="mr-[-10px]" /></button>
                    <h1 className="text-center rounded-lg w-36 border p-2 text-black  text-lg">Actions <FontAwesomeIcon icon={faAngleDown} className="mr-[-10px]" /></h1>
                </div>
            </div>
            <div className="w-full mt-4 flex">
                <input className="w-72 border p-1 outline-none ms-5 rounded" placeholder=" search "></input>
                <div className="w-[150px] p-1 border-2 ml-5 text-center rounded-s-lg"> <h1>Upcoming</h1></div>
                <div className="w-[150px] p-1 border-2 text-center"> <h1>Ongoing</h1></div>
                <div className="w-[150px] p-1 border-2 text-center"> <h1>On Hold</h1></div>
                <div className="w-[150px] p-1 border-2 text-center rounded-e-lg"> <h1>Completed</h1></div>
                <div className="w-[130px] p-1 border-2 ml-5 rounded-s-lg text-center bg-blue-500 text-white p-2  flex gap-5"><FontAwesomeIcon icon={faTable} className="text-white text-center ml-2 text-xl"/> <h1>Table</h1></div>
                <div className="w-[150px] p-1 border-2 rounded-e-lg text-center"> <h1>Kanban</h1></div>
            </div>
            <div className="border w-full h-auto mt-4">
                <table className="border w-full">
                    <thead className="">
                        <tr className="w-full ">
                            <th className="w-1/6 border p-2">Created on</th>
                            <th className="w-1/6 border p-2">Oppurtunity Status</th>
                            <th className="w-1/6 border p-2">Name</th>
                            <th className="w-1/6 border p-2">Phone</th>
                            <th className="w-1/6 border p-2">Stack</th>
                            <th className="w-1/6 border p-2">Course</th>
                        </tr>
                    </thead>
                    <tbody>
                        { records.map( (record,index) => (
                            <tr key={index}className="border-b-2" >
                                <td className="px-5 p-2">{record.date}</td>
                                <td className="px-5 p-2">{record.status}</td>
                                <td className="px-5 p-2">{record.name}</td>
                                <td className="px-5 p-2">{record.phone}</td>
                                <td className="px-5 p-2">{record.stack}</td>
                                <td className="px-5 p-2">{record.course}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex gap-x-2 justify-center mt-4">
                    <button className={`${pageConfig.isPrevious ? 'cursor-pointer' : 'cursor-not-allowed'}`} onClick={() =>handlePageChange(pageDisplay-1)}> <FontAwesomeIcon icon={faChevronLeft} /></button>
                    { pages.map(page => (
                        <p className={`cursor-pointer border p-1 px-2 bg-blue-400 text-white hover:bg-blue-200 ${ pageDisplay == page ? 'bg-blue-800' : 'bg-blue-400' }`} key={page} onClick={() =>handlePageChange(page)}>{page}</p>
                    )) }
                    <button className={`${pageConfig.isNext ? 'cursor-pointer' : 'cursor-not-allowed'}`} onClick={() => handlePageChange(pageDisplay + 1)}><FontAwesomeIcon icon={faChevronRight} /></button>
                </div>


            </div>
             { showCreateLearner && (<CreateLearner setShowCreateLearner={setShowCreateLearner}/>)}

        </div>
    )
}