import React, { useState, useEffect } from "react";
import "./Home.css";
import PastDataModal from "./Past"; // Import the modal component

const Home = () => {
  const [data, setData] = useState({
    temperature: 0,
    pressure: 0,
    seaLevel: 0,
    depth: 0,
    salinity: 0,
    riskStatus: "Safe",
  });

  const [pastData, setPastData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Fetch past data when the button is clicked
  const fetchPastData = async () => {
    try {
      const response = await fetch("http://localhost:5000/past-data");
      const result = await response.json();
      setPastData(result);
      setModalIsOpen(true); // Open modal when data is fetched
    } catch (error) {
      console.error("Error fetching past data:", error);
    }}
  
  const [alert, setAlert] = useState("");
  const [isArduinoConnected, setIsArduinoConnected] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/run-verilog");
        if (!response.ok) throw new Error("Backend not responding");

        const result = await response.json();
        setIsArduinoConnected(true);

        setAlert(result.alert);
        setData((prevData) => ({
          ...prevData,
          temperature: parseFloat(result.alert.split(",")[0]) || 0,
          pressure: parseFloat(result.alert.split(",")[1]) || 0,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsArduinoConnected(false);
      }
    };

    const fetchAPIData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api-data");
        if (!response.ok) throw new Error("Backend not responding");

        const result = await response.json();
        setIsArduinoConnected(true);

        setData((prevData) => ({
          ...prevData,
          seaLevel: result.seaLevel || 0,
          depth: result.depth || 0,
          salinity: result.salinity || 0,
        }));
      } catch (error) {
        console.error("Error fetching API data:", error);
        setIsArduinoConnected(false);
      }

      
    };

    const interval = setInterval(() => {
      fetchData();
      fetchAPIData();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <h1>Underwater Data Monitoring</h1>
      {!isArduinoConnected && <p style={{ color: "red", fontWeight: "bold" }}>⚠️ Arduino Not Connected</p>}
      <div className="dash-background">
        <div className="dash-section">
          <div className="dash-left-section">
            <div className="Temperature">
              <p><strong>Temperature:</strong> {data.temperature !== null ? `${data.temperature}°C` : "N/A"}</p>
            </div>
            <div className="Pressure">
              <p><strong>Pressure:</strong> {data.pressure !== null ? `${data.pressure} hPa` : "N/A"}</p>
            </div>
            <div className="SeaLevel">
              <p><strong>Sea Level:</strong> {data.seaLevel !== null ? `${data.seaLevel} m` : "N/A"}</p>
            </div>
          </div>

          <div className="dash-right-section">
            <div className="Depth">
              <p><strong>Depth:</strong> {data.depth !== null ? `${data.depth} m` : "N/A"}</p>
            </div>
            <div className="Salinity">
              <p><strong>Salinity:</strong> {data.salinity !== null ? `${data.salinity} PSU` : "N/A"}</p>
            </div>
          </div>
        </div>
      </div>

      <p style={{ color: alert === "Risky" ? "red" : "green", fontWeight: "bold" }}>
        Status: {alert || "Safe"}
      </p>


  );
};

export default Home;

