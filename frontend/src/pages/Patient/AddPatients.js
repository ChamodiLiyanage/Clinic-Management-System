import React, { useState } from "react";
import axios from "axios";
import background from "./Images/background.png";
import Header from "./Header";
import SideBar from "./SideBar";

function AddPatients() {
  const [patientData, setPatientData] = useState({
    PatientName: "",
    Patientage: "",
    PatientphoneNumber: "",
    Patientgender: "",
    Patientemail: "",
  });

  // Function to add a patient
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData({
      ...patientData,
      [name]: value,
    });
  };

  const sendData = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending data:", patientData);
      const response = await axios.post(
        "http://localhost:5000/patient/register",
        patientData
      ); // Server URL and route
      console.log("Response:", response.data);
      alert("Patient Added");

      setPatientData({
        PatientName: "",
        Patientage: "",
        PatientphoneNumber: "",
        Patientgender: "",
        Patientemail: "",
      });
    } catch (error) {
      console.error(error.response.data);
      alert("Error adding patient");
    }
  };

  const divStyle = {
    width: "900px",
    height: "570px",
    border: "0px solid #333",
    backgroundColor: "#D9D9D9",
    padding: "20px 30px",
    borderRadius: "20px",
    flex: "1",
    marginLeft: "130px",
  };

  const inputStyle = {
    border: "none",
    borderRadius: "10px",
    marginRight: "10px",
    width: "150px",
    float: "right",
  };

  const buttonStyle = {
    backgroundColor: "#ffffff",
    color: "#000000",
    transition: "none", /* Remove hover effect */
    boxShadow: "none",
    cursor: "pointer",
    border: "none",
    background: "none",
  };

  const selectStyle = {
    // your styles here
  };

  return (
    <div className="add-patients-container">
      <Header />
      <div className="row">
        <div className="col-3">
          <SideBar />
        </div>
        <div className="col-9">
          <div className="main-content">
            <div className="form-container">

              <form onSubmit={sendData}>
                <div style={divStyle}>
                  <div>
                    <h5>
                      <u>Add New Patient For Blood Test</u>
                    </h5>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="PatientName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="PatientName"
                      name="PatientName"
                      onChange={handleInputChange}
                      value={patientData.PatientName}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="Patientage" className="form-label">
                      Age
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="Patientage"
                      name="Patientage"
                      onChange={handleInputChange}
                      value={patientData.Patientage}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="PatientphoneNumber" className="form-label">
                      Contact Number
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="PatientphoneNumber"
                      name="PatientphoneNumber"
                      onChange={handleInputChange}
                      value={patientData.PatientphoneNumber}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="Patientemail" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="Patientemail"
                      name="Patientemail"
                      onChange={handleInputChange}
                      value={patientData.Patientemail}
                      required
                    />
                  </div>

                  <br />

                  <div className="mb-3">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      id="Patientgender"
                      name="Patientgender"
                      onChange={handleInputChange}
                      value={patientData.Patientgender}
                      required
                      style={selectStyle}
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      Check me out
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary" style={buttonStyle}>
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="background-image">
        <img src={background} alt="Background Image" />
      </div>
    </div>
  );
}

export default AddPatients;
