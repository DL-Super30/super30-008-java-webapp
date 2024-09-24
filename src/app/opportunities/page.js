'use client'

import { useState, useEffect } from 'react'
import Image from "next/image"
import { faAngleDown, faAngleUp, faTable, faColumns, faSearch, faPen, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import OpportunityForm from "../../components/OpportunityForm"
import UpdateOpportunityForm from '@/components/updateOpportunity'

export default function Opportunities() {
  const [activeOpportunityStatus, setActiveOpportunityStatus] = useState("All Opportunities")
  const [searchQuery, setSearchQuery] = useState("")
  const [showOpportunityForm, setShowOpportunityForm] = useState(false)
  const [view, setView] = useState("Table")
  const [opportunities, setOpportunities] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedOpportunityIds, setSelectedOpportunityIds] = useState([])
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [opportunityToUpdate, setOpportunityToUpdate] = useState(null)

  useEffect(() => {
    async function fetchOpportunities() {
      try {
        const response = await fetch('http://localhost:3000/opportunities')
        if (!response.ok) throw new Error('Network response was not ok')
        const data = await response.json()
        console.log("Fetched opportunities data:", data)
        setOpportunities(data)
      } catch (error) {
        console.error('Error fetching opportunities data:', error)
      }
    }
    fetchOpportunities()
  }, [])

  const getFilteredOpportunities = () => {
    let filtered = opportunities

    if (activeOpportunityStatus !== "All Opportunities") {
      filtered = filtered.filter(opportunity => opportunity.Opportunitystatus === activeOpportunityStatus)
    }

    if (searchQuery) {
      filtered = filtered.filter(opportunity =>
        opportunity.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return filtered
  }

  const getOpportunitiesCountByStatus = (status) => {
    if (status === "All Opportunities") {
      return opportunities.length;
    }
    return opportunities.filter(opportunity => opportunity.Opportunitystatus === status).length;
  }
  

  const handleViewClick = (viewType) => {
    setView(viewType)
  }

  const handleOpportunityStatusClick = (status) => {
    setActiveOpportunityStatus(status)
  }

  const toggleOpportunityForm = () => {
    setShowOpportunityForm(prev => !prev)
  }

  const handleDeleteOpportunity = async (opportunityId) => {
    try {
      const response = await fetch(`http://localhost:3000/opportunities/${opportunityId}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete opportunity")
      setOpportunities(opportunities.filter((opportunity) => opportunity.id !== opportunityId))
    } catch (error) {
      console.error("Error deleting opportunity:", error)
    }
  }

  const handleEditOpportunity = (opportunity, event) => {
    // Check if the click event originated from the checkbox
    if (event.target.type !== 'checkbox') {
      setOpportunityToUpdate(opportunity)
      setShowUpdateForm(true)
    }
  }

  const handleUpdateFormClose = () => {
    setShowUpdateForm(false)
    setOpportunityToUpdate(null)
  }

  const getOpportunitiesByStatus = (status) => {
    return getFilteredOpportunities().filter(opportunity => 
      opportunity.Opportunitystatus &&
      opportunity.Opportunitystatus.toLowerCase() === status.toLowerCase()
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev)
  }

  const handleDelete = async () => {
    if (selectedOpportunityIds.length === 0) return

    try {
      const promises = selectedOpportunityIds.map(id =>
        fetch(`http://localhost:3000/opportunities/${id}`, {
          method: "DELETE",
        })
      )
      await Promise.all(promises)

      setOpportunities(opportunities.filter((opportunity) => !selectedOpportunityIds.includes(opportunity.id)))
      setIsDropdownOpen(false)
      setSelectedOpportunityIds([])
    } catch (error) {
      console.error("Error deleting Opportunities:", error)
    }
  }

  const handleCheckboxChange = (event, id) => {
    event.stopPropagation()
    const isChecked = event.target.checked
    setSelectedOpportunityIds((prevSelectedIds) => {
      if (isChecked) {
        return [...prevSelectedIds, id]
      } else {
        return prevSelectedIds.filter((selectedId) => selectedId !== id)
      }
    })
  }

  const getColorByStatus = (status) => {
    switch (status) {
      case 'Visiting':
        return 'bg-red-200'
      case 'Visited':
        return 'bg-yellow-200'
      case 'Demo Attended':
        return 'bg-green-200'
      case 'Lost Opportunity':
        return 'bg-blue-200'
      default:
        return 'bg-gray-200'
    }
  }

  return (
    <div className="lg:w-full">
      <div className="mx-5 my-2.5 py-2.5 shadow-lg border-2 bg-white rounded-lg">
        <div className="mb-5">
          <div className="flex flex-wrap justify-between items-center px-5 py-2 gap-3">
            <div className="flex items-center gap-3">
              <Image src="/images/1.svg" alt="logo" width={44} height={44} />
              <h2 className="text-2xl font-medium text-black flex items-center gap-2">
                All Opportunities <FontAwesomeIcon icon={faAngleDown} />
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={toggleOpportunityForm}
                className="bg-teal-600 text-white text-sm rounded-lg border-black px-4 p-1 leading-6 gap-2"
              >
                {showOpportunityForm ? "Close Opportunity Form" : "Create Opportunity"}{" "}
                <FontAwesomeIcon icon={showOpportunityForm ? faAngleUp : faAngleDown} className="mt-2" />
              </button>
              <button
                onClick={toggleDropdown}
                className="bg-blue-200 text-black-800 text-sm rounded-md border border-gray-300 px-4 p-1 leading-6 flex items-center gap-2"
              >
                Actions <FontAwesomeIcon icon={faAngleDown} className="ml-1" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-9 mt-8 w-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                    <button
                      onClick={handleDelete}
                      className="w-full text-center px-4 py-2 text-sm text-red-600 bg-red-100 hover:bg-red-200"
                      role="menuitem"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
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
                  className="w-full h-8 rounded-md border border-[#969492] pl-10 p-1.5 text-gray-900"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="inline-flex rounded-md shadow-sm">
                {["All Opportunities", "Visiting", "Visited", "Demo Attended", "Lost Opportunity"].map((status) => (
                  <button
                    key={status}
                    type="button"
                    className={`inline-flex gap-2 items-center px-4 py-1 text-sm font-normal border focus:border-transparent transition duration-700 ${activeOpportunityStatus === status
                        ? "bg-teal-600 text-white border-green-600"
                        : "bg-white text-black-800 border-teal-300"
                      }`}
                    onClick={() => handleOpportunityStatusClick(status)}
                  >
                    {status}
                    <p className="bg-yellow-100 py-1 px-2.5 rounded-full text-blue-800">
                      {getOpportunitiesCountByStatus(status)}
                    </p>
                  </button>
                ))}
              </div>
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-normal border focus:border-transparent ${view === 'Table' ? 'bg-teal-600 text-white border-blue-600' : 'bg-white text-black-800 border-teal-300'}`}
                  onClick={() => handleViewClick("Table")}
                >
                  <FontAwesomeIcon icon={faTable} />
                  Table
                </button>
                <button
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-normal border focus:border-transparent ${view === 'Kanban' ? 'bg-teal-600 text-white border-blue-600' : 'bg-white text-black-800 border-teal-300'}`}
                  onClick={() => handleViewClick("Kanban")}
                >
                  <FontAwesomeIcon icon={faColumns} />
                  Kanban
                </button>
              </div>
            </div>
          </div>
        </div>

        {view === "Table" ? (
          <div className="overflow-x-auto px-5 pb-5">
            <table className="min-w-full border-collapse block md:table">
              <thead className="block md:table-header-group">
                <tr className="bg-green-100 text-gray-800 block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative ">
                  <th className="border px-2 py-2" style={{ width: '50px' }}>Checkbox</th>
                  <th className="border px-4 py-2 font-medium text-center block md:table-cell">Name</th>
                  <th className="border px-4 py-2 font-medium text-center block md:table-cell">Email</th>
                  <th className="border px-4 py-2 font-medium text-center block md:table-cell">Phone</th>
                  <th className="border px-4 py-2 font-medium text-center block md:table-cell">Status</th>
                  <th className="border px-4 py-2 font-medium text-center block md:table-cell">Course</th>
                </tr>
              </thead>
              <tbody className="block md:table-row-group">
                {getFilteredOpportunities().map((opportunity) => (
                  <tr key={opportunity.id} className="bg-white border cursor-pointer hover:bg-yellow-50 block md:table-row">
                    <td className="border px-2 py-2">
                      <input
                        type="checkbox"
                        checked={selectedOpportunityIds.includes(opportunity.id)}
                        onChange={(event) => handleCheckboxChange(event, opportunity.id)}
                        onClick={(event) => event.stopPropagation()}
                      />
                    </td>
                    <td className="p-3 text-gray-900 text-center block md:table-cell" onClick={(event) => handleEditOpportunity(opportunity, event)}>{opportunity.name}</td>
                    <td className="p-3 text-gray-900 text-center block md:table-cell" onClick={(event) => handleEditOpportunity(opportunity, event)}>{opportunity.email}</td>
                    <td className="p-3 text-gray-900 text-center block md:table-cell" onClick={(event) => handleEditOpportunity(opportunity, event)}>{opportunity.phone}</td>
                    <td className="p-3 text-gray-900 text-center block md:table-cell" onClick={(event) => handleEditOpportunity(opportunity, event)}>{opportunity.Opportunitystatus}</td>
                    <td className="p-3 text-gray-900 text-center block md:table-cell" onClick={(event) => handleEditOpportunity(opportunity, event)}>{opportunity.course}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="kanban-view">
            <div className="w-full overflow-auto px-5 h-full">
              <div className="flex gap-3">
                {["Visiting", "Visited", "Demo Attended", "Lost Opportunity"].map((status) => (
                  <div key={status} className="h-full grid gap-4 min-w-96">
                    <div className={`${getColorByStatus(status)} border-t-4 rounded-t-md h-20 py-3 px-5`}>
                      <h3 className="text-md font-medium text-black">{status}</h3>
                    </div>
                    <div className="bg-gray-200 px-0.5 flex flex-col items-center justify-start rounded">
                      {getOpportunitiesByStatus(status).length > 0 ? (
                        getOpportunitiesByStatus(status).map((opportunity) => (
                          <div
                            key={opportunity.id}
                            className="bg-white p-4 m-2 rounded-md shadow-md border border-gray-300 cursor-pointer hover:bg-yellow-50 min-h-[140px] w-full flex items-center justify-between"
                            onClick={(event) => handleEditOpportunity(opportunity, event)}
                          >
                            <input
                              type="checkbox"
                              checked={selectedOpportunityIds.includes(opportunity.id)}
                              onChange={(event) => handleCheckboxChange(event, opportunity.id)}
                              onClick={(event) => event.stopPropagation()}
                            />
                            <div className="w-full ml-4">
                              <h4 className="text-lg font-semibold truncate">{opportunity.name}</h4>
                              <p className="truncate">Phone: {opportunity.phone}</p>
                              <p className="truncate">Stack: {opportunity.stack}</p>
                              <p className="truncate">Status: {opportunity.Opportunitystatus}</p>
                              <p className="truncate">Course: {opportunity.course}</p>
                              <p className="truncate">Next Follow-up: {formatDate(opportunity.nextFollowUp)}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 mt-2">No opportunities available</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {showOpportunityForm && (
          <OpportunityForm onClose={toggleOpportunityForm} />
        )}
        {showUpdateForm && (
          <UpdateOpportunityForm Opportunity={opportunityToUpdate} onClose={handleUpdateFormClose} />
        )}
      </div>
    </div>
  )
}