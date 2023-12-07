import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faBell,faUser } from "@fortawesome/free-solid-svg-icons";
import './CSS.css';
import SideBar from "./SideBar";
import { Link } from "react-router-dom";

function Header(){

    return(

      <div className="header-container">

   
   <div className="main1-content">
      <nav class="navbar navbar-expand-lg navbar-light custom-navbar-bg">
        
        <div class="container-fluid">
          
          <button
            class="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <FontAwesomeIcon icon={faBars} />
            
          </button>
      
          
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            
            <Link class="navbar-brand mt-2 mt-lg-0" to="">
              <img
                src=""
                height="20"
                alt=""
                loading="lazy"
              />
            </Link>
            <FontAwesomeIcon icon={faUser} />
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link" to=""><b>MedLabTech</b></Link>
              </li>
            </ul>
            
          </div>
  
          <div class="d-flex align-items-center">
           
      
          <div class="container-fluid">
            <form class="d-flex input-group w-auto">
              <input
                      type="search"
                      class="form-control rounded"
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="search-addon"
                    />
                    
                    <button className="custom-search-button" type="button" >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
            </form>
          </div>

            <div class="dropdown">
              <Link
                class="text-reset me-3 dropdown-toggle hidden-arrow"
                to="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
               <FontAwesomeIcon icon={faBell} />
                
              </Link>
              <ul
                class="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <Link class="dropdown-item" to="#">Some news</Link>
                </li>
                <li>
                  <Link class="dropdown-item" to="#">Another news</Link>
                </li>
                <li>
                  <Link class="dropdown-item" to="#">Something else here</Link>
                </li>
              </ul>
            </div>
            
            <div class="dropdown">
              <Link
                class="dropdown-toggle d-flex align-items-center hidden-arrow"
                to="#"
                id="navbarDropdownMenuAvatar"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                  class="rounded-circle"
                  height="25"
                  alt="Black and White Portrait of a Man"
                  loading="lazy"
                />
              </Link>
              <ul
                class="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuAvatar"
              >
                <li>
                  <Link class="dropdown-item" to="#">My profile</Link>
                </li>
                <li>
                  <Link class="dropdown-item" to="#">Settings</Link>
                </li>
                <li>
                  <Link class="dropdown-item" to="#">Logout</Link>
                </li>
              </ul>
            </div>
          </div>
          
        </div>
        
      </nav>
      </div>


      </div>
      

    )

    
    
}

export default Header;

