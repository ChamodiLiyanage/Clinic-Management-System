import React from 'react'
import { Link } from 'react-router-dom';

export default function ManagerHome() {
    return (
        <div>
            <div className='row mt-5 py-5 px-5'>
                <div className='col-3'>
                    <Link to="/viewInventory"><button className='btn btn-primary col-12'>Inventory</button></Link>
                </div>
                <div className='col-3'>
                    <Link to="/createTest"><button className='btn btn-primary col-12'>Test Labs</button></Link>
                </div>
                <div className='col-3'>
                    <Link to="all-prescription"><button className='btn btn-primary col-12'>Prescriptions</button></Link>
                </div>
                <div className='col-3'>
                    <Link to="/druglist"><button className='btn btn-primary col-12'>Drugs</button></Link>
                </div>
                <div className='col-3 mt-5'>
                    <Link to="/payments"><button className='btn btn-primary col-12'>Payments</button></Link>
                </div>
                <div className='col-3 mt-5'>
                    <Link to="/manager"><button className='btn btn-primary col-12'>Members</button></Link>
                </div>
            </div>
        </div>
    )
}
