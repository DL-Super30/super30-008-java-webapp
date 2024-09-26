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
        try {
          let response = await fetch(
            'http://localhost:4000/api/leads?page=1&limit=10',{method: "GET",});
        const data =await response.json();
        setRecords(data.data)
        // console.log(data)

        }
         catch (err) {
          console.log(err);
        }
      };

    return (
        <div className="w-full h-[75vh] grid grid-cols-4 gap-x-2 p-2">
            <div className=" h-24 bg-[#FFBF78] rounded border-t-4 border-[#FF6600] border-b" >
                <p className="font-semibold p-5">Not Contacted</p>
            </div>
            <div className=" h-24 bg-[#DCFCE7] rounded border-t-4 border-[#86EFAC] border-b" >
                <p className="font-semibold p-5">Attempted</p>
            </div>
            <div className=" h-24 bg-[#FFF4B5] rounded border-t-4 border-[#FCDE70] border-b" >
                <p className="font-semibold p-5">Warm Lead</p>
            </div>
            <div className=" h-24 bg-[#FA7070] rounded border-t-4 border-[#FF204E] border-b" >
                <p className="font-semibold p-5">Cold Lead</p>
            </div>
            <div className=" h-auto bg-[#E5E7EB] rounded " >
                {
                    records.map((record,i) =>
                        (
                        <div key={i} className="bg-[#FFCF81] m-1 rounded-md p-1">
                            <div className="flex justify-between">
                                <p  className="text-lg font-semibold">{record.leadStatus === 'Not Contacted' ? `${record.leadname}`:'' }</p>
                                <p>{record.leadStatus == 'Not Contacted' ? `${record.phone}` : ''}</p>
                            </div>
                            <p>{record.leadStatus == 'Not Contacted' ? `${record.email}` : '' }</p>
                        </div>
                    )
                    )
                }
            </div>
            <div className=" h-auto bg-[#E5E7EB] rounded" >
            {
                    records.map((record,i) =>(

                        <div key={i} className="bg-[#DCFCE7] m-1 rounded-md p-1">
                            <div className="flex justify-between">
                                <p  className="">{record.leadStatus === 'Attempted' ? `${record.leadname}`:'' }</p>
                                <p>{record.leadStatus === 'Attempted' ? `${record.phone}` : ''}</p>
                            </div>
                            <p>{record.leadStatus == 'Attempted' ? `${record.email}` : '' }</p>
                        </div>
                    )
                    )
                }
            </div>
            <div className=" h-auto bg-[#E5E7EB] rounded p-3" >
            {
                    records.map((record,i) =>(
                        <div key={i} className="flex justify-between">
                        <p  className="">{record.leadstatus == 'Warm Lead' ? `${record.leadname}`:'' }</p>
                        <p>{record.leadstatus == 'Warm Lead' ? `${record.phone}` : ''}</p>
                        </div>
                    )
                    )
                }
            </div>
            <div className=" h-auto bg-[#E5E7EB] rounded p-3" >
            {
                    records.map((record,i) =>(
                        <div key={i} className="flex justify-between">
                        <p  className="">{record.leadstatus == 'Cold Lead' ? `${record.leadname}`:'' }</p>
                        <p>{record.leadstatus == 'Cold Lead' ? `${record.phone}` : ''}</p>
                        </div>
                    )
                    )
                }
            </div>
        </div>
    )
}