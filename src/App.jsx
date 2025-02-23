// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import io from 'socket.io-client';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from 'recharts';
// import styled from 'styled-components';
// import gsap from 'gsap';
// import './App.css';

// const socket = io('http://localhost:5000');

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   background: linear-gradient(to right, #001f3f, #0074d9);
//   color: white;
// `;

// const CircularContainer = styled.div`
//   position: relative;
//   width: 300px;
//   height: 300px;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 24px;
//   font-weight: bold;
//   background: radial-gradient(circle, #ffcc00 30%, #ff6600);
//   box-shadow: 0 0 30px rgba(255, 165, 0, 0.5);
// `;

// const OuterCurve = styled.div`
//   position: absolute;
//   width: 350px;
//   height: 350px;
//   border-radius: 50%;
//   border: 5px solid rgba(255, 255, 255, 0.5);
//   animation: rotate 8s linear infinite;

//   @keyframes rotate {
//     from {
//       transform: rotate(0deg);
//     }
//     to {
//       transform: rotate(360deg);
//     }
//   }
// `;

// const ChartContainer = styled.div`
//   width: 80%;
//   margin-top: 20px;
//   background: rgba(255, 255, 255, 0.1);
//   padding: 20px;
//   border-radius: 10px;
// `;

// const App = () => {
//   const [oceanData, setOceanData] = useState([]);
//   const [latestData, setLatestData] = useState({ temperature: 0, pressure: 0, seaLevel: 0 });

//   useEffect(() => {
//     // Fetch initial data
//     axios.get('http://localhost:5000/api/ocean-data').then((response) => {
//       if (response.data) {
//         setLatestData(response.data);
//         setOceanData([response.data]);
//       }
//     });

//     // Listen for real-time updates
//     socket.on('ocean-data-update', (newData) => {
//       setLatestData(newData);
//       setOceanData((prevData) => [...prevData, newData]);
//     });

//     return () => {
//       socket.off('ocean-data-update');
//     };
//   }, []);

//   useEffect(() => {
//     const handleMouseMove = (event) => {
//       const { clientX, clientY } = event;
//       gsap.to('.outer-curve', {
//         x: (clientX / window.innerWidth - 0.5) * 20,
//         y: (clientY / window.innerHeight - 0.5) * 20,
//         duration: 0.5,
//       });
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   return (
//     <Container>
//       <h1>Real-Time Ocean Monitoring</h1>
      
//       {/* Circular Display */}
//       <CircularContainer>
//         <OuterCurve className="outer-curve" />
//         <div>
//           <p>🌡 Temp: {latestData.temperature}°C</p>
//           <p>🌊 Sea Level: {latestData.seaLevel} m</p>
//           <p>🌀 Pressure: {latestData.pressure} hPa</p>
//         </div>
//       </CircularContainer>

//       {/* Chart Display */}
//       <ChartContainer>
//         <ResponsiveContainer width="100%" height={400}>
//           <LineChart
//             data={oceanData}
//             margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="timestamp" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line
//               type="monotone"
//               dataKey="temperature"
//               stroke="#ffcc00"
//               name="Temperature (°C)"
//             />
//             <Line
//               type="monotone"
//               dataKey="seaLevel"
//               stroke="#8884d8"
//               name="Sea Level (m)"
//             />
//             <Line
//               type="monotone"
//               dataKey="pressure"
//               stroke="#82ca9d"
//               name="Pressure (hPa)"
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </ChartContainer>
//     </Container>
//   );
// };

// export default App;

import React from "react";
import Dashboard from "./Home.jsx"; // Adjust path if necessary

function App() {
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;

