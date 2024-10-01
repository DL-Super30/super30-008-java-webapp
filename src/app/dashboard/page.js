"use client"
import { useRouter } from "next/navigation";
import Charts from '../../components/charts';
import { useEffect, useState } from 'react';
function Dashboard() {
  const router = useRouter();
  const [leadsByHour, setLeadsByHour] = useState([]);
  const [leadsByStatus, setLeadsByStatus] = useState([]);
  // useEffect(() => {
  //   const savedToken = localStorage.getItem("token") || sessionStorage.getItem("token");
  //   if (!savedToken) {
  //     router.push('/');
  //   }
  // }, [router]);
  const ApiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchLeadsData = async () => {
      try {
        const response = await fetch(`${ApiUrl}/api/leadstatus/todayLeadsOnHourly`);
        const result = await response.json();
        const leads = result.data;
        // Process leads by time
        const processedLeadsByHour = processLeadsByHour(leads);
        // Fetch lead status data
        const statusResponse = await fetch(`${ApiUrl}/api/leadstatus/getleadStatus`);
        const statusResult = await statusResponse.json();
        const processedLeadsByStatus = processLeadsByStatus(statusResult.data);
        setLeadsByHour(processedLeadsByHour);
        setLeadsByStatus(processedLeadsByStatus);
      } catch (error) {
        console.error('Error fetching leads data:', error);
      }
    };
    fetchLeadsData();
  }, []);
  // Process leads to ensure 24-hour data in IST format
  const processLeadsByHour = (leads) => {
    const hoursInDay = Array.from({ length: 24 }, (_, i) => i); // 0 to 23
    const leadsPerHour = hoursInDay.map((hour) => {
      const leadForHour = leads.find(
        (lead) => {
          const localTime = new Date(lead.hour).toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            hour12: false,
          });
          return parseInt(localTime) === hour - 1;
        }
      );
      return {
        hour: hour.toString().padStart(2, '0') + ':00',
        leadCount: leadForHour ? parseInt(leadForHour.leadCount) : 0,
      };
    });
    return leadsPerHour;
  };
  // Process lead status for doughnut chart
  const processLeadsByStatus = (leads) => {
    const statusLabels = ['Not Contacted', 'Attempted', 'Warm Lead', 'Cold Lead'];
    const statusData = statusLabels.map((status) => {
      const lead = leads.find(lead => lead.leadStatus === status);
      return lead ? parseInt(lead.leadCount) : 0;
    });
    return {
      labels: statusLabels,
      data: statusData,
    };
  };
  return (
    <div className="min-h-screen bg-slate-100 pt-[100px]">
      <div className="container mx-auto">
        {/* <h1 className="text-center text-3xl font-bold mb-8">Leads Dashboard</h1> */}
        <Charts leadsByHour={leadsByHour} leadsByStatus={leadsByStatus} />
      </div>
    </div>
  );
}
export default Dashboard;