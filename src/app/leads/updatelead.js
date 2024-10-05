'use client'

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faAddressCard, faPhone } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Select from 'react-select';

export default function UpdateLead(props) {
  const { hideUpdateScreen, updateData } = props;
  const [cc , setCc] = useState("+ 91");
  const [selectedCourses, setSelectedCourses] = useState([]);

  const courseOptions = [
    { value: 'HR Business Partner', label: 'HR Business Partner' },
    { value: 'HR Generalist', label: 'HR Generalist' },
    { value: 'HR Analytics', label: 'HR Analytics' },
    { value: 'Spoken English', label: 'Spoken English' },
    { value: 'Public Speaking', label: 'Public Speaking' },
    { value: 'Communication Skills', label: 'Communication Skills' },
    { value: 'Soft Skills', label: 'Soft Skills' },
    { value: 'Aptitude', label: 'Aptitude' },
    { value: 'IELTS', label: 'IELTS' },
    { value: 'TOFEL', label: 'TOFEL' },
    { value: 'GRE', label: 'GRE' },
    { value: 'JFS', label: 'JFS' },
    { value: 'PFS', label: 'PFS' },
    { value: 'MERN', label: 'MERN' },
    { value: 'AWS + Devops', label: 'AWS + Devops' },
    { value: 'Azure + Devops', label: 'Azure + Devops' },
    { value: 'Devops', label: 'Devops' },
  ];

  const [formData, setFormData] = useState({
    name: updateData.leadname || "",
    cc: "+ 91",
    phone: updateData.phone || "",
    email: updateData.email || "",
    feeQuoted: 0,
    batchTiming: updateData.batchTiming || "",
    leadStatus: updateData.leadStatus || "",
    stack: updateData.stack || "",
    ClassMode: updateData.ClassMode || "",
    opportunityStatus: updateData.opportunityStatus || "",
    opportunityStage: updateData.opportunityStage || "",
    DemoAttendedStage: updateData.DemoAttendedStage || "",
    visitedStage: updateData.visitedStage || "",
    lostOpportunityReason: updateData.lostOpportunityReason || "",
    nextFollowUp: updateData.nextFollowUp || "",
    leadSource: updateData.leadSource || "",
    course: updateData.course || selectedCourses,
    description: updateData.description || ""
  });

  const ApiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleCourseChange = (selectedOptions) => {
    setSelectedCourses(selectedOptions);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${ApiUrl}/api/leads`);
      const data = await response.json();
      // You might want to do something with the data here
    } catch (err) {
      console.log(err);
    }
  };

  const handleConvert = async () => {
    try {
      await axios.post(`${ApiUrl}/api/opportunity`, formData);
      fetchData();
      toast.info('Successfully converted into opportunity!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (err) {
      console.error(err);
      toast.error('Failed to convert lead. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const updateLead = async () => {
    try {
      await fetch(`${ApiUrl}/api/leads/${updateData.id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      fetchData();
      toast.info('Successfully Updated!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setTimeout(() => {
        window.location.reload(hideUpdateScreen());
      }, 2000);
    } catch (err) {
      console.error("failed to update", err);
      toast.error('Failed to update lead. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="w-full h-[130vh] p-3 absolute top-0 left-0 bg-black bg-opacity-50">
      <ToastContainer />
      <div className="w-full max-w-4xl mx-auto p-2">
        <div className="w-full h-16 mt-14 bg-[#CDC1FF] flex justify-between items-center">
          <div className="p-2 ml-5 flex gap-x-3  items-center">
            <button className="text-lg p-1 text-md" onClick={hideUpdateScreen}>
              <FontAwesomeIcon icon={faChevronLeft} /> Back
            </button>
            <div className="flex items-center gap-x-2 text-sm md:text-md">
              <FontAwesomeIcon icon={faAddressCard} className="p-2 bg-[#A594F9] text-white text-xl rounded" />
              <p className="text-xl font-semibold italic">{formData.name}</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 mr-4 ">
            <button className="w-full md:w-20 p-2 border-2 border-[#A594F9] bg-[#F5EFFF] rounded font-semibold" onClick={updateLead}>Update</button>
            {/* <button className="w-full md:w-20 h-10 bg-[#A594F9] rounded text-white font-semibold" onClick={handleConvert}>Convert</button> */}
          </div>
        </div>

        <div className="w-full bg-[#F5EFFF] flex gap-x-0 md:gap-x-2  h-16 border-2 border-[#A594F9] items-top md:items-center overflow-x-auto text-xs md:text-md ">
          <div className="w-1/4 p-1">
            <h1 className="">Lead Source</h1>
            <p className="text-[#1998FF] font-semibold">{formData.leadSource}</p>
          </div>
          <div className="w-1/4 p-1">
            <h1>Phone</h1>
            <p className="text-[#1998FF] font-semibold">
              <FontAwesomeIcon icon={faPhone} className="text-sm me-2" />
              <span>{formData.phone}</span>
            </p>
          </div>
          <div className="w-1/4 p-1">
            <h1>Email</h1>
            <p className="text-[#1998FF] font-semibold">{formData.email}</p>
          </div>
          <div className="w-1/4 p-1">
            <h1>Lead Status</h1>
            <p className={`font-semibold ${formData.leadStatus === "Not Contacted" ? "text-orange-500" : formData.leadStatus === "Attempted" ? "text-green-500" : formData.leadStatus === "Warm Lead" ? "text-yellow-400" : formData.leadStatus === "Cold Lead" ? "text-red-500" : ""}`}>
              {formData.leadStatus}
            </p>
          </div>
        </div>

        <div className="w-full h-[70vh] overflow-y-scroll p-4 mt-0 bg-[#F5EFFF]">
          <button className="border-b-4 border-b-[#A594F9] bg-[#CDC1FF] px-2 py-1 rounded-t-md">Details</button>
          <div className="w-full mt-2 bg-[#F5EFFF] mx-auto p-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="ml-2 text-[#A594F9] text-lg">Name</label>
                <br />
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" className="border-b-2 border-b-[#A594F9] rounded p-1 mb-2 w-full outline-none" />
              </div>
              <div>
                <label className="ml-2 text-[#A594F9] text-lg">Lead Status</label>
                <br />
                <select name="leadStatus" value={formData.leadStatus} onChange={handleInputChange} className="border-b-2 p-1 mt-1 w-full outline-none border-b-[#A594F9] rounded">
                  <option>Select Lead Status</option>
                  <option>Not Contacted</option>
                  <option>Attempted</option>
                  <option>Warm Lead</option>
                  <option>Cold Lead</option>
                </select>
              </div>
              <div>
                <label className="ml-2 text-[#A594F9] text-lg">Phone</label>
                <br />
                <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone" className="border-b-2 p-1 mb-2 w-full outline-none border-b-[#A594F9] rounded" />
              </div>
              <div>
                <label className="ml-2 text-[#A594F9] text-lg">Email</label>
                <br />
                <input type="text" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="border-b-2 p-1 mb-2 w-full outline-none border-b-[#A594F9] rounded" />
              </div>
              <div>
                <label className="ml-2 text-[#A594F9] text-lg">Lead Source</label>
                <br />
                <select name="leadSource" value={formData.leadSource} onChange={handleInputChange} className="border-b-2 p-1 mt-1 w-full outline-none border-b-[#A594F9] rounded">
                  <option>Select Lead Source</option>
                  <option>None</option>
                  <option>Walk in</option>
                  <option>Student Referral</option>
                  <option>Demo</option>
                  <option>Website</option>
                  <option>Website Chat</option>
                  <option>Inbound Call</option>
                  <option>Google Adverts</option>
                  <option>Facebook Ads</option>
                  <option>Google Business</option>
                  <option>WhatsApp Skill Capital</option>
                </select>
              </div>
              <div>
                <label className="ml-2 text-[#A594F9] text-lg">Batch Timing</label>
                <br />
                <input type="text" name="batchTiming" value={formData.batchTiming} onChange={handleInputChange} placeholder="Batch Timing" className="border-b-2 p-1 mb-2 w-full outline-none border-b-[#A594F9] rounded" />
              </div>
              <div>
                <label className="ml-2 text-[#A594F9] text-lg">Class Mode</label>
                <br />
                <input type="text" name="ClassMode" value={formData.ClassMode} onChange={handleInputChange} placeholder="Class Mode" className="border-b-2 p-1 mb-2 w-full outline-none border-b-[#A594F9] rounded" />
              </div>
              <div>
                <label className="ml-2 text-[#A594F9] text-lg">Course</label>
                <br />
                <Select 
                  options={courseOptions}
                  value={selectedCourses}
                  onChange={handleCourseChange}
                  isMulti={true}
                  className="mt-1"
                  classNamePrefix="select"
                />
              </div>
              <div>
                <label className="ml-2 text-[#A594F9] text-lg">Fee Quoted</label>
                <br />
                <input type="number" name="feeQuoted" value={formData.feeQuoted} onChange={handleInputChange} placeholder="Fee Quoted" className="border-b-2 p-1 mb-2 w-full outline-none border-b-[#A594F9] rounded" />
              </div>
              <div>
                <label className="ml-2 text-[#A594F9] text-lg">Description</label>
                <br />
                <input name="description" value={formData.description} onChange={handleInputChange} className="border-b-2 w-full outline-none border-b-[#A594F9] rounded p-4" placeholder="Description" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
