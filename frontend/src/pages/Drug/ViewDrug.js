import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from './Header';

export default function ViewDrug() {
    const { id } = useParams();
    const [drug, setDrug] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/drug/get/${id}`);
                setDrug(response.data);
            } catch (error) {
                console.error('Error fetching drug details: ', error);
            }
        };

        fetchData();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/drug/delete/${id}`);
            navigate('/');
        } catch (error) {
            console.error('Error deleting drug: ', error);
        }
    };

    if (!drug) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <Header/>
            <div className="container">
                <h2 className="text-start mt-3">View Drug</h2>
                <div className="row d-flex justify-content-center align-middle h-100 mt-5">
                    <div className="col-6 shadow-lg p-3 mb-5 bg-white rounded">

                        <img src={`http://localhost:5000/${drug.file.replace(/\\/g, '/')}`} alt="Drug" style={{ height: 200 }} />
                        <h2>{drug.medicineName}</h2>
                        <div className="container text-start mx-5 mt-5">
                            <p>Generic Name: {drug.genericName}</p>
                            <p>Expiration Date: {drug.expirationDate}</p>
                            <p>Dosage Form: {drug.dosageForm}</p>
                            <p>Manufacturer: {drug.manufacturer}</p>
                            <p>Storage Conditions: {drug.storageConditions}</p>
                            <p>Price: Rs {drug.price}</p>
                            <p>Quantity: {drug.quantity}</p>
                            <div className='row mt-4'>
                                <div className='col-5'>
                                    <Link to={`/updatedrug/${id}`} className="btn btn-primary col-12 ms-2">
                                        Update
                                    </Link>
                                </div>
                                <div className='col-5'>
                                    <button className="btn btn-danger col-12" onClick={() => setShowModal(true)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Removal</h5>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to remove this drug?
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-danger" onClick={handleDelete}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
