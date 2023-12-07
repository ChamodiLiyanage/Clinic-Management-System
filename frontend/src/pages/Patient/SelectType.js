import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import background from "./Images/background.png";
import Header from "./Header";
import './CSS.css';

function SelectType(){

  

    return(
      <div className="add-patients-container">
      <Header />
      <div className="main-content">
      
        <div className="form-container">

            <br></br><br></br><br></br><br></br> <br></br>  
        <div className="container">

        <div className="content"><h4><u>Select the Test</u></h4></div>

       

            <div className="custom-div">

                        
            <div className="button1-container">
                <Link to="/create" className="btn btn-primary custom-button">Blood Test</Link>
                <Link to="/create-urine" className="btn btn-primary custom-button">Urinalysis</Link>
            </div>

            </div>

                       

       
        
        </div>

        
        </div>
        
        

        </div>
        

        <div className="background-image">
            <img src={background} alt="Background Image" />
          </div>

        
        
        </div>

        
    )
}

export default SelectType;