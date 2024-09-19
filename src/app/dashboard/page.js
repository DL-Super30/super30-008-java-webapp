"use client";

import { useState, useEffect } from 'react';
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const Dashboard = () => {
  const [leadData, setLeadData] = useState({
    notContacted: 0,
    warmLead: 0,
    attempted: 0,
    registered: 0,
    opportunity: 0,
    coldLead: 0,
  });
  
  const [graphData, setGraphData] = useState([]);
  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    // Fetch data dynamically (replace with your API or data source)
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/leads'); // Example API
      const data = await response.json();
      setLeadData(data.leadsOverview);
      setGraphData(data.graph);
      setAnalyticsData(data.analytics);
    };

    fetchData();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6052', '#92B6F4'];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Top Overview Cards */}
      <div className="grid grid-cols-6 gap-4 mb-6 ">
        <div className="bg-white rounded-lg p-4 shadow-md flex">
          <div><FontAwesomeIcon icon={faUserGroup} className="text-blue-500 w-8 h-8 p-2" /></div>
          <div className="p-2">
          <p className="text-sm text-gray-500">Not Contacted</p>
          <p className="text-xl font-bold">17</p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md flex">
          <div><FontAwesomeIcon icon={faUserGroup} className="text-blue-500 w-10 h-10 p-2" /></div>
          <div className="p-2">
          <p className="text-sm text-gray-500">Warm Lead</p>
          <p className="text-xl font-bold">17</p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md flex">
          <div><FontAwesomeIcon icon={faUserGroup} className="text-blue-500 w-10 h-10 p-2" /></div>
          <div className="p-2">
          <p className="text-sm text-gray-500">Attempted</p>
          <p className="text-xl font-bold">17</p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md flex">
          <div><FontAwesomeIcon icon={faUserGroup} className="text-blue-500 w-10 h-10 p-2" /></div>
          <div className="p-2">
          <p className="text-sm text-gray-500">Registered</p>
          <p className="text-xl font-bold">17</p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md flex">
          <div><FontAwesomeIcon icon={faUserGroup} className="text-blue-500 w-10 h-10 p-2" /></div>
          <div className="p-2">
          <p className="text-sm text-gray-500">Opportunity</p>
          <p className="text-xl font-bold">17</p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md flex">
          <div><FontAwesomeIcon icon={faUserGroup} className="text-blue-500 w-10 h-10 p-2" /></div>
          <div className="p-2">
          <p className="text-sm text-gray-500">Cold Lead</p>
          <p className="text-xl font-bold">17</p>
          </div>
        </div>
        
      </div>

      
     
    </div>
  );
};

export default Dashboard;
