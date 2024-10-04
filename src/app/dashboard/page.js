'use client'

import { useRouter } from "next/navigation"
import Charts from '../../components/charts'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function Dashboard() {
  const router = useRouter()
  const [leadsByHour, setLeadsByHour] = useState([])
  const [leadsByStatus, setLeadsByStatus] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const ApiUrl = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const fetchLeadsData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${ApiUrl}/api/leadstatus/todayLeadsOnHourly`)
        const result = await response.json()
        const leads = result.data

        const processedLeadsByHour = processLeadsByHour(leads)

        const statusResponse = await fetch(`${ApiUrl}/api/leadstatus/getleadStatus`)
        const statusResult = await statusResponse.json()
        const processedLeadsByStatus = processLeadsByStatus(statusResult.data)

        setLeadsByHour(processedLeadsByHour)
        setLeadsByStatus(processedLeadsByStatus)
      } catch (error) {
        console.error('Error fetching leads data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeadsData()
  }, [])

  const processLeadsByHour = (leads) => {
    const hoursInDay = Array.from({ length: 24 }, (_, i) => i)
    const leadsPerHour = hoursInDay.map((hour) => {
      const leadForHour = leads.find(
        (lead) => {
          const localTime = new Date(lead.hour).toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            hour12: false,
          })
          return parseInt(localTime) === hour - 1
        }
      )
      return {
        hour: hour.toString().padStart(2, '0') + ':00',
        leadCount: leadForHour ? parseInt(leadForHour.leadCount) : 0,
      }
    })
    return leadsPerHour
  }

  const processLeadsByStatus = (leads) => {
    const statusLabels = ['Not Contacted', 'Attempted', 'Warm Lead', 'Cold Lead']
    const statusData = statusLabels.map((status) => {
      const lead = leads.find(lead => lead.leadStatus === status)
      return lead ? parseInt(lead.leadCount) : 0
    })
    return {
      labels: statusLabels,
      data: statusData,
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* <h1 className="text-3xl font-bold text-indigo-800 mb-8 text-center">Leads Dashboard</h1> */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="p-6">
              <Charts leadsByHour={leadsByHour} leadsByStatus={leadsByStatus} />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Dashboard