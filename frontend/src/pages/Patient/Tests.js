import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import background from "./Images/background.png";
import './CSS.css';
import Header from "./Header";
import Pagination from 'react-bootstrap/Pagination';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Tests() {

  const [activeTab, setActiveTab] = useState("ex1-tabs-1");
  const [testData, setTestData] = useState({
    PatientName: "",
    type: "",
    code: "",
    price: "",
    status: ""
  });

  //function to create a test 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTestData({
      ...testData,
      [name]: value,
    });
  };

  const sendData = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending data:", testData);
      const response = await axios.post("http://localhost:5000/Test/create", testData);
      console.log("Response:", response.data);
      alert("Test Added");

      setTestData({
        PatientName: "",
        type: "",
        code: "",
        price: "",
        status: "",
      });

    } catch (error) {
      console.error(error.response.data);
      alert("Error adding test");
    }
  };


  //function to retrieve data to the table 
  const [tableData, setTableData] = useState([]); // State to hold the table data

  useEffect(() => {
    fetchData(); // Fetch data from MongoDB and update tableData state
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://Localhost:5000/Test");
      console.log("Fetched Data:", response.data);
      setTableData(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };


  // Function to handle deleting a record

  const handleDelete = async (recordId) => {
    try {
      // Send a DELETE request to server delete route
      await axios.delete(`http://localhost:5000/Test/${recordId}`); //server URL and route
      // Update the state to remove the deleted record
      setTableData((prevData) => prevData.filter((record) => record._id !== recordId));
    } catch (error) {
      console.error(error.response.data);
    }
  };


  //search button function of table

  const [searchCode, setSearchCode] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchInputChange = (e) => {
    setSearchCode(e.target.value);
  };

  const searchByCode = () => {
    const filteredResults = tableData.filter(item =>
      item.code.toString().includes(searchCode)
    );
    setSearchResults(filteredResults);
    setCurrentPage(1); // Reset to the first page when performing a new search
  };


  //paging
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  // Calculate the index of the first item on the current page
  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentItems = searchResults.length > 0 ? searchResults : tableData.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages
  const totalPageCount = Math.ceil((searchResults.length > 0 ? searchResults.length : tableData.length) / perPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (

    <div className="add-patients-container">

      <div className="main2-content container my-5">


        <div className="form-container custom2-div">

          <ul className="nav nav-tabs mb-3" id="ex1" role="tablist">
            <li className="nav1-item" role="presentation">
              <a
                className={`nav1-link mr-2  ${activeTab === "ex1-tabs-1" ? "active" : ""}`}
                id="ex1-tab-1"
                data-mdb-toggle="tab"
                href="#ex1-tabs-1"
                role="tab"
                aria-controls="ex1-tabs-1"
                aria-selected={activeTab === "ex1-tabs-1"}
                onClick={() => setActiveTab("ex1-tabs-1")}
              >  New Test </a>
            </li>


            <li className="nav1-item" role="presentation">
              <a
                className={`nav1-link ${activeTab === "ex1-tabs-3" ? "active" : "true"}`}
                id="ex1-tab-3"
                data-mdb-toggle="tab"
                href="#ex1-tabs-3"
                role="tab"
                aria-controls="ex1-tabs-3"
                aria-selected={activeTab === "ex1-tabs-3"}
                onClick={() => setActiveTab("ex1-tabs-3")}
              > Generate Report </a>
            </li>
          </ul>

          <div className="tab-content" id="ex1-content">


            <div
              className={`tab-pane fade ${activeTab === "ex1-tabs-1" ? "show active" : "true"}`}
              id="ex1-tabs-1"
              role="tabpanel"
              aria-labelledby="ex1-tab-1"
            >

              <form onSubmit={sendData}>

                <div className="h6"> <h6><u>Create a New Blood Test</u></h6></div>

                <div className="custom3-div">

                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Patient's Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="PatientName"
                      aria-describedby="nameHelp"
                      onChange={handleInputChange}
                      value={testData.PatientName}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="type" className="form-label">
                      Test Type
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="type"
                      name="type"
                      onChange={handleInputChange}
                      value={testData.type}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="code" className="form-label">
                      Code
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="code"
                      name="code"
                      onChange={handleInputChange}
                      value={testData.code}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      onChange={handleInputChange}
                      value={testData.price}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary float-end">Create</button>

                </div>

              </form>

            </div>


            <div className={`tab-pane fade ${activeTab === "ex1-tabs-3" ? "show active" : "true"}`}
              id="ex1-tabs-3"
              role="tabpanel"
              aria-labelledby="ex1-tab-3"
            >
              <br></br>

              <div className="mb-3">

                <div className="mb-3">
                  <div className="search-bar input">
                    <input
                      type="text"
                      className="form-control search-bar input"
                      id="searchCode"
                      name="searchCode"
                      placeholder="search by code"
                      onChange={handleSearchInputChange}
                      value={searchCode}
                    />
                    <button type="button" className="search-button" onClick={searchByCode}>
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </div>
                </div>
              </div>


              <table className="table align-middle mb-0 bg-white">

                <thead className="bg-light">
                  <tr>
                    <th className="text-center"><p>Date</p></th>
                    <th><p>Test Code</p></th>
                    <th><p>Patient Name</p></th>
                    <th><p>Status</p></th>
                    <th><p style={{ marginLeft: '50px' }}>Actions</p></th>
                  </tr>
                </thead>

                <tbody>

                  {currentItems.map((item, index) => (
                    <tr key={item._id}>

                      <td>
                        <div className="d-flex align-items-center">

                          <div className="ms-3">
                            <p className="text-normal mb-0">{new Date(item.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </td>

                      <td>
                        <p className="fw-normal mb-1">{item.code}</p>
                      </td>

                      <td>{item.PatientName}</td>

                      <td>
                        <span className="badge badge-success rounded-pill d-inline">{item.status}</span>
                      </td>



                      <td>
                        <button
                          type="button"
                          className="btn btn-link btn-rounded btn-sm fw-bold"
                          data-mdb-ripple-color="dark"
                          style={{ marginLeft: '10px' }}
                        >
                          Generate
                        </button>

                        <button
                          type="button"
                          class="btn btn-link btn-sm btn-rounded"
                          onClick={() => handleDelete(item._id)}
                        >
                          <b>Delete</b>

                        </button>

                      </td>
                    </tr>

                  ))}


                </tbody>

              </table>

              <br></br>

              <div className="d-flex justify-content-end">

                <Pagination>
                  <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {Array.from({ length: Math.ceil(tableData.length / perPage) }, (_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === Math.ceil(tableData.length / perPage)}
                  />
                </Pagination>
              </div>

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

export default Tests;