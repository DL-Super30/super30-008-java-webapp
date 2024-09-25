'use client'

import React from "react"

export default function OpportunityKanban(){
    return(
        <div>
        <div className="flex gap-2"> 
            <div className="w-96 h-20 border-t-4 rounded-t-lg border-green-300 mt-4   bg-[#DCFCE7] text-center p-4 font-bold">
                <h2>Visiting</h2>
                <h3>₹ 0.00 . Leads</h3>
            </div>
            <div className="w-96 h-20 border-t-4 rounded-t-lg border-[#93C5FD] mt-4   bg-[#DBEAFE] text-center p-4 font-bold">
                <h2>Visited</h2>
                <h3>₹ 0.00 . Leads</h3>
            </div>
            <div className="w-96 h-20 border-t-4 rounded-t-lg border-[#A8A29E] mt-4   bg-[#FFEDD5] text-center p-4 font-bold">
                <h2>Demo attended</h2>
                <h3>₹ 0.00 . Leads</h3>
            </div>
            <div className="w-96 h-20 border-t-4 rounded-t-lg border-[#94A3B8] mt-4   bg-[#E0E7FF] text-center p-4 font-bold">
                <h2>Lost Opportunity</h2>
                <h3>₹ 0.00 . Leads</h3>
            </div>
        </div>



        <div className="flex mt-4 gap-2">
            <div className="w-96 h-[63vh]  bg-gray-200 rounded  "></div>
            <div className="w-96 h-[63vh]  bg-gray-200 rounded"></div>
            <div className="w-96 h-[63vh]  bg-gray-200 rounded"></div>
            <div className="w-96 h-[63vh]  bg-gray-200 rounded"></div>
        </div>


    </div>
    )
}