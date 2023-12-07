import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router-dom';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';

export default function UpdateRefund() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        invoiceId: '',
        amount: '',
        paymentType: 'Cash',
        requestedDate: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRefundDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/refund/get/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setFormData({
                        invoiceId: data.invoiceId,
                        amount: data.amount,
                        paymentType: data.paymentType,
                        requestedDate: data.requestedDate
                    });
                } else {
                    console.error('Failed to fetch refund details');
                }
            } catch (error) {
                console.error('Error occurred:', error);
            }
        };

        fetchRefundDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8070/refund/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                navigate(`/refunds`);
            } else {
                console.error('Refund update failed');
            }
        } catch (error) {
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
                <h2 className='text-start'>Update Refund Request</h2>
                <div className='row d-flex justify-content-center align-middle h-100 mt-5'>
                    <div className='col-6 shadow-lg p-3 mb-5 bg-white rounded'>
                        <h4>Update Refund Request Details</h4>
                        <FontAwesomeIcon className='text-primary' style={{ fontSize: 35 }} icon={faCreditCard} />
                        <br />
                        <form className='text-start' onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="invoiceId">Invoice ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="invoiceId"
                                    name="invoiceId"
                                    placeholder="Enter Invoice ID"
                                    value={formData.invoiceId}
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
                                <label htmlFor="requestedDate">Requested Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="requestedDate"
                                    name="requestedDate"
                                    value={formData.requestedDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className='row'>
                                <button type='button' className='btn btn-danger col-4 mt-4 mx-5' onClick={() => navigate('/refunds')}>Cancel</button>
                                <button type='submit' className='btn btn-primary col-4 mt-4 mx-5'>Update Refund</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
