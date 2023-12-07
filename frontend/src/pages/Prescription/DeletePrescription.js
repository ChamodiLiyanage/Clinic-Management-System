import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function DeletePrescription() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
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
    };

    const formStyle = {
        marginTop: "20px",
    };

    const inputStyle = {
        marginTop: "10px",
    };

    const labelStyle = {
        marginTop: "10px",
    };

    const buttonStyle = {
        marginTop: "10px",
        marginLeft: "10px",
    };
    const handleDelete = async (event) => {
        const confirmed = window.confirm("Are you sure you want to delete this report?");
        if (confirmed) {
            setLoading(true);
            try {
                await axios.delete(`http://localhost:5000/prescription/delete/${id}`);
                setLoading(false);
                window.location = "/all-prescription";
            } catch (err) {
                setError(err.response.data.error);
            }
        } else {
            event.preventDefault();
            window.location = "/all-prescription";
        }
    };

    useEffect(() => {
        const showPrescription = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/prescription/get/${id}`);
                if (response.status === 200) {
                    setPatientName(response.data.prescription.patientName);
                    setPatientPhone(response.data.prescription.patientPhone);
                    setPatientAddress(response.data.prescription.patientAddress);
                    setPatientEmail(response.data.prescription.patientEmail);
                    setDoctorName(response.data.prescription.doctorName);
                    setIssueDate(response.data.prescription.issueDate);
                    setPrescription(response.data.prescription.prescription);
                }
            } catch (err) {
                console.log(err);
            }
        };
        showPrescription();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container" style={containerStyle}>
            <h1 style={{ textAlign: "center" }}>Delete Prescription</h1>
            <form onSubmit={handleDelete} className="delete-prescription-page" style={formStyle}>
                {/* Patient Details */}
                <div className="form-row">
                    Patient Details
                </div>
                <div className="form-row" style={inputStyle}>
                    <div className="form-group col-md-6">
                        <label htmlFor="patientName">Patient Name</label>
                        <input 
                            type="text"
                            className="form-control" 
                            id="patientName" 
                            placeholder="Enter Patient Name"
                            value={patientName}
                            readOnly
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
                            readOnly
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
                            readOnly
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
                            readOnly
                        />
                    </div>
                </div>

                {/* Doctor Details */}
                <div className="form-row" style={inputStyle}>
                    Doctor Details
                </div>
                <div className="form-row" style={inputStyle}>
                    <div className="form-group col-md-6">
                        <label htmlFor="doctorName">Doctor Name</label>
                        <input 
                            type="text"
                            className="form-control"  
                            id="doctorName" 
                            placeholder="Enter Doctor Name"
                            value={doctorName}
                            readOnly
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
                            readOnly
                        />
                    </div>
                </div>

                <div className="form-row" style={inputStyle}>
                    <div className="form-group col-md-12">
                        <label htmlFor="prescription">Prescription</label>
                        <textarea 
                            className="form-control" 
                            id="Prescription"
                            placeholder="Enter Prescription"
                            value={prescription}
                            readOnly
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary ml-3" style={buttonStyle}>
                    Delete
                </button>
            </form>
        </div>
    );
}
