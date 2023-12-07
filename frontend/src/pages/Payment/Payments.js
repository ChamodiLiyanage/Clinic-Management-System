import React from 'react';
import { Link } from 'react-router-dom';

export default function Payments() {
  return (
    <div>
      <div className='container mt-5'>
        <h2 className='text-start'>Payments</h2>
        <div className='row d-flex justify-content-center align-middle h-100 mt-5'>
          <div className='col-6 shadow-lg p-3 mb-5 bg-white rounded'>
            <Link to='/refunds' className='btn btn-primary mt-5 col-12'>
              Refunds
            </Link>
            <Link to='/payment-history' className='btn btn-primary mt-5 col-12'>
             Payment History
            </Link>
            <Link to='/reports' className='btn btn-primary mt-5 col-12'>
              Reports
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
