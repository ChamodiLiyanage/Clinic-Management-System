import { differenceInHours } from 'date-fns';
import React, {useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import background from "./Images/background.png";
import './CSS.css';
import Header from "./Header";
import Pagination from 'react-bootstrap/Pagination';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch } from "@fortawesome/free-solid-svg-icons";
import TestReportModal from "./TestReportModal";


const generateTestCode = () => {
  const randomNumbers = Math.floor(100 + Math.random() * 900); // Generates random 3-digit numbers
  return `TU${randomNumbers}`;
};

function Urinalysis(){

    const [showModal, setShowModal] = useState(false);
    const [selectedTestDetails, setSelectedTestDetails] = useState({});

    const openModal = (testDetails) => {
        setSelectedTestDetails(testDetails);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedTestDetails({});
    };

  const [activeTab, setActiveTab] = useState("ex1-tabs-1");
  const [testData, setTestData] = useState({
    PatientName: "",
    type: "",
    code: generateTestCode(),
    price: "",
  });

  //function to create a test 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "type") {
      const price = testTypePrices[value] || ""; // Lookup the price based on the selected test type
      setTestData({
        ...testData,
        [name]: value,
        price: price,
      });
    } else {
      setTestData({
        ...testData,
        [name]: value,
      });
    }
  };
  

  const sendData = async (e) => {
    e.preventDefault();
  
    try {
    
      console.log("Sending data:", testData); 
      const response = await axios.post("http://localhost:8070/Urinalysis/create-urine", testData);
      console.log("Response:", response.data); 
      alert("Test Added");

      setTestData({
        PatientName: "",
        type: "",
        code: "",
        price: "",
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
      const response = await axios.get("http://Localhost:8070/Urinalysis");
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
          await axios.delete(`http://localhost:8070/Urinalysis/${recordId}`); //server URL and route
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

    const searchByCode = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/Test/search?code=${searchCode}`);
        setSearchResults(response.data);
        
      } catch (error) {
        console.error(error.response.data);
      }
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

    const generateNewCode = () => {
      const code = generateTestCode();
      setTestData({
        ...testData,
        code: code,
      });
    };
  
    // useEffect for setting the initial code when component mounts
    useEffect(() => {
      generateNewCode(); // Call the generateNewCode function
    }, []);

    const testTypePrices = {
        "Color and Appearance": 1000, // Replace with actual prices
        "pH Level": 750,
        "Ketones": 600,
        "Protien": 600,
        "Glucoes": 750,
        "Specific Gravity": 1400,
      };
      
    
    return(

      <div className="add-patients-container">
      <Header/>

      <div className="main2-content">
        
        
        <div className="form-container custom2-div">
          
        <ul className="nav nav-tabs mb-3" id="ex1" role="tablist">
            <li className="nav1-item" role="presentation">
            <a
                className={`nav1-link  ${activeTab === "ex1-tabs-1" ? "active" : ""}`}
                id="ex1-tab-1"
                data-mdb-toggle="tab"
                href="#ex1-tabs-1"
                role="tab"
                aria-controls="ex1-tabs-1"
                aria-selected={activeTab === "ex1-tabs-1"}
                onClick={() => setActiveTab("ex1-tabs-1")}
                > New Test </a>
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

             <div className="h6"> <h6><u> New Urinalysis </u></h6></div>

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
              Sample Profile
              </label>
              <select
                type="text"
                className="form-select"
                id="type"
                name="type"
                onChange={handleInputChange}
                value={testData.type}
                required
              >
                  <option value="" disabled>Select Sample Type</option>
                  {Object.keys(testTypePrices).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                    ))}
              </select>

            </div>

            <div className="mb-3">
              <label htmlFor="code" className="form-label">
                Code
              </label>
              <input
                type="text"
                className="form-control"
                id="code"
                name="code"
                onChange={handleInputChange}
                value={testData.code}
                required
                readOnly
              />
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                price(Rs.)
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                onChange={handleInputChange}
                value={testData.price}
                required
                readOnly
              />
            </div>

            <button type="submit" className="btn btn-primary float-end">Create</button>

            </div>
            
            </form>

            </div>
            

            <div  className={`tab-pane fade ${activeTab === "ex1-tabs-3" ? "show active" : "true"}`}
              id="ex1-tabs-3"
              role="tabpanel"
              aria-labelledby="ex1-tab-3"
            >
              <br></br>

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
                
              
            <table className="table align-middle mb-0 bg-white">
                  
              <thead className="bg-light">
                    <tr>
                      <th className="text-center"><p>Date & Time</p></th>
                      <th><p>Referenace Number</p></th>
                      <th><p>Patient Name</p></th>
                      <th><p>Status</p></th>
                      <th><p style={{ marginLeft: '50px' }}>Actions</p></th>
                    </tr>
                  </thead>

                <tbody>

                  { currentItems.map((item, index) =>  (
                    <tr key={item._id}>
                      
                      <td>
                        <div className="d-flex align-items-center">
                          
                          <div className="ms-3">
                            <p className="text-normal mb-0">{new Date(item.date).toLocaleString()}</p>
                          </div>
                        </div>
                      </td>

                      <td>
                        <p className="fw-normal mb-1">{item.code}</p> 
                      </td>

                      <td>{item.PatientName}</td>

                      <td>
                        <span
                          className={`badge badge-${
                            differenceInHours(new Date(), new Date(item.date)) > 8
                              ? 'success'
                              : 'danger'
                          } rounded-pill d-inline`}
                        >
                          {differenceInHours(new Date(), new Date(item.date)) > 8
                            ? 'Completed'
                            : 'Incomplete'}
                        </span>
                      </td>

                      

                      <td>
                          <button
                                type="button"
                                className="btn btn-link btn-rounded btn-sm fw-bold"
                                data-mdb-ripple-color="dark"
                                style={{ marginLeft: '10px' }}
                                onClick={() => {
                                    openModal(item)}}
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

            {showModal && (
            <TestReportModal
              testDetails={selectedTestDetails}
              closeModal={closeModal}
            />
          )}
            
        </div>
    );

}

export default Urinalysis;