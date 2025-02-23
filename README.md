# **Underwater Monitoring System**

## **Overview**  
This project involves an underwater monitoring system that collects **temperature** and **pressure** data from sensors connected to an **Arduino** placed underwater, while another **Arduino on the surface** receives this data wirelessly. The system also fetches **salinity, sea level, and depth** data from an external API. The data is processed using **Verilog** to determine risk levels for human safety. The frontend is built using **MERN Stack**, displaying real-time sensor readings and risk assessments.

## **Tech Stack**  
- **Hardware:** Two Arduino boards (One underwater, One on the surface), Sensors (Temperature & Pressure)  
- **Backend:** Node.js, Express, MongoDB  
- **Frontend:** React.js  
- **Verilog:** Used for risk assessment  
- **Serial Communication:** Used for Arduino to Arduino and PC data transfer  

## **System Architecture**  
1. **Underwater Arduino:** Collects **temperature** and **pressure** data and transmits it wirelessly to the surface Arduino.  
2. **Surface Arduino:** Receives data and forwards it to the backend.  
3. **Backend (Node.js & Express):**  
   - Reads sensor data and stores it in **MongoDB**.  
   - Fetches **salinity, sea level, and depth** from an API.  
   - Runs **Verilog code** for risk assessment.  
4. **Verilog Module:** Reads the sensor data and classifies risk as **"Safe"** or **"Risky"**.  
5. **Frontend (React.js):** Displays real-time data, risk status, and past records.  


## **License**
This project is open-source under the MIT License.
