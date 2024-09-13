'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faChartBar } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown, faTable, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function DashBoard() {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const [pageConfig, setPageConfig] = useState({ isPrevious: false, isNext: false });
  const [pageNo, setPageNo] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0); // State for total records

  useEffect(() => {
    getRecords();
  }, [pageNo]); // Re-run when pageNo changes

  // Function to get records based on the current page
  const getRecords = async () => {
    try {
      // Fetch records with the current page number
      let response = await fetch(`http://localhost:3001/signUpData?_page=${pageNo}&_limit=10`, {
        method: "GET",
      });

      const data = await response.json();
      const total = response.headers.get('X-Total-Count'); // Get the total count from headers (if API provides it)
      
      // Update total records state
      setTotalRecords(total ? parseInt(total) : 0);

      const totalPages = Math.ceil(total / 10); // Assuming 10 records per page

      // Reverse the data and set it to state
      const reversedData = data.reverse();
      setColumns(reversedData);
      setRecords(reversedData);
      setPageConfig({
        isPrevious: pageNo > 1,
        isNext: pageNo < totalPages,
      });

    } catch (err) {
      console.log(err);
    }
  };

  // Handle next page click
  const handleNext = () => {
    if (pageConfig.isNext) {
      setPageNo(pageNo + 1);
    }
  };

  // Handle previous page click
  const handlePrevious = () => {
    if (pageConfig.isPrevious) {
      setPageNo(pageNo - 1);
    }
  };

  return (
    <div className="w-full pt-[70px]">
      <div className="w-[95%] h-auto mx-auto border-2 p-2 rounded">
        <div className="flex items-center w-full justify-between">
          <div className="flex w-60 justify-between">
            <FontAwesomeIcon
              icon={faAddressCard}
              className="text-3xl bg-[#1B96FF] text-white p-2 rounded"
            />
            <select className="w-40 outline-none">
              <option>All Leads</option>
              <option>My Leads</option>
              <option>Today's Leads</option>
              <option>Yesterday's leads</option>
              <option>This week Leads</option>
              <option>Last Month Leads</option>
            </select>
          </div>
          <div className="w-72 flex justify-between">
            <Link href="/createlead/">
              <button className="w-32 rounded bg-[#1B96FF] p-2 text-white">
                Create Lead
                <span>
                  <FontAwesomeIcon icon={faChevronDown} />
                </span>
              </button>
            </Link>
            <button className="w-32 border-2 rounded p-2">
              Action
              <span>
                <FontAwesomeIcon icon={faChevronDown} />
              </span>
            </button>
          </div>
        </div>
        <div className="mt-3 flex">
          <input
            type="search"
            className="border p-1 rounded w-72 outline-none"
            placeholder=" Search"
          />
          <div className="flex w-3/5 justify-evenly items-center border-lg ml-3">
            {[
              "All leads",
              "Not Contacted",
              "Attempted",
              "Warm Lead",
              "Cold Leads",
            ].map((label, index) => (
              <div key={index} className="w-1/5">
                <button className="w-full border p-1 text-center">{label}</button>
              </div>
            ))}
          </div>
          <div className="w-60 border rounded ml-8">
            <button className="w-1/2 p-1 border bg-[#1B96FF] text-white rounded">
              <FontAwesomeIcon icon={faTable} className="text-xl" /> Table
            </button>
            <button className="w-1/2 p-1 border">
              <FontAwesomeIcon icon={faChartBar} /> Kanban
            </button>
          </div>
        </div>
        <div className="w-full h-auto border-2 mt-2">
          <table className="w-full">
            <thead className="border-b-2">
              <tr>
                <th className="w-1/6 border-r-2 p-1">Created on</th>
                <th className="w-1/6 border-r-2 p-1">Lead Status</th>
                <th className="w-1/6 border-r-2 p-1">Name</th>
                <th className="w-1/6 border-r-2 p-1">Phone</th>
                <th className="w-1/6 border-r-2 p-1">Email</th>
                <th className="w-1/6 border-r-2 p-1">Course</th>
              </tr>
            </thead>
            <tbody>
              {records && records.length > 0 ? (
                records.map((d, i) => (
                  <tr key={i} className="border-b">
                    <td className="w-1/6 text-center text-sm p-1">{d.date}</td>
                    <td className="w-1/6 text-center text-sm p-1">Warm Lead</td>
                    <td className="w-1/6 text-center text-sm p-1">{d.name}</td>
                    <td className="w-1/6 text-center text-sm p-1">{d.phone}</td>
                    <td className="w-1/6 text-center text-sm p-1">{d.email}</td>
                    <td className="w-1/6 text-center text-sm p-1">
                      <select className="outline-none p-2">
                        <option>Select</option>
                        <option>MERN</option>
                        <option>Java</option>
                        <option>Python</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="w-full h-7 flex justify-end text-sm gap-x-10 items-center">
          <div className="flex mr-14">
            <span
              className={`${
                pageConfig.isPrevious ? 'cursor-pointer' : 'cursor-not-allowed'
              }`}
              onClick={handlePrevious}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </span>
            <p className="mx-4">
              Page <span className="font-semibold">{pageNo}</span> of{" "}
              <span className="font-semibold">{Math.ceil(totalRecords / 10)}</span>
            </p>
            <span
              className={`${
                pageConfig.isNext ? 'cursor-pointer' : 'cursor-not-allowed'
              }`}
              onClick={handleNext}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
