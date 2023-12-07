import React from "react";
import { redirect } from "react-router-dom";


function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary col-12 bg-primary">
            <div className="header p-2 flex justify-between rounded items-center" >
                <div className="row">
                    <div className="col-2">
                        <a className="navbar-brand" href="/" style={{ color: "red" }}>MEDICARE</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className="col-10">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/" style={{ color: "white" }}>Dashbord</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/all-prescription" style={{ color: "white" }}>Prescription</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/" style={{ color: "white" }}>Report</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/" style={{ color: "white" }}>Add new patient</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/" style={{ color: "white" }}>Settings</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/" style={{ color: "white" }}>Log out</a>
                                </li>


                                {/* <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                    </a>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                    </li> */}
                            </ul>
                            {/* <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form> */}
                        </div>
                    </div>
                </div>


            </div>
        </nav>
    );
}

export default NavBar;