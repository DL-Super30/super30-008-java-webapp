'use client'

import React from "react"
import LineChart from "@/components/lineChart"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'

export default function Dashboard() {
    return (
        <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 min-h-screen p-6">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="p-6 bg-gray-50 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[
                            "Not Contacted",
                            "Warm Lead",
                            "Attempted",
                            "Registered",
                            "Opportunity",
                            "Cold Lead"
                        ].map((status, index) => (
                            <button
                                key={index}
                                className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-50 transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                <FontAwesomeIcon icon={faUserGroup} className="mr-2 text-indigo-600" />
                                <span className="font-medium text-gray-700">{status}</span>
                            </button>
                        ))}
                    </div>

                    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                        <div className="flex flex-col lg:flex-row">
                            <div className="w-full lg:w-3/5 mb-6 lg:mb-0 lg:pr-6">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">Lead Trends</h2>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <LineChart />
                                </div>
                            </div>
                            <div className="w-full lg:w-2/5 flex items-center justify-center">
                                <div className="w-64 h-64 rounded-full border-4 border-indigo-500 flex flex-col items-center justify-center bg-white shadow-lg">
                                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Today's Count</h2>
                                    <p className="text-4xl font-bold text-indigo-600">0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}