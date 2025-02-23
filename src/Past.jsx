import React from "react";
import Modal from "react-modal";
import "./past.css";

Modal.setAppElement("#root"); // Required for accessibility

const Past = ({ isOpen, onClose, pastData }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Past Sensor Readings</h2>
      <table>
        <thead>
          <tr>
            <th>Temperature (°C)</th>
            <th>Pressure (hPa)</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {pastData.map((data, index) => (
            <tr key={index}>
              <td>{data.temperature}</td>
              <td>{data.pressure}</td>
              <td>{new Date(data.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="close-modal-btn" onClick={onClose}>
        Close
      </button>
    </Modal>
  );
};

export default Past;
