import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { axiosInstance } from "../../services/axiosInstance";

function Dashboard() {
  // const [userData, setUserData] = useState([]);
  // const [eventsData, setEventsData] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchAllUsersData = async () => {
  //     try {
  //       const { responseUserData } = await axiosInstance.get(''); // Add your API endpoint here
//         const { responseEventData } = await axiosInstance.get('');
//         setEventsData(responseEventData);
  //       setUserData(responseUserData);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching events:", error);
  //       setLoading(false);
  //     }
  //   };
  //   fetchAllUsersData(); // Call the function to fetch data
  // }, []);

  const userData = [
    { name: "Attendee", value: 400 },
    { name: "Organizer", value: 300 },
  ];

  const COLORS = ["#8884d8", "#82ca9d"]; // Colors for each segment

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       Loading...
  //     </div>
  //   );
  // }

  // Data for line chart
  const eventsData = [
    { name: "Event A", attendees: 120 },
    { name: "Event B", attendees: 200 },
    { name: "Event C", attendees: 150 },
    { name: "Event D", attendees: 80 },
    { name: "Event E", attendees: 170 },
  ];

  return (
    <>
    <h1 className="text-3xl text-center font-semibold mb-4">Dashboard</h1>
    <div className="flex flex-col min-h-screen justify-center items-center">
      
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 w-full">
        {/* Pie Chart */}
        <div className="flex justify-center items-center w-full md:w-[400px] h-[400px]">
          <PieChart width={400} height={400}>
            <Pie
              data={userData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {userData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </div>

        {/* Line Chart */}
        <div className="flex justify-center items-center w-full md:w-[500px] h-[400px]">
          <ResponsiveContainer>
            <LineChart data={eventsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" label={{ value: "Event Names", position: "insideBottomRight", offset: -10 }} />
              <YAxis label={{ value: "Number of Attendees", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="attendees" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
    </>
  );
}

export default Dashboard;
