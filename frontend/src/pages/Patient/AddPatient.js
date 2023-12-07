import React from 'react';
import { Link } from 'react-router-dom';
import background from "./Images/background.png";
import Header from "./Header";
import './CSS.css';

function AddPatient(){

    return(
      <div className="add-patients-container">
      <Header />
      <div className="main-content">
      
        <div className="form-container">

            <br></br><br></br><br></br><br></br> <br></br>  
        <div className="container">

        <div className="content"><h4><u>New Blood Test</u></h4></div>

        <form>

            <div className="custom-div">

            <div className="mb-3">

                <label for="exampleInputPhoneNumber1" className="form-label"><b>Patient Contact Number</b></label>

                <input 
                    type="text" 
                    className="form-control" 
                    id="exampleInputPhoneNumber1" 
                    aria-describedby="PhoneNumberlHelp"
                    
                    />
            
            <div id="PhoneNumberHelp" className="form-text">Type Patient's Contact Number for check registration.</div>
            
            </div>
            
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <Link to="#"><button type="submit" className="btn btn-primary float-end">Submit</button></Link>

            <div className="content-container">
                <div><h5 style={{ color: "red" }}>Patient Not Registered!</h5></div>
                <Link to="/register">
                    <div className="container"> <button type="add" className="btn btn-primary" >Add New Patient</button> </div>
                </Link>
            </div>

            </div>

            

        </form>
        </div>

        
        </div>
        
        

        </div>
        

        <div className="background-image">
            <img src={background} alt="Background Image" />
          </div>

        
        
        </div>

        
    )
}

export default AddPatient;