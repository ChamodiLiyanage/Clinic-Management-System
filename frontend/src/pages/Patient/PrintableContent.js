import React from "react";
import './CSS.css';

const PrintableContent = ({ testDetails }) => {
  return (
    <div className="printable-content">
      <p>Mabola Medicate PVT(LTD)</p>
      <p>Test Report</p>

      <pre>
        {/* Display test details here */}
        Test ID: {testDetails.code}
        Test Date & Time: {testDetails.date}
        Patient Name: {testDetails.PatientName}
        Patient Age: {testDetails.PatientAge}
        Test Type: {testDetails.type}
        Test Price: Rs. {testDetails.price}
        {/* Include any other details you want to print */}
      </pre>
    </div>
  );
};

export default PrintableContent;
