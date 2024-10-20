'use client'

import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faAngleDown, faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight, faSquarePollVertical, faTable, faXmark, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import LearnersKanban from "../kanbans/learnerskanban"
import Editlearner from "./editlearner"
import Createlearner from "./createlearner"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Learners() {
    const [records, setRecords] = useState([])
    const [pages, setPages] = useState([])
    const [pageDisplay, setPageDisplay] = useState(1)
    const [pageConfig, setPageConfig] = useState({})
    const [searchTerm, setSearchTerm] = useState("")
    const [showcreatelearner, setShowCreateLearner] = useState(false)
    const [displayActions, setDisplayActions] = useState(false)
    const [showKanban, setShowKanban] = useState(false)
    const [ShowEditLearner, setShowEditLearner] = useState(false)
    const [deletelearner, setDeleteLearner] = useState(false)
    const [selectlearnerid, setSelectLearnerId] = useState(null)

    const Api_Url = process.env.NEXT_PUBLIC_API_URL
    const recordsPerPage = 10

    useEffect(() => {
        fetchdata()
    }, [pageDisplay])

    const fetchdata = async () => {
        try {
            const response = await fetch(`${Api_Url}/learnerdata`, { method: 'GET' })
            const result = await response.json()

            const totalPages = Math.ceil(result.length / recordsPerPage)
            const paginateRecords = result.slice(recordsPerPage * (pageDisplay - 1), recordsPerPage * pageDisplay)
            setRecords(paginateRecords)

            setPages(Array.from({ length: totalPages }, (_, i) => i + 1))

            setPageConfig({
                isPrevious: pageDisplay > 1,
                isNext: pageDisplay < totalPages
            })

        } catch (err) {
            console.error(err)
            toast.error('Failed to fetch data')
        }
    }

    const handlePageChange = (newpage) => {
        if (newpage >= 1 && newpage <= pages.length) {
            setPageDisplay(newpage)
        }
    }

    const filteredRecords = records.filter(record =>
        (record.firstname?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (record.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (record.phone || "").includes(searchTerm)
    )

    const showDeletePop = (learnerId) => {
        setSelectLearnerId(learnerId)
        setDeleteLearner(true)
    }

    const learnerDelete = async (learnerId) => {
        try {
            await fetch(`${Api_Url}/${learnerId}`, { method: 'DELETE' })
            await fetchdata()
            toast.success('Deleted learner', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            setTimeout(() => {
                setDeleteLearner(false)
                window.location.reload()
            }, 1500)
        } catch (err) {
            console.error(err)
            toast.error('Failed to delete', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }

    return (
        <div className="bg-gradient-to-br from-purple-600 to-blue-500 min-h-screen p-6">
            <ToastContainer />
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="p-6 bg-gray-50 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center mb-4 md:mb-0">
                            <FontAwesomeIcon icon={faAddressCard} className="text-4xl text-purple-600 mr-4" />
                            <select className="bg-white border-2 border-purple-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                                <option>All Learners</option>
                                <option>My Learners</option>
                                <option>Today's Learners</option>
                                <option>Yesterday's Learners</option>
                                <option>This week Learners</option>
                                <option>This Month Learners</option>
                                <option>Last Month Learners</option>
                            </select>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105"
                                onClick={() => setShowCreateLearner(true)}
                            >
                                Create Learner
                                <FontAwesomeIcon icon={faAngleDown} className="ml-2" />
                            </button>
                            <button
                                className={`py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 ${
                                    displayActions ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
                                }`}
                                onClick={() => setDisplayActions(!displayActions)}
                            >
                                {displayActions ? 'Hide Actions' : 'Show Actions'}
                                <FontAwesomeIcon icon={displayActions ? faXmark : faAngleDown} className="ml-2" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                        <input
                            className="w-full md:w-64 p-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4 md:mb-0"
                            type="search"
                            placeholder="Search learners..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="flex border-2 border-purple-300 rounded-lg overflow-hidden">
                            <button
                                className={`py-2 px-4 ${!showKanban ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}
                                onClick={() => setShowKanban(false)}
                            >
                                <FontAwesomeIcon icon={faTable} className="mr-2" />
                                Table
                            </button>
                            <button
                                className={`py-2 px-4 ${showKanban ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}
                                onClick={() => setShowKanban(true)}
                            >
                                <FontAwesomeIcon icon={faSquarePollVertical} className="mr-2" />
                                Kanban
                            </button>
                        </div>
                    </div>

                    {!showKanban ? (
                        <div className="overflow-x-auto bg-white rounded-lg shadow">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-700 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">Created on</th>
                                        <th className="py-3 px-6 text-left">Status</th>
                                        <th className="py-3 px-6 text-left">Name</th>
                                        <th className="py-3 px-6 text-left">Phone</th>
                                        <th className="py-3 px-6 text-left">Email</th>
                                        <th className="py-3 px-6 text-left">Course</th>
                                        {displayActions && <th className="py-3 px-6 text-left">Actions</th>}
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {filteredRecords.length > 0 ? (
                                        filteredRecords.map((d) => (
                                            <tr key={d.id} className="border-b border-gray-200 hover:bg-gray-100">
                                                <td className="py-3 px-6 text-left whitespace-nowrap">{d.createdAt}</td>
                                                <td className="py-3 px-6 text-left">-</td>
                                                <td className="py-3 px-6 text-left">{d.firstname}</td>
                                                <td className="py-3 px-6 text-left">{d.phone}</td>
                                                <td className="py-3 px-6 text-left">{d.email}</td>
                                                <td className="py-3 px-6 text-left">{d.registeredcourse}</td>
                                                {displayActions && (
                                                    <td className="py-3 px-6 text-left">
                                                        <div className="flex item-center justify-center">
                                                            <button
                                                                className="transform hover:text-purple-500 hover:scale-110 mr-3"
                                                                onClick={() => setShowEditLearner(true)}
                                                            >
                                                                <FontAwesomeIcon icon={faEdit} />
                                                            </button>
                                                            <button
                                                                className="transform hover:text-red-500 hover:scale-110"
                                                                onClick={() => showDeletePop(d.id)}
                                                            >
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                )}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={displayActions ? 7 : 6} className="py-3 px-6 text-center">
                                                No results found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <LearnersKanban />
                    )}

                    {!showKanban && (
                        <div className="flex justify-center mt-6 gap-x-2">
                            <button
                                className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-300"
                                onClick={() => setPageDisplay(1)}
                            >
                                <FontAwesomeIcon icon={faAnglesLeft} />
                            </button>
                            <button
                                className={`p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-300 ${
                                    !pageConfig.isPrevious && 'opacity-50 cursor-not-allowed'
                                }`}
                                onClick={() => handlePageChange(pageDisplay - 1)}
                                disabled={!pageConfig.isPrevious}
                            >
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                            {pages.map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`p-2 rounded-md transition duration-300 ${
                                        pageDisplay === page
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-gray-200 hover:bg-gray-300'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                className={`p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-300 ${
                                    !pageConfig.isNext && 'opacity-50 cursor-not-allowed'
                                }`}
                                onClick={() => handlePageChange(pageDisplay + 1)}
                                disabled={!pageConfig.isNext}
                            >
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                            <button
                                className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-300"
                                onClick={() => setPageDisplay(pages[pages.length - 1])}
                            >
                                <FontAwesomeIcon icon={faAnglesRight} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {showcreatelearner && <Createlearner setShowCreateLearner={setShowCreateLearner} />}
            {ShowEditLearner && <Editlearner setShowEditLearner={setShowEditLearner} />}

            {deletelearner && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-sm w-full">
                        <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
                        <p className="mb-6">Are you sure you want to delete this learner?</p>
                        <div className="flex justify-end gap-4">
                            <button
                                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-300"
                                onClick={() => setDeleteLearner(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                                onClick={() => learnerDelete(selectlearnerid)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}