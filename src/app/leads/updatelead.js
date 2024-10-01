'use client'

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faAddressCard, faPhone } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


export default function UpdateLead(props) {
  const { hideUpdateScreen, updateData } = props;
  const [cc , setCc] = useState("+ 91")

  const [formData, setFormData] = useState({
    name: updateData.leadname || "",
    cc:"+ 91",
    phone: updateData.phone || "",
    email: updateData.email || "",
    feeQuoted: 0,
    batchTiming: updateData.batchTiming || "",
    leadStatus: updateData.leadStatus || "",
    stack: updateData.stack || "",
    ClassMode: updateData.ClassMode ||"",
    opportunityStatus: updateData.opportunityStatus || "",
    opportunityStage:updateData.opportunityStage || "",
    DemoAttendedStage: updateData.DemoAttendedStage || "",
    visitedStage: updateData.visitedStage || "",
    lostOpportunityReason: updateData.lostOpportunityReason || "",
    nextFollowUp: updateData.nextFollowUp || "",
    leadSource: updateData.leadSource || "",
    course: updateData.course || "",
    description: updateData.description || ""
  });

  const [records, setRecords] = useState([]);
  const ApiUrl = process.env.NEXT_PUBLIC_API_URL;


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
      setRecords(data);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleConvert = async () => {

    try {
      // await fetch(`http://localhost:4000/api/leads/${updateData.id}`, { method: "DELETE" });
      // await fetch("http://localhost:4000/api/opportunity", {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      await axios.post(`${ApiUrl}/api/opportunity`,formData)

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

      // setTimeout(() => {
      //   window.location.reload(hideUpdateScreen());
      // }, 2000);
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
    <div className="w-full h-[100vh] p-3 absolute top-[0] left-[0] bg-black bg-opacity-50">
      <ToastContainer />
      <div className="w-4/5 mx-auto p-2">
        <div className="w-full h-16 mt-14 bg-[#CDC1FF] flex justify-between items-center">
          <div className="p-2 ml-5 items-center flex gap-x-20">
            <button className="text-lg p-1" onClick={hideUpdateScreen}>
              <FontAwesomeIcon icon={faChevronLeft} className="" /> Back
            </button>
            <div className="flex items-center gap-x-2">
              <p className="items-center">
                <FontAwesomeIcon icon={faAddressCard} className="p-2 bg-[#A594F9] text-white text-xl rounded" />
              </p>
              <p className="text-xl font-semibold italic">{formData.name}</p>
            </div>
          </div>
          <div className="flex gap-x-4">
            <button className="w-20 h-10 border-2 border-[#A594F9] bg-[#F5EFFF] rounded font-semibold" onClick={updateLead}>Update</button>
            <button className="w-20 h-10 bg-[#A594F9] rounded text-white mr-5 font-semibold" onClick={handleConvert}>Convert</button>
          </div>
        </div>

        <div className="w-full bg-[#F5EFFF] flex gap-x-2 h-14 border-2 border-[#A594F9] items-center">
          <div className="w-1/4 p-3">
            <h1>Lead Source</h1>
            <p className="text-[#1998FF] font-semibold">{formData.leadSource}</p>
          </div>
          <div className="w-1/4 p-3">
            <h1>Phone</h1>
            <p className="text-[#1998FF] font-semibold">
              <FontAwesomeIcon icon={faPhone} className="text-sm me-2" />
              <span>{formData.phone}</span>
            </p>
          </div>
          <div className="w-1/4 p-3">
            <h1>Email</h1>
            <p className="text-[#1998FF] font-semibold">{formData.email}</p>
          </div>
          <div className="w-1/4 p-3">
            <h1>Lead Status</h1>
            <p className={`font-semibold ${formData.leadStatus === "Not Contacted" ? "text-orange-500" : formData.leadStatus === "Attempted" ? "text-green-500" : formData.leadStatus === "Warm Lead" ? "text-yellow-400" : formData.leadStatus === "Cold Lead" ? "text-red-500" : ""}`}>
              {formData.leadStatus}
            </p>
          </div>
        </div>

        <div className="">
          <div className="w-full h-[70vh] overflow-y-scroll p-4 mt-0 bg-[#F5EFFF] ">
            <button className="border-b-4 border-b-[#A594F9] bg-[#CDC1FF] px-2 py-1 rounded-t-md">Details</button>
            <div className="w-full mt-2 bg-[#F5EFFF] mx-auto p-3">
              <div className="grid grid-cols-2 gap-x-5">
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
                  <input type="text" name="cc" value={cc} onChange={handleInputChange} placeholder="cc" className="border-b-2 border-b-[#A594F9] rounded p-1 mb-2 w-full outline-none" />
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
                  <label className="ml-2 text-[#A594F9] text-lg">Opportunity Status</label>
                  <br />
                  <select name="opportunityStatus" value={formData.opportunityStatus} onChange={handleInputChange} className="border-b-2 p-1 mt-1 w-full outline-none border-b-[#A594F9] rounded">
                    <option>Select Opportunity Status</option>
                    <option>Visiting</option>
                    <option>Visited</option>
                    <option>Demo Attended</option>
                    <option>Lost Opportunity</option>
                  </select>
                </div>
                <div>
                  <label className="ml-2 text-[#A594F9] text-lg">Batch Timing</label>
                  <br />
                  <input type="text" name="batchTiming" value={formData.batchTiming} onChange={handleInputChange} placeholder="Batch Timing" className="border-b-2 p-1 mb-2 w-full outline-none border-b-[#A594F9] rounded" />
                </div>
                <div>
                  <label className="ml-2 text-[#A594F9] text-lg">Stack</label>
                  <br />
                  <input type="text" name="stack" value={formData.stack} onChange={handleInputChange} placeholder="Stack" className="border-b-2 p-1 mb-2 w-full outline-none border-b-[#A594F9] rounded" />
                </div>
                <div>
                  <label className="ml-2 text-[#A594F9] text-lg">Class Mode</label>
                  <br />
                  <input type="text" name="ClassMode" value={formData.ClassMode} onChange={handleInputChange} placeholder="Class Mode" className="border-b-2 p-1 mb-2 w-full outline-none border-b-[#A594F9] rounded" />
                </div>
                <div>
                  <label className="ml-2 text-[#A594F9] text-lg">Opportunity Stage</label>
                  <br />
                  <input type="text" name="opportunityStage" value={formData.opportunityStage} onChange={handleInputChange} placeholder="Opportunity Stage" className="border-b-2 p-1 mb-2 w-full outline-none border-b-[#A594F9] rounded" />
                </div>
                <div>
                  <label className="ml-2 text-[#A594F9] text-lg">Demo Attended Stage</label>
                  <br />
                  <input type="text" name="DemoAttendedStage" value={formData.DemoAttendedStage} onChange={handleInputChange} placeholder="Demo Attended Stage" className="border-b-2 p-1 mb-2 w-full outline-none border-b-[#A594F9] rounded" />
                </div>
                <div>
                  <label className="ml-2 text-[#A594F9] text-lg">Visited Stage</label>
                  <br />
                  <input type="text" name="visitedStage" value={formData.visitedStage} onChange={handleInputChange} placeholder="Visited Stage" className="border-b-2 p-1 mb-2 w-full outline-none border-b-[#A594F9] rounded" />
                </div>
                <div>
                  <label className="ml-2 text-[#A594F9] text-lg">Lost Opportunity Reason</label>
                  <br />
                  <input type="text" name="lostOpportunityReason" value={formData.lostOpportunityReason} onChange={handleInputChange} placeholder="Lost Opportunity Reason" className="border-b-2 p-1 mb-2 w-full outline-none border-b-[#A594F9] rounded" />
                </div>
                <div>
                  <label className="ml-2 text-[#A594F9] text-lg">Next Follow Up</label>
                  <br />
                  <input type="datetime-local" name="nextFollowUp" value={formData.nextFollowUp} onChange={handleInputChange} placeholder="Next Follow Up" className="border-b-2 p-1 mb-2 w-full outline-none border-b-[#A594F9] rounded" />
                </div>
                <div>
                  <label className="ml-2 text-[#A594F9] text-lg">Course</label>
                  <br />
                  <input type="text" name="course" value={formData.course} onChange={handleInputChange} placeholder="Course" className="border-b-2 p-1 mb-2 w-full outline-none border-b-[#A594F9] rounded" />
                </div>
                <div>
                  <label className="ml-2 text-[#A594F9] text-lg">Fee Quoted</label>
                  <br />
                  <input type="number" name="feeQuoted" value={formData.feeQuoted} onChange={handleInputChange} placeholder="Course" className="border-b-2 p-1 mb-2 w-full outline-none border-b-[#A594F9] rounded" />
                </div>
              </div>
              <div className="w-full p-1">
                <label className="text-[#ACC9E1]">Description</label>
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

              