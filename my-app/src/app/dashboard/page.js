'use client'
import React from "react"
// import LeadsLineChart from '../../components/lineChart'
import LineChart from "@/components/lineChart"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';

export default function Dashboard(){
    return(
        <div className="w-full h-[90.9vh] p-14 bg-blue-100">
        <div className="bg-white">
            <div>
                <button className="p-8 bg-white border m-4 rounded-md"><FontAwesomeIcon icon={faUserGroup} className="mr-1 text-md text-blue-800" />Not Contacted</button>
                <button className="p-8 bg-white border m-4 rounded-md"><FontAwesomeIcon icon={faUserGroup} className="mr-1 text-md text-blue-800" />warm Lead</button>
                <button className="p-8 bg-white border m-4 rounded-md"><FontAwesomeIcon icon={faUserGroup} className="mr-1 text-md text-blue-800" />Attempted</button>
                <button className="p-8 bg-white border m-4 rounded-md"><FontAwesomeIcon icon={faUserGroup} className="mr-1 text-md text-blue-800" />Registred</button>
                <button className="p-8 bg-white border m-4 rounded-md"><FontAwesomeIcon icon={faUserGroup} className="mr-1 text-md text-blue-800" />Opportunity</button>
                <button className="p-8 bg-white border m-4 rounded-md"><FontAwesomeIcon icon={faUserGroup} className="mr-1 text-md text-blue-800" />Cold Lead</button>
            </div>
           <div className="w-3/5 h-fit-content "><LineChart /></div>
        </div>
        </div>
    )
}