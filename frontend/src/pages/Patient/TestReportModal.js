import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import './CSS.css';
import PrintableContent from "./PrintableContent";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Document, Page, Text, View, StyleSheet, PDFViewer } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#fff",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

const TestReportModal = ({ testDetails, closeModal,sendViaEmail, printModal }) => {

    const [printMode, setPrintMode] = useState(false);
  const componentRef = React.createRef();
    
  const sampleBloodReport = {
  report: `Patient's Blood Test Report\n\n` +
    `Sample Date & Time: ${testDetails.date}\n` +
    `Patient Name: ${testDetails.PatientName}\n` +
    `Patient Age: ${testDetails.PatientAge}\n` +
    `Test Type: Blood Test\n` +
    `Referred By: Dr.\n` +
    "\nTest Results:\n" +
    `- Hemoglobin: {hemoglobinValue} g/dL\n` +
    `- White Blood Cell Count: {wbcValue} cells/mm³\n` +
    `- Platelet Count: {plateletValue} cells/mm³\n` +
    // Add more test results here
    "\nRecommendations:\n" +
    "Based on the test results, it is recommended to consult a healthcare professional for further evaluation.",
};

const sampleUrinalysisReport = {
  report: `Patient's Urinalysis Report\n\n` +
    `Sample Date & Time: ${testDetails.date}\n` +
    `Patient Name: ${testDetails.PatientName}\n` +
    `Patient Age: ${testDetails.PatientAge}\n` +
    `Test Type: Urinalysis\n` +
    `Referred By: Dr.\n` +
    "\nTest Results:\n" +
    `- Color: {urineColor}\n` +
    `- pH: {urinePH}\n` +
    `- Specific Gravity: {specificGravity}\n` +
    // Add more test results here
    "\nRecommendations:\n" +
    "Based on the test results, it is recommended to consult a healthcare professional for further evaluation.",
};


  // Function to determine which report to display
  const determineReport = () => {
    if (testDetails.code.startsWith("TB")) {
      // Blood Test
      return sampleBloodReport;
    } else if (testDetails.code.startsWith("TU")) {
      // Urinalysis Test
      return sampleUrinalysisReport;
    } else {
      // Default to a generic report
      return { report: "Test Report\n\nNo specific report available for this test." };
    }
  };

  // Define a function to format the price
  const formatPrice = (price) => {
    return `Rs. ${price}`;
  };

  

  const selectedReport = determineReport();

  const handleSendEmail = () => {
    // Compose the mailto link with subject and body
    const emailSubject = encodeURIComponent("Test Report");
    const emailBody = encodeURIComponent(selectedReport.report);

    // Replace 'recipient_email' with the recipient's email address
    const recipientEmail = 'recipient_email@example.com';

    // Create the mailto URL
    const mailtoUrl = `mailto:${recipientEmail}?subject=${emailSubject}&body=${emailBody}`;

    // Open the default email client
    window.location.href = mailtoUrl;
  };

  

  // Function to generate and download the PDF
  const generatePDF = () => {
    const pdfData = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>{selectedReport.report}</Text>
          </View>
        </Page>
      </Document>
    );

    const blob = new Blob([pdfData], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "TestReport.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Modal show={true} onHide={closeModal}>
      <Modal.Header closeButton>
      <Modal.Title className="centered-title">
          <p>Mabola Medicare PVT(LTD)</p>
          <p>Test Report</p>
        </Modal.Title>
        <p>Mabola, SriLanka</p>
        <p>tel: 0112251308</p>
        
      </Modal.Header>
      <Modal.Body>
      {printMode ? (
          <PrintableContent testDetails={testDetails} ref={componentRef} />
        ) : (
        <pre>{selectedReport.report}</pre>
        )}

        {/* Display test details here */}
        <p>Referenace Number: {testDetails.code}</p>
        <p>Sample Type: {(testDetails.type)}</p>
        <p>Price: {formatPrice(testDetails.price)}</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={handleSendEmail}>
          Send
        </button>

        <button className="btn btn-secondary" onClick={generatePDF}>
          Print
        </button>

        <button className="btn btn-secondary" onClick={closeModal}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default TestReportModal;
