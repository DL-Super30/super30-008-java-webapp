'use client'

import React from "react"
import { useEffect,useState } from "react";

export default function Kanban(){
    const [records , setRecords ] =useState([]);

    useEffect( () =>{ 
        getRecords();
        // console.log(getRecords())
    },[])


    const getRecords = async () => {
    const ApiUrl = process.env.NEXT_PUBLIC_API_URL;

        try {
          let response = await fetch(
            `${ApiUrl}/api/leads?page=1&limit=10`,{method: "GET",});
        const data =await response.json();
        setRecords(data.data)
        // console.log(data)

        }
         catch (err) {
          console.log(err);
        }
      };

    return (
        <div className="w-full grid grid-cols-4 gap-x-2 p-1">
            <div className=" h-16 bg-[#FFBF78] rounded border-t-4 border-[#FF6600] border-b" >
                <p className="font-semibold p-5">Not Contacted</p>
            </div>
            <div className=" h-16 bg-[#DCFCE7] rounded border-t-4 border-[#86EFAC] border-b" >
                <p className="font-semibold p-5">Attempted</p>
            </div>
            <div className=" h-16 bg-[#FFF4B5] rounded border-t-4 border-[#FCDE70] border-b" >
                <p className="font-semibold p-5">Warm Lead</p>
            </div>
            <div className=" h-16 bg-[#FA7070] rounded border-t-4 border-[#FF204E] border-b" >
                <p className="font-semibold p-5">Cold Lead</p>
            </div>
            <div className=" h-[80vh] overflow-y-scroll bg-[#E5E7EB] rounded p-2" >
                {
                    records.map((record,i) =>
                        record.leadStatus === 'Not Contacted' ?
                        (
                        <div key={i} className={`bg-[#FFCF81] m-1 rounded-md p-1 `}>
                            <div className={`flex justify-between`}>
                                <p  className="text-lg font-semibold">{record.leadname}</p>
                                <p>{record.phone}</p>
                            </div>
                            <p>{record.email}</p>
                        </div>
                    ) : (<></>)
                    )
                }
            </div>
            <div className=" h-[80vh] overflow-y-scroll bg-[#E5E7EB] rounded p-2" >
            {
                    records.map((record,i) =>
                        
                        record.leadStatus == 'Attempted' ? 
                        (
                        
                        <div key={i} className={`bg-[#DCFCE7] m-1 rounded-md p-1`}>
                            <div className="flex justify-between">
                                <p  className="text-lg font-semibold">{record.leadname}</p>
                                <p>{record.phone}</p>
                            </div>
                            <p>{record.email}</p>
                        </div>
                    ) : (<></>)
                    )
                }
            </div>
            <div className=" h-[80vh] overflow-y-scroll bg-[#E5E7EB] rounded p-2" >
            {
                    records.map((record,i) =>
                        record.leadStatus === 'Warm Lead' ?
                        (
                        <div key={i} className="bg-[#FFF4B5] rounded m-1 p-1">
                            <div className="flex justify-between">
                                <p  className="font-semibold text-lg">{record.leadname}</p>
                                <p>{record.phone}</p>
                            </div>
                            <p>{record.email}</p>
                        </div>
                    ) : (<></>)
                    )
                }
            </div>
            <div className=" h-[80vh] overflow-y-scroll bg-[#E5E7EB] rounded p-3" >
            {
                    records.map((record,i) =>
                        record.leadStatus === 'Cold Lead' ?
                        (
                        <div key={i} className="bg-[#FA7070] rounded p-2 m-1">
                            <div className="flex justify-between">
                                <p  className="text-lg font-semibold">{record.leadname}</p>
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