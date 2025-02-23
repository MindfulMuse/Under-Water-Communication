const express = require("express");
const fs = require("fs");
const { exec } = require("child_process");
const cors = require("cors");
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const mongoose = require("mongoose");

const app = express();
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/sensorDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Sensor Data Schema
const SensorData = mongoose.model("SensorData", new mongoose.Schema({
  temperature: Number,
  pressure: Number,
  timestamp: { type: Date, default: Date.now }
}));

// Serial Communication Setup
const port = new SerialPort("COM3", { baudRate: 9600 }); // Change COM3 if needed
const parser = port.pipe(new Readline({ delimiter: "\n" }));

parser.on("data", async (data) => {
    console.log("Received:", data);
    fs.writeFileSync("sensor_data.txt", data.trim()); // Save for Verilog

    // Parse Data & Save to MongoDB
    const [temperature, pressure] = data.trim().split(",").map(Number);
    if (!isNaN(temperature) && !isNaN(pressure)) {
        await new SensorData({ temperature, pressure }).save();
    }
});

// API to Fetch Latest Sensor Data
app.get("/latest-sensor-data", async (req, res) => {
    try {
        const latestData = await SensorData.findOne().sort({ timestamp: -1 });
        res.json(latestData || { message: "No data available" });
    } catch (error) {
        console.error("Error fetching latest data:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// API to Simulate Sea Level, Depth, and Salinity Data
app.get("/api-data", async (req, res) => {
  try {
    const seaLevel = (Math.random() * 10 + 50).toFixed(2);
    const depth = (Math.random() * 500).toFixed(2);
    const salinity = (Math.random() * 5 + 30).toFixed(2);

    res.json({ seaLevel, depth, salinity });
  } catch (error) {
    console.error("Error fetching API data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// API to Run Verilog and Get Results
app.get("/run-verilog", (req, res) => {
    exec("iverilog -o output testbench.v monitor_conditions.v && vvp output", (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: "Verilog execution failed", details: stderr });
        }

        fs.readFile("output.txt", "utf8", (err, data) => {
            if (err) {
                return res.status(500).json({ error: "Failed to read Verilog output" });
            }
            res.json({ alert: data.trim() });
        });
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));
