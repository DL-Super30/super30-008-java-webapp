"use client";

import React, { useState, useEffect } from 'react';
import LeadsLineChart from '@/components/LeadsLineChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import DoughnutChart from '@/components/piechart';


export default function DashBoard() {
  const [leadsData, setLeadsData] = useState([]);
  const [records,setRecords] = useState([])
  

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch("http://localhost:3001/todayleads",{ method:'GET'});
        const data = await response.json();
        setLeadsData(data);
      } catch (error) {
        // console.error('Failed to fetch leads data:', error);
        console.log(error)
      }
    };

    fetchLeads();
  }, []);

  useEffect( () =>{
    countData();

  },[] )

  const countData = async () =>{
    try{
      const result = await fetch("http://localhost:3001/signUpData");
    const output = await result.json()
    setRecords(output);
    }
    catch (err){
        console.log(err)
    }
    
  }

  

  // console.log(records.date);
  
  // console.log(date)
  return (
    <div className="h-[100vh] bg-[#F4F6FA] pt-14">
      <div className="w-4/5 pt-5 flex gap-x-5 ml-5">
        {/* {['Not Contacted', 'Warm Lead', 'Attempted', 'Registered', 'Opportunity', 'Cold Leads'].map((label, index) => (
          <div key={index} className="w-1/6 bg-white border rounded flex justify-center items-center gap-x-2 text-center h-16">
            <div>
              <h1>
                <FontAwesomeIcon icon={faUserGroup} className="text-2xl text-[#3B2BBF]" />
              </h1>
            </div>
            <div>
              <h1>{label}</h1>
              <h1 className="font-bold">{index * 10 + 1}</h1> 
            </div>
          </div>
        ))} */}
        <div className="w-1/6 bg-white border rounded flex justify-center items-center gap-x-2 text-center h-16">
            <div>
              <h1>
                <FontAwesomeIcon icon={faUserGroup} className="text-2xl text-[#3B2BBF]" />
              </h1>
            </div>
            <div>
              <h1>Not Contacted</h1>
              <h1 className="font-bold">{records.filter(record => record.status === 'Not Contacted'  ).length  }</h1> 
            </div>
        </div>
        <div className="w-1/6 bg-white border rounded flex justify-center items-center gap-x-2 text-center h-16">
            <div>
              <h1>
                <FontAwesomeIcon icon={faUserGroup} className="text-2xl text-[#3B2BBF]" />
              </h1>
            </div>
            <div>
              <h1>Attempted</h1>
              <h1 className="font-bold">{records.filter(record => record.status === 'Attempted').length }</h1> 
            </div>
        </div>
        <div className="w-1/6 bg-white border rounded flex justify-center items-center gap-x-2 text-center h-16">
            <div>
              <h1>
                <FontAwesomeIcon icon={faUserGroup} className="text-2xl text-[#3B2BBF]" />
              </h1>
            </div>
            <div>
              <h1>Warm Lead</h1>
              <h1 className="font-bold">{records.filter(record => record.status === 'Warm Lead').length }</h1> 
            </div>
        </div>
        {/* <div className="w-1/6 bg-white border rounded flex justify-center items-center gap-x-2 text-center h-16">
            <div>
              <h1>
                <FontAwesomeIcon icon={faUserGroup} className="text-2xl text-[#3B2BBF]" />
              </h1>
            </div>
            <div>
              <h1>Not Contacted</h1>
              <h1 className="font-bold">{records.filter(record => record.status === 'Not Contacted').length }</h1> 
            </div>
        </div> */}
        <div className="w-1/6 bg-white border rounded flex justify-center items-center gap-x-2 text-center h-16">
            <div>
              <h1>
                <FontAwesomeIcon icon={faUserGroup} className="text-2xl text-[#3B2BBF]" />
              </h1>
            </div>
            <div>
              <h1>Cold Leads</h1>
              <h1 className="font-bold">{records.filter(record => record.status === 'Cold Lead').length }</h1> 
            </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row mt-12 p-5 justify-evenly">
        <div className="w-full md:w-[65%] rounded">
          <LeadsLineChart leadsData={leadsData} />
        </div>
        <div className="w-1/4  rounded">
        <DoughnutChart />
        </div>
      </div>
    </div>
  );
}
