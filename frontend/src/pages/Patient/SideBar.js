import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlusCircle, faUser, faFlag ,faCog, faSignOutAlt  } from '@fortawesome/free-solid-svg-icons';
import './CSS.css';

function SideBar() {
  const [activeNavItem, setActiveNavItem] = useState("home");

  const handleNavItemSelect = (selectedKey) => {
    setActiveNavItem(selectedKey);
    // You can add logic here to handle the selected menu item
  };

  return (
    <Nav className="col-md-3 col-lg-2 d-md-block sidebar">

      <div className="position-sticky">

        <ul className="nav flex-column">
          <br></br><h3>MEDICARE</h3>

        <br></br> <br></br> <br></br> <br></br>
          <Nav.Item className="nav-link">
            <Nav.Link
              eventKey="home"
              active={activeNavItem === "home"}
              onSelect={handleNavItemSelect}
              
              style={{ color: "white" }}
            >
              <FontAwesomeIcon icon={faHome} style={{ marginRight: "10px" }}/>
              <Link to="" style={{ textDecoration: "none" }} >
                <span style={{color: "#ffffff", marginLeft: "10px" }} >Dashboard</span>
              </Link>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item className="nav-link">
            <Nav.Link
              eventKey="home"
              active={activeNavItem === "home"}
              onSelect={handleNavItemSelect}
              
              style={{ color: "white" }}
              
            >
              <FontAwesomeIcon icon={faPlusCircle} style={{ marginRight: "10px" }}/>
              <Link to="/add" style={{ textDecoration: "none"}}>
                <span style={{color: "#ffffff", marginLeft: "10px" }} className="active">Test Blood</span>
              </Link>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item className="nav-link">
            <Nav.Link
              eventKey="profile"
              active={activeNavItem === "profile"}
              onSelect={handleNavItemSelect}
              
              style={{ color: "white" }}
            >
              <FontAwesomeIcon icon={faUser} style={{ marginRight: "10px" }} />
             <Link to="/register" style={{ textDecoration: "none" }}>
              <span style={{color: "#ffffff", marginLeft: "10px" }}>Add New Patient</span>
              </Link>
            </Nav.Link>
          </Nav.Item>
          
          <Nav.Item className="nav-link">
            <Nav.Link
              eventKey="report"
              active={activeNavItem === "report"}
              onSelect={handleNavItemSelect}
              
              style={{ color: "white" }}
            >
              <FontAwesomeIcon icon={faFlag} style={{ marginRight: "10px" }}/>
              <Link to="/create" style={{ textDecoration: "none" }}>
                <span style={{color: "#ffffff", marginLeft: "10px" }} className="active">Report</span>
              </Link>
            </Nav.Link>
          </Nav.Item>

        <div className="nav-link mt-auto ">
        <br></br> <br></br><br></br> <br></br><br></br> <br></br>
        <Nav.Item className="nav-link mt-auto">
            <Nav.Link
              eventKey="settings"
              active={activeNavItem === "settings"}
              onSelect={handleNavItemSelect}
              
              style={{ color: "white" }}
            >
              <FontAwesomeIcon icon={faCog} style={{ marginRight: "10px" }} />
              <Link to="#" style={{ textDecoration: "none" }}>
                <span style={{color: "#ffffff", marginLeft: "10px" }}>Settings</span>
              </Link>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item className="nav-link mt-auto">
          <Nav.Link
              eventKey="logout"
              active={activeNavItem === "logout"}
              onSelect={handleNavItemSelect}
              
              style={{ color: "white" }}
            >
              <FontAwesomeIcon icon={faSignOutAlt } style={{ marginRight: "10px" }} />
              <Link to="#" style={{ textDecoration: "none" }}>
                <span style={{color: "#ffffff", marginLeft: "10px" }}>Log Out</span>
              </Link>
            </Nav.Link>
          </Nav.Item>
          </div>


        </ul>
        
      </div>
    </Nav>
  );
}

export default SideBar;
