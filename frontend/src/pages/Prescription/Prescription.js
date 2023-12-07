import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AddPrescription() {
    const [faFileDownload] = useState([]);
    const [patientName, setPatientName] = useState("");
    const [patientPhone, setPatientPhone] = useState("");
    const [patientAddress, setPatientAddress] = useState(""); 
    const [patientEmail, setPatientEmail] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [issueDate, setIssueDate] = useState("");
    const [prescription, setPrescription] = useState("");
    const [labreport, setLabReport] = useState ([]);
    const [column, setColumns] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};
    
        if (!patientName.trim()) {
          errors.patientName = "Patient name is required";
        }
    
        if (!patientPhone.trim()) {
          errors.patientPhone = "Phone number is required";
        } else if (!isValidpatientPhone(patientPhone)) {
          errors.patientPhone = "Invalid Phone number";
        }
        
        if (!patientAddress.trim()) {
            errors.patientAddress = "Patient address is required";
        }

        if (!patientEmail.trim()) {
        errors.patientEmail = "Email is required";
        } else if (!isValidpatientEmail(patientEmail)) {
        errors.patientEmail = "Invalid Email Address";
        }
    
        if (!doctorName.trim()) {
          errors.doctorName = "Doctor name is required";
        }

        if (!isValidDate(issueDate)) {
            errors.issueDate = "Invalid Issue date";
        }        

        if (!prescription.trim()) {
           errors.prescription = "Prescription is required";
        }
    
        setErrors(errors);
    
        return Object.keys(errors).length === 0;
      };
    
    const isValidpatientEmail = (patientEmail) => {
    const patientEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patientEmailPattern.test(patientEmail);
    };
    
    const isValidpatientPhone = (patientPhone) => {
    const patientPhonePattern = /^\d{10}$/;
    if(patientPhone.length<10 || patientPhone.length>10){
        return patientPhonePattern.test(patientPhone);}
    return patientPhonePattern.test(patientPhone);    
    };

    const isValidDate = (dateString) => {
        return !isNaN(Date.parse(dateString));
      };

      const containerStyle = {
        backgroundImage: "url('./images/clinic-slider-compressor.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
        marginTop: "30px" , 
        height: "800px"
      };
    function sendData(e) {
        e.preventDefault();
       
        //alert("Submit");
      
        const isValid = validateForm();
      
        if (!isValid) {
          return;
        }
      
        const newPrescription = {
          patientName,
          patientPhone,
          patientAddress,
          patientEmail,
          doctorName,
          issueDate,
          prescription,
        };

        console.log(newPrescription);
      
        axios
          .post("http://localhost:5000/prescription/add", newPrescription)
          .then(() => {
            alert("Prescription Added");
            window.location.reload(false);
          })
          .catch((err) => {
            alert(err.message);
          });
    }


    return(
        <>
        <div className="col-12" style={containerStyle}>
            
            <h1 style={{ textAlign: "center" }}>Add Prescription</h1>
            
            
                <div id="addPrescription" className="container" style={{ marginTop: "40px"}}>
                    <form onSubmit={sendData} className="add-prescription-page">
                        <div className="form-row">
                            Patient Details
                        </div>
                        <div className="form-row" style={{ marginTop: "20px"}}>
                            <div className="form-group col-md-6">
                                <label htmlFor="patientName">Patient Name</label>
                                <input 
                                    type="text"
                                    className={`form-control ${errors.patientName ? "is-invalid" : ""}`} 
                                    id="patientName" 
                                    placeholder="Enter Patient Name"
                                    value={patientName}
                                    onChange={(e) => setPatientName(e.target.value)}
                                />
                                {errors.patientName && <div className="invalid-feedback">{errors.patientName}</div>}
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="patientPhone" >Patient Phone Number</label>
                                <input 
                                    type="text"
                                    className={`form-control ${errors.patientPhone ? "is-invalid" : ""}`}
                                    id="patientPhone" 
                                    placeholder="Enter Phone Number"
                                    value={patientPhone}
                                    onChange={(e) => setPatientPhone(e.target.value)}
                                />
                                {errors.patientPhone && <div className="invalid-feedback">{errors.patientPhone}</div>}
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="patientAddress" >Patient Address</label>
                                <input 
                                    type="text" 
                                    className={`form-control ${errors.patientAddress ? "is-invalid" : ""}`} 
                                    id="patientAddress" 
                                    placeholder="Enter Patient Address"
                                    value={patientAddress}
                                    onChange={(e) => setPatientAddress(e.target.value)}
                                />
                                {errors.patientAddress && <div className="invalid-feedback">{errors.patientAddress}</div>}
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="patientEmail">Patient Email</label>
                                <input 
                                    type="text" 
                                    className={`form-control ${errors.patientEmail ? "is-invalid" : ""}`} 
                                    id="patientEmail" 
                                    placeholder="Enter Email Address"
                                    value={patientEmail}
                                    onChange={(e) => setPatientEmail(e.target.value)}
                                />
                                {errors.patientEmail && <div className="invalid-feedback">{errors.patientEmail}</div>}
                            </div>
                        </div>
                        <div className="form-row" style={{ marginTop: "20px"}}>
                            Doctore Details
                        </div>
                        <div className="form-row" style={{ marginTop: "20px"}}>
                            <div className="form-group col-md-6">
                                <label htmlFor="doctorName">Doctor Name</label>
                                <input 
                                    type="text"
                                    className={`form-control ${errors.doctorName ? "is-invalid" : ""}`} 
                                    id="doctorName" 
                                    placeholder="Enter Doctor Name"
                                    value={doctorName}
                                    onChange={(e) => setDoctorName(e.target.value)}
                                />
                                {errors.doctorName && <div className="invalid-feedback">{errors.doctorName}</div>}
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="issueDate">Issue Date</label>
                                <input 
                                    type="date" 
                                    className={`form-control ${errors.issueDate ? "is-invalid" : ""}`} 
                                    id="issueDate" 
                                    placeholder="Enter Issue Date"
                                    //defaultValue={new Date().toISOString().split('T')[0]}
                                    value={issueDate}
                                    onChange={(e) => setIssueDate(e.target.value)}
                                />
                                {errors.issueDate && <div className="invalid-feedback">{errors.issueDate}</div>}
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label htmlFor="prescription">Prescription</label>
                                <textarea 
                                    className={`form-control ${errors.prescription ? "is-invalid" : ""}`} 
                                    id="Prescription"
                                    placeholder="Enter Prescription"
                                    value={prescription}
                                    onChange={(e) => setPrescription(e.target.value)}
                                />
                                {errors.prescription && <div className="invalid-feedback">{errors.prescription}</div>}
                            </div>
                        </div>
                        
                        <button type="submit" className="btn btn-primary ml-3" style={{ marginTop: "10px", marginLeft: "10px"}}>
                        Save
                        </button>
                    </form>
                </div>
        </div>
        </>
    );
}