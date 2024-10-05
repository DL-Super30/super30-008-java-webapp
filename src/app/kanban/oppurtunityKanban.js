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
            const response = await fetch(`${ApiUrl}/api/opportunity?page=1&limit=10`);
            const data = await response.json()
            setRecords(data.data)

        }
        catch (err){
            console.log(err)
        }
    }



    return (
        <div className="grid grid-cols-4 gap-4 p-4">
                <div className=" border-t-4 border-[#8EACCD] h-20 p-3 font-semibold rounded bg-[#D2E0FB]">
                    <p>visiting</p>
                </div>
                <div className=" border-t-4 border-[#6EC207] h-20 p-3 font-semibold rounded bg-[#8FD14F]">
                    <p>visited</p>
                </div>
                <div className=" border-t-4 border-[#FF6500] h-20 p-3 font-semibold rounded bg-[#FD8B51]">
                    <p>Demo Attended</p>
                </div>
                <div className=" border-t-4 border-[#FF204E] h-20 p-3 font-semibold rounded bg-[#FA7070]">
                    <p>Lost Oppurtunity</p>
                </div>
                <div className=" border h-auto rounded bg-[#E5E7EB] p-2">
                {
                    records.map((record,i) =>
                        record.opportunityStatus == 'Visiting' ?
                        (
                        <div key={i} className="bg-[#D1E9F6] rounded p-2 m-1">
                            <div className="flex justify-between">
                                <p  className="text-lg font-semibold">{record.name}</p>
                                <p>{record.phone}</p>
                            </div>
                            <p>{record.email}</p>
                        </div>
                    ) : (<></>)
                    )
                }
                </div>
                <div className=" border h-[80vh] rounded bg-[#E5E7EB] p-2">
                {
                    records.map((record,i) =>
                        record.opportunityStatus == 'Visited' ?
                        (
                        <div key={i} className="bg-[#C1E2A4] rounded p-2 m-1">
                            <div className="flex justify-between">
                                <p  className="text-lg font-semibold">{record.name}</p>
                                <p>{record.phone}</p>
                            </div>
                            <p>{record.email}</p>
                        </div>
                    ) : (<></>)
                    )
                }
                </div>
                <div className=" border h-auto rounded bg-[#E5E7EB] p-2">
                {
                    records.map((record,i) =>
                        record.opportunityStatus == 'Demo Attended' ?
                        (
                        <div key={i} className="bg-[#FF885B] rounded p-2 m-1">
                            <div className="flex justify-between">
                                <p  className="text-lg font-semibold">{record.name}</p>
                                <p>{record.phone}</p>
                            </div>
                            <p>{record.email}</p>
                        </div>
                    ) : (<></>)
                    )
                }
                </div>
                <div className=" border h-auto rounded bg-[#E5E7EB] p-2">
                {
                    records.map((record,i) =>
                        record.opportunityStatus == 'Lost Opportunity' ?
                        (
                        <div key={i} className="bg-red-300 rounded p-2 m-1">
                            <div className="flex justify-between">
                                <p  className="text-lg font-semibold">{record.name}</p>
                                <p>{record.phone}</p>
                            </div>
                            <p>{record.email}</p>
                        </div>
                    ) : (<></>)
                    )
                }
                </div>
        </div>
    )
}