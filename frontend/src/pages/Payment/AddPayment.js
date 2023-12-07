import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';

export default function AddPayment() {
    const [formData, setFormData] = useState({
        appointmentNumber: '',
        amount: '',
        paymentType: 'Cash',
        date: ''
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/payment/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Payment successful, navigate to a success page or perform other actions
                navigate(`/paymentsuccess/${formData.appointmentNumber}`);
            } else {
                // Handle error scenarios, maybe display an error message to the user
                console.error('Payment failed');
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error occurred:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div>
            <div className='container mt-5'>
                <h2 className='text-start'>Payment Detail Form</h2>
                <div className='row d-flex justify-content-center align-middle h-100 mt-5'>
                    <div className='col-6 shadow-lg p-3 mb-5 bg-white rounded'>
                        <h4>Enter Payment Details</h4>
                        <FontAwesomeIcon className='text-primary' style={{ fontSize: 35 }} icon={faCreditCard} />
                        <br />
                        <form className='text-start' onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="appointmentNumber">Enter Appointment Number</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="appointmentNumber"
                                    name="appointmentNumber"
                                    placeholder="Enter appointment number"
                                    value={formData.appointmentNumber}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="amount">Amount</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="amount"
                                    name="amount"
                                    placeholder="Enter amount"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="paymentType">Payment Type</label>
                                <select
                                    className="form-control form-control-sm"
                                    id="paymentType"
                                    name="paymentType"
                                    value={formData.paymentType}
                                    onChange={handleInputChange}
                                >
                                    <option>Cash</option>
                                    <option>Debit Card</option>
                                    <option>Credit Card</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="date">Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className='row'>
                                <button type="button" className="btn btn-danger col-4 mt-4 mx-5" onClick={() => navigate('/cancel')}>Cancel</button>
                                <button type="submit" className="btn btn-primary col-4 mt-4 mx-5">Pay</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
