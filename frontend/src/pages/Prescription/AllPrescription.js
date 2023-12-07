import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faFileDownload } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function AllPrescription() {
  const [column, setColumns] = useState([]);
  const [prescription, setPrescription] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    function getPrescription() {
      axios
        .get("http://localhost:5000/prescription/")
        .then((res) => {
          setColumns(Object.keys(res.data[0]));
          setPrescription(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getPrescription();
  }, []);

  const filteredPrescription = prescription.filter((prescription) =>
    prescription.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  function generateReport() {
    const doc = new jsPDF();

    const columnStyles = {
      0: { columnWidth: 20 },
      1: { columnWidth: 20 },
      2: { columnWidth: 20 },
      3: { columnWidth: 20 },
      4: { columnWidth: 20 },
      5: { columnWidth: 20 },
      6: { columnWidth: 20 },
      7: { columnWidth: 20 },
    };

    doc.autoTable({
      head: [column],
      body: filteredPrescription.map((prescription) =>
        Object.values(prescription)
      ),
      columnStyles: columnStyles,
    });
    doc.save("prescription_report.pdf");
  }

  const containerStyle = {
    backgroundImage: "url('./images/clinic-slider-compressor.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundAttachment: "fixed",
  };

  const appContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "30px",
    marginLeft: "50px",
    marginRight: "50px",
    marginBottom: "30px",
  };

  const generateButtonStyle = {
    backgroundColor: "rgb(5, 128, 229)",
    borderRadius: "10px",
    marginTop: "10px",
    height: "50px",
    width: "150px",
  };

  return (
    <div className="container container-app-lr" style={containerStyle}>
      <div className="col-12" style={{ height: "800px" }}>
        <h1 style={{ textAlign: "center" }}>All Prescription Details</h1>
        <a href="/prescription" className="btn btn-secondary btn-lg" disabled role="button" aria-pressed="true" style={{ marginTop: "20px", marginLeft: "1100px" }}>
          +Add Prescription
        </a>
        <div className="col-3 ml-5 pl-5">
          <form action="">
            <div className="p-1 bg-light d-flex rounded rounded-pill shadow-sm mb-4">
              <div className="input-group">
                <input
                  type="search"
                  placeholder="Search Patient Name"
                  aria-describedby="button-addon1"
                  className="form-control border-0 bg-light"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <div className="input-group-append">
                  <button
                    id="button-addon1"
                    type="submit"
                    className="btn btn-link text-primary"
                  >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div id="viewPrescription" className="col-12">
          <table className="table table-primary table-striped table-hover" style={{ margin: "65px", width: "1100px", marginLeft: "200px" }}>
            <thead>
              <tr>
                <th scope="col-2">Patient Name</th>
                <th scope="col-2">Patient Phone</th>
                <th scope="col-2">Patient Address</th>
                <th scope="col-3">Patient Email</th>
                <th scope="col-2">Doctor Name</th>
                <th scope="col-2">Issue Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrescription.map((prescription, index) => (
                <tr key={index}>
                  <td>{prescription.patientName}</td>
                  <td>{prescription.patientPhone}</td>
                  <td>{prescription.patientAddress}</td>
                  <td>{prescription.patientEmail}</td>
                  <td>{prescription.doctorName}</td>
                  <td>{prescription.issueDate}</td>
                  <td>
                    <Link
                      to={`/update-prescription/${prescription._id}`}
                      className="btn btn-danger"
                    >
                      Update
                    </Link>
                    <Link
                      to={`/delete-prescription/${prescription._id}`}
                      className="btn btn-danger ms-3"
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="app-generate btn btn-primary pb-1" onClick={generateReport} style={generateButtonStyle}>
            Download Report
            <FontAwesomeIcon icon={faFileDownload} className="app-report-icon mb-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
