import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function UpdatedPrescription() {
  const { id } = useParams();
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientAddress, setPatientAddress] = useState(""); 
  const [patientEmail, setPatientEmail] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [prescription, setPrescription] = useState("");
  const containerStyle = {
    backgroundImage: "url('./images/clinic-slider-compressor.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundAttachment: "fixed",
    marginTop: "40px"
  };
  useEffect(() => {
    async function fetchPrescription() {
      try {
        const response = await axios.get(
          `http://localhost:5000/prescription/get/${id}`
        );
        setPatientName(response.data.prescription.patientName);
        setPatientPhone(response.data.prescription.patientPhone);
        setPatientAddress(response.data.prescription.patientAddress);
        setPatientEmail(response.data.prescription.patientEmail);
        setDoctorName(response.data.prescription.doctorName);
        setIssueDate(response.data.prescription.issueDate);
        setPrescription(response.data.prescription.prescription);

      } catch (err) {
        console.log(err);
      }
    }
    fetchPrescription();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPrescription = { 
        patientName,
        patientPhone,
        patientAddress,
        patientEmail,
        doctorName,
        issueDate,
        prescription: prescription,
    };

    console.log(prescription);

    try {
      await axios.put(
        `http://localhost:8070/prescription/update/${id}`,updatedPrescription);

      alert("Prescription updated successfully!");
      window.location = "/all-prescription";
    } catch (err) {
      console.log(err);
    }
  };

  if (!id) {
    return <div>No prescription found.</div>;
  }

  return (
    <div  className="container" style={containerStyle}>

        <h1 style={{ textAlign: "center" }}>Update Prescription</h1>

            <form onSubmit={handleSubmit} className="update prescription" style={{ marginTop: "50px"}}>
            <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="patientName">Patient Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="pname" 
                                placeholder="Enter Patient Name"
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                            />
                        </div>
                        <div className="form-group col-md-6">
                        <label htmlFor="patientPhone">Patient Phone Number</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="patientPhone" 
                                placeholder="Enter Phone Number"
                                value={patientPhone}
                                onChange={(e) => setPatientPhone(e.target.value)}
                            />
                        </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                            <label htmlFor="patientAddress">Patient Address</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    id="patientAddress" 
                                    placeholder="Enter Patient Address"
                                    value={patientAddress}
                                    onChange={(e) => setPatientAddress(e.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-6">
                            <label htmlFor="patientEmail">Patient Email</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    id="patientEmail" 
                                    placeholder="Enter Email Address"
                                    value={patientEmail}
                                    onChange={(e) => setPatientEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-row" style={{ marginTop: "20px"}}>
                            <div className="form-group col-md-6">
                                <label htmlFor="doctorName">Doctor Name</label>
                                <input 
                                    type="text"
                                    className="form-control" 
                                    id="doctorName" 
                                    placeholder="Enter Doctor Name"
                                    value={doctorName}
                                    onChange={(e) => setDoctorName(e.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="issueDate">Issue Date</label>
                                <input 
                                    type="date" 
                                    className="form-control"
                                    id="issueDate" 
                                    placeholder="Enter Issue Date"
                                    value={issueDate}
                                    onChange={(e) => setIssueDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label htmlFor="prescription">Prescription</label>
                                <textarea 
                                    className="form-control"
                                    id="Prescription"
                                    placeholder="Enter Prescription"
                                    value={prescription}
                                    onChange={(e) => setPrescription(e.target.value)}
                                />
                            </div>
                        </div>
                        
                        <button type="submit" className="btn btn-danger ml-3" style={{ marginTop: "10px", marginLeft: "10px"}}>
                        Update
                        </button>
            </form>
    </div>
  );
}
