"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { faAngleDown, faAngleUp, faTable, faColumns, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LeadForm from "../../components/leadForm";
import UpdateLeadForm from "../../components/updateLead";

export default function Leads() {
  const [activeLeadStatus, setActiveLeadStatus] = useState("All Leads");
  const [searchQuery, setSearchQuery] = useState("");
  const [showLeadForm, setShowLeadForm] = useState(false); // For toggling the Lead Form
  const [view, setView] = useState("Table");
  const [leads, setLeads] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false); // For toggling the Update Form
  const [leadToUpdate, setLeadToUpdate] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLeadIds, setSelectedLeadIds] = useState([]); // Multiple selected leads
  const [showToast, setShowToast] = useState(false); // State for managing the toast notification

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

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Delete functionality with toast notification
  const handleDelete = async () => {
    if (selectedLeadIds.length === 0) return; // Ensure at least one lead is selected
  
    try {
      const promises = selectedLeadIds.map(id =>
        fetch(`http://localhost:3000/leads${id}`, {
          method: "DELETE",
        })
      );
      await Promise.all(promises); // Wait for all leads to be deleted
  
      // Update leads state to remove the deleted leads
      setLeads(leads.filter((lead) => !selectedLeadIds.includes(lead.id)));
      setIsDropdownOpen(false); // Close dropdown after deletion
      setSelectedLeadIds([]); // Reset selectedLeadIds
    } catch (error) {
      console.error("Error deleting leads:", error);
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

  const handleCheckboxChange = (leadId, isChecked) => {
    if (isChecked) {
      setSelectedLeadIds((prevSelected) => [...prevSelected, leadId]); // Add lead ID to selected
    } else {
      setSelectedLeadIds((prevSelected) =>
        prevSelected.filter((id) => id !== leadId) // Remove lead ID from selected
      );
    }
  };
  

  const categorizeLeadsByStatus = () => {
    const statuses = ["Not Contacted", "Attempted", "Warm Lead", "Cold Lead"];
    return statuses.reduce((acc, status) => {
      acc[status] = getFilteredLeads().filter(lead => lead.status === status);
      return acc;
    }, {});
  };

  const getColorByStatus = (status) => {
    switch (status) {
      case 'Not Contacted':
        return 'bg-red-200'; // Light red
      case 'Attempted':
        return 'bg-yellow-200'; // Light yellow
      case 'Warm Lead':
        return 'bg-green-200'; // Light green
      case 'Cold Lead':
        return 'bg-blue-200'; // Light blue
      default:
        return 'bg-gray-200'; // Default gray
    }
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
                className="bg-teal-600 text-white text-sm rounded-lg border border-green-600 px-4 p-1 leading-6 gap-2"
              >
                {showLeadForm ? "Close Lead Form" : "Create Lead"}{" "}
                <FontAwesomeIcon icon={showLeadForm ? faAngleUp : faAngleDown} className="mt-2" />
              </button>
              {/* Actions Button */}
              <button
                onClick={toggleDropdown}
                className="bg-blue-200 text-black-800 text-sm rounded-md border border-gray-300 px-4 p-1 leading-6 flex items-center gap-2"
              >
                Actions <FontAwesomeIcon icon={faAngleDown} className="ml-1" />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-9 mt-8 w-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                    {/* Delete Button */}
                    <button
                      onClick={handleDelete}
                      className="w-full text-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      role="menuitem"
                    >
                      Delete Lead
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Toast Notification */}
          {showToast && (
            <div className="fixed top-16 right-5 bg-green-500 text-white p-4 rounded-md shadow-lg z-50">
              Lead deleted successfully!
            </div>
          )}

          {/* Render Lead Form */}
          {showLeadForm && <LeadForm onClose={toggleLeadForm} />}

          {/* Update Form Modal */}
          {showUpdateForm && (
            <UpdateLeadForm lead={leadToUpdate} onClose={handleUpdateFormClose} />
          )}
        

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
                  ? "bg-teal-600 text-white border-green-600"
                  : "bg-white text-black-800 border-teal-300"
                  }`}
                onClick={() => handleLeadStatusClick(status)}
              >
                {status}
                <p className="bg-yellow-100 py-1 px-2.5 rounded-full text-blue-800">
                  {getLeadsCountByStatus(status)}
                </p>
              </button>
            ))}
          </div>
          <div className="inline-flex rounded-md shadow-sm">
            <button
              className={`flex items-center gap-2 px-4 py-2 text-sm font-normal border rounded-s-lg ${view === "Table" ? "bg-teal-600 text-white" : "bg-white text-gray-800 border-gray-300"}`}
              onClick={() => handleViewClick("Table")}
            >
              <FontAwesomeIcon icon={faTable} />
              Table
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 text-sm font-normal border rounded-e-lg ${view === "Kanban" ? "bg-teal-600 text-white" : "bg-white text-gray-800 border-gray-300"}`}
              onClick={() => handleViewClick("Kanban")}
            >
              <FontAwesomeIcon icon={faColumns} />
              Kanban
            </button>
          </div>
        </div>
      </div>

      {view === "Table" ? (
        <div className="overflow-x-auto px-5 pb-5">
          <table className="min-w-full table-auto border-collapse block md:table">
            <thead>
              <tr className="bg-green-100 text-gray-800 block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                <th className="border px-2 py-2" style={{ width: '50px' }}>Checkbox</th>
                <th className="border px-4 py-2 font-medium text-center block md:table-cell">Created on</th>
                <th className="border px-4 py-2 font-medium text-center block md:table-cell">Lead Status</th>
                <th className="border px-4 py-2 font-medium text-center block md:table-cell">Name</th>
                <th className="border px-4 py-2 font-medium text-center block md:table-cell">Phone</th>
                <th className="border px-4 py-2 font-medium text-center block md:table-cell">Stack</th>
                <th className="border px-4 py-2 font-medium text-center block md:table-cell">Course</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredLeads().length > 0 ? (
                getFilteredLeads().map((lead) => (
                  <tr key={lead.id} className="bg-white border cursor-pointer hover:bg-yellow-50" >
                    <td className="border px-2 py-2">
                      <input
                         
                         type="checkbox"
                         checked={selectedLeadIds.includes(lead.id)} // Make sure the checkbox reflects the selection state
                         onChange={(event) => {
                           event.stopPropagation(); // Prevent row click
                           handleCheckboxChange(lead.id, event.target.checked); 
                        }}
                      />
                    </td>
                    <td className="p-3 text-gray-900 text-center block md:table-cell" onClick={() => handleEditLead(lead)}>{lead.date}</td>
                    <td className="p-3 text-gray-900 text-center block md:table-cell" onClick={() => handleEditLead(lead)}>{lead.status}</td>
                    <td className="p-3 text-gray-900 text-center block md:table-cell" onClick={() => handleEditLead(lead)}>{lead.name}</td>
                    <td className="p-3 text-gray-900 text-center block md:table-cell" onClick={() => handleEditLead(lead)}>{lead.phone}</td>
                    <td className="p-3 text-gray-900 text-center block md:table-cell" onClick={() => handleEditLead(lead)}>{lead.stack}</td>
                    <td className="p-3 text-gray-900 text-center block md:table-cell" onClick={() => handleEditLead(lead)}>{lead.course}</td>
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
        <div className="kanban-view">
          <div className="w-full overflow-auto px-5 h-full">
            <div className="flex gap-3">
              {Object.entries(categorizeLeadsByStatus()).map(([status, leads]) => (
                <div key={status} className="h-full grid gap-4 min-w-96">
                  {/* Status Header */}
                  <div
                    className={`${getColorByStatus(status)} border-t-4 rounded-t-md h-20 py-3 px-5`}
                  >
                    <h3 className="text-md font-medium text-black">{status}</h3>
                  </div>

                  {/* Leads Section */}
                  <div className="bg-gray-200  px-0.5 flex flex-col items-center justify-start rounded">
                    {leads.length > 0 ? (
                      leads.map((lead) => (
                        <div
                          key={lead.id}
                          className="bg-white p-4 m-2 rounded-md shadow-md border border-gray-300 cursor-pointer hover:bg-yellow-50 min-h-[140px] w-full flex items-center justify-between"
                          onClick={() => handleEditLead(lead)}
                        >
                          {/* Checkbox */}
                          <input
                             
                             type="checkbox"
                             checked={selectedLeadIds.includes(lead.id)} // Make sure the checkbox reflects the selection state
                             onChange={(event) => {
                               event.stopPropagation(); // Prevent row click
                               handleCheckboxChange(lead.id, event.target.checked);
                              }} 
                          />

                          <div className="w-full">
                            <h4 className="text-lg font-semibold truncate">{lead.name}</h4>
                            <p className="truncate">Phone: {lead.phone}</p>
                            <p className="truncate">Stack: {lead.stack}</p>
                            <p className="truncate">Status: {lead.status}</p>
                            <p className="truncate">Course: {lead.course}</p>
                            <p className="truncate">Date: {lead.date}</p>
                            <p className="truncate">Next Follow-up: {lead.nextFollowUp}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 mt-2">No leads available</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>

        {/* Render Lead Form */ }
  { showLeadForm && <LeadForm onClose={toggleLeadForm} /> }

  {/* Update Form Modal */ }
  {
    showUpdateForm && (
      <UpdateLeadForm lead={leadToUpdate} onClose={handleUpdateFormClose} />
    )
  }
      </div >
    </div >
  );
}
