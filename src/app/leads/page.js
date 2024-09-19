"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { faAngleDown, faAngleUp, faTable, faColumns, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LeadForm from "../../components/leadform";
import UpdateLeadForm from "../../components/updateLead";

export default function Leads() {
  const [activeLeadStatus, setActiveLeadStatus] = useState("All Leads");
  const [searchQuery, setSearchQuery] = useState("");
  const [showLeadForm, setShowLeadForm] = useState(false); // For toggling the Lead Form
  const [view, setView] = useState("Table");
  const [leads, setLeads] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false); // For toggling the Update Form
  const [leadToUpdate, setLeadToUpdate] = useState(null);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const response = await fetch('http://localhost:3000/leads');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setLeads(data);
      } catch (error) {
        console.error('Error fetching leads data:', error);
      }
    }
    fetchLeads();
  }, []);

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('-');
    return new Date(`${year}-${month}-${day}`);
  };

  const getFilteredLeads = () => {
    let filtered = leads;

    if (activeLeadStatus !== "All Leads") {
      filtered = filtered.filter(lead => lead.status === activeLeadStatus);
    }

    if (searchQuery) {
      filtered = filtered.filter(lead =>
        lead.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered = filtered.sort((a, b) => parseDate(b.date) - parseDate(a.date));

    return filtered;
  };

  const getLeadsCountByStatus = (status) => {
    return leads.filter(lead => status === "All Leads" || lead.status === status).length;
  };

  const handleViewClick = (viewType) => {
    setView(viewType);
  };

  const handleLeadStatusClick = (status) => {
    setActiveLeadStatus(status);
  };

  const toggleLeadForm = () => {
    setShowLeadForm((prev) => !prev); // Toggle the state of Lead Form
  };

  const handleDeleteLead = async (leadId) => {
    try {
      const response = await fetch(`http://localhost:3000/leads/${leadId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete lead");
      setLeads(leads.filter((lead) => lead.id !== leadId));
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  const handleEditLead = (lead) => {
    setLeadToUpdate(lead);
    setShowUpdateForm(true);
  };

  const handleUpdateFormClose = () => {
    setShowUpdateForm(false);
    setLeadToUpdate(null);
  };

  const handleCheckboxChange = (event) => {
    event.stopPropagation();
  };

  const categorizeLeadsByStatus = () => {
    const statuses = ["Not Contacted", "Attempted", "Warm Lead", "Cold Lead"];
    return statuses.reduce((acc, status) => {
      acc[status] = getFilteredLeads().filter(lead => lead.status === status);
      return acc;
    }, {});
  };

  return (
    <div className="lg:w-full">
      <div className="mx-5 my-2.5 py-2.5 shadow-lg border bg-white rounded-lg">
        <div className="mb-5">
          <div className="flex flex-wrap justify-between items-center px-5 py-2 gap-3">
            <div className="flex items-center gap-3">
              <Image src="/images/1.svg" alt="logo" width={44} height={44} />
              <h2 className="text-2xl font-medium text-gray-800 flex items-center gap-2">
                All Leads <FontAwesomeIcon icon={faAngleDown} />
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={toggleLeadForm}
                className="bg-blue-600 text-white text-sm rounded-lg border border-blue-600 px-4 p-1 leading-6 gap-2"
              >
                {showLeadForm ? "Close Lead Form" : "Create Lead"}{" "}
                <FontAwesomeIcon icon={showLeadForm ? faAngleUp : faAngleDown} className="mt-2" />
              </button>
              <button className="bg-white text-gray-800 text-sm rounded-md border border-gray-300 px-4 p-1 leading-6 gap-2">
                Actions <FontAwesomeIcon icon={faAngleDown} className="mt-2 ml-1" />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center px-5 py-2">
            <div className="flex flex-wrap gap-3 items-center">
              <div className="relative w-72">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="search"
                  className="w-full h-8 rounded-md border border-gray-300 pl-10 p-1.5 text-gray-800"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="inline-flex rounded-md shadow-sm">
                {["All Leads", "Not Contacted", "Attempted", "Warm Lead", "Cold Lead"].map((status) => (
                  <button
                    key={status}
                    type="button"
                    className={`inline-flex gap-2 items-center px-4 py-1 text-sm font-normal border focus:border-transparent transition duration-700 ${activeLeadStatus === status
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-800 border-gray-300"
                      }`}
                    onClick={() => handleLeadStatusClick(status)}
                  >
                    {status}
                    <p className="bg-blue-200 py-1 px-2.5 rounded-full text-blue-800">
                      {getLeadsCountByStatus(status)}
                    </p>
                  </button>
                ))}
              </div>
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-normal border rounded-s-lg ${view === "Table" ? "bg-blue-600 text-white" : "bg-white text-gray-800 border-gray-300"}`}
                  onClick={() => handleViewClick("Table")}
                >
                  <FontAwesomeIcon icon={faTable} />
                  Table
                </button>
                <button
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-normal border rounded-e-lg ${view === "Kanban" ? "bg-blue-600 text-white" : "bg-white text-gray-800 border-gray-300"}`}
                  onClick={() => handleViewClick("Kanban")}
                >
                  <FontAwesomeIcon icon={faColumns} />
                  Kanban
                </button>
              </div>
            </div>
          </div>

          {view === "Table" ? (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-blue-100 text-gray-800">
                    <th className="border px-2 py-2" style={{ width: '50px' }}>Checkbox</th>
                    <th className="border px-4 py-2">Created on</th>
                    <th className="border px-4 py-2">Lead Status</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Phone</th>
                    <th className="border px-4 py-2">Stack</th>
                    <th className="border px-4 py-2">Course</th>
                  </tr>
                </thead>
                <tbody>
                  {getFilteredLeads().length > 0 ? (
                    getFilteredLeads().map((lead) => (
                      <tr key={lead.id} className="bg-white border cursor-pointer hover:bg-gray-50" onClick={() => handleEditLead(lead)}>
                        <td className="border px-2 py-2">
                          <input
                            type="checkbox"
                            onClick={(event) => {
                              event.stopPropagation();
                              handleCheckboxChange(event);
                            }}
                          />
                        </td>
                        <td className="border px-4 py-2">{lead.date}</td>
                        <td className="border px-4 py-2">{lead.status}</td>
                        <td className="border px-4 py-2">{lead.name}</td>
                        <td className="border px-4 py-2">{lead.phone}</td>
                        <td className="border px-4 py-2">{lead.stack}</td>
                        <td className="border px-4 py-2">{lead.course}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center text-gray-500 py-4">
                        No leads found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(categorizeLeadsByStatus()).map(([status, leads]) => (
                <div key={status} className="bg-blue border rounded-lg p-4 shadow-sm">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">{status}</h3>
                  {leads.map((lead) => (
                    <div
                      key={lead.id}
                      className="bg-red-50 border p-2 mb-2 rounded-lg cursor-pointer hover:bg-gray-100"
                      onClick={() => handleEditLead(lead)}
                    >
                      <p className="font-semibold">{lead.name}</p>
                      <p className="text-sm text-gray-600">{lead.phone}</p>
                      <p className="text-sm text-gray-600">{lead.stack}</p>
                      <p className="text-sm text-gray-600">{lead.course}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Render Lead Form */}
        {showLeadForm && <LeadForm onClose={toggleLeadForm} />} 

        {/* Update Form Modal */}
        {showUpdateForm && (
          <UpdateLeadForm lead={leadToUpdate} onClose={handleUpdateFormClose} />
        )}
      </div>
    </div>
  );
}
