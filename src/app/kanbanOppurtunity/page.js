'use client'

import React from "react";
import { useState,useEffect } from "react";

export default function KanbanOppurtunity() {
    const ApiUrl = process.env.NEXT_PUBLIC_API_URL;


    const [records,setRecords] = useState([])

    useEffect( () =>{
        fetchData();
    },[] );

    const fetchData = async () =>{
        try{
            const response = await fetch(`${ApiUrl}/signUpData`);
            const data = await response.json()
            setRecords(data.reverse())

        }
        catch (err){
            console.log(err)
        }
    }



    return (
        <div className="grid grid-cols-3 gap-4 p-4">
                {/* <div className=" border-t-4 border-[#86EFAC] h-20 p-3 font-semibold rounded bg-[#DCFCE7]">
                    <p>visiting</p>
                </div> */}
                <div className=" border-t-4 border-[#93C5FD] h-20 p-3 font-semibold rounded bg-[#DBEAFE]">
                    <p>visited</p>
                </div>
                <div className=" border-t-4 border-[#A8A29E] h-20 p-3 font-semibold rounded bg-[#FFEDD5]">
                    <p>Demo Attended</p>
                </div>
                <div className=" border-t-4 border-[#94A3B8] h-20 p-3 font-semibold rounded bg-[#E0E7FF]">
                    <p>Lost Oppurtunity</p>
                </div>
                {/* <div className=" border h-auto rounded bg-[#E5E7EB] p-2">
                {
                    records.map((record,index) => (
                        <div className="flex justify-between">
                            <p>{ record.visitStatus == 'visiting' ? record.name : '' }</p>
                            <p>{ record.visitStatus == 'visiting' ? record.phone : '' }</p>
                        </div>
                    ))
                }
                </div> */}
                <div className=" border h-auto rounded bg-[#E5E7EB] p-2">
                {
                        records.map( (record,index) =>(
                            <div key={index} className="flex justify-between ">
                            <p className="" >{record.visitStatus === 'visited' ? record.name : ''}</p>
                            <p>{record.visitStatus === 'visited' ? record.phone : ''}</p>
                            </div>
                        ))
                }
                </div>
                <div className=" border h-auto rounded bg-[#E5E7EB] p-2"></div>
                <div className=" border h-auto rounded bg-[#E5E7EB] p-2"></div>
        </div>
    )
}