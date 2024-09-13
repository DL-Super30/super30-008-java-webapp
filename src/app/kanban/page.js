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
            'http://localhost:3001/signUpData',{method: "GET",});
        const data =await response.json();
        setRecords(data.reverse())
        // console.log(data)

        }
         catch (err) {
          console.log(err);
        }
      };

    return (
        <div className="w-full h-[75vh] grid grid-cols-4 gap-x-2">
            <div className=" h-24 bg-[#DCFCE7] rounded border-t-4 border-[#86EFAC] border-b" >
                <p className="font-semibold p-5">Not Contacted</p>
            </div>
            <div className=" h-24 bg-[#DBEAFE] rounded border-t-4 border-[#93C5FD] border-b" >
                <p className="font-semibold p-5">Attempted</p>
            </div>
            <div className=" h-24 bg-[#FFEDD5] rounded border-t-4 border-[#A8A29E] border-b" >
                <p className="font-semibold p-5">Warm Lead</p>
            </div>
            <div className=" h-24 bg-[#E0E7FF] rounded border-t-4 border-[#94A3B8] border-b" >
                <p className="font-semibold p-5">Cold Lead</p>
            </div>
            <div className=" h-auto bg-[#E5E7EB] rounded p-3 mt-2" >
                {
                    records.map((record,i) =>(
                        <div key={i} className="flex justify-between">
                        <p  className="">{record.status == 'Not Contacted' ? `${record.name}`:'' }</p>
                        <p>{record.status == 'Not Contacted' ? `${record.phone}` : ''}</p>
                        </div>
                    )
                    )
                }
            </div>
            <div className=" h-auto bg-[#E5E7EB] rounded p-3 mt-2" >
            {
                    records.map((record,i) =>(
                        <div key={i} className="flex justify-between">
                        <p  className="">{record.status == 'Attempted' ? `${record.name}`:'' }</p>
                        <p>{record.status == 'Attempted' ? `${record.phone}` : ''}</p>
                        </div>
                    )
                    )
                }
            </div>
            <div className=" h-auto bg-[#E5E7EB] rounded p-3 mt-2" >
            {
                    records.map((record,i) =>(
                        <div key={i} className="flex justify-between">
                        <p  className="">{record.status == 'Warm Lead' ? `${record.name}`:'' }</p>
                        <p>{record.status == 'Warm Lead' ? `${record.phone}` : ''}</p>
                        </div>
                    )
                    )
                }
            </div>
            <div className=" h-auto bg-[#E5E7EB] rounded p-3 mt-2" >
            {
                    records.map((record,i) =>(
                        <div key={i} className="flex justify-between">
                        <p  className="">{record.status == 'Cold Lead' ? `${record.name}`:'' }</p>
                        <p>{record.status == 'Cold Lead' ? `${record.phone}` : ''}</p>
                        </div>
                    )
                    )
                }
            </div>
        </div>
    )
}