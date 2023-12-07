import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';

export default function AddDrugs() {
    const [formData, setFormData] = useState({
        medicineName: '',
        genericName: '',
        expirationDate: '',
        dosageForm: '',
        manufacturer: '',
        storageConditions: '',
        price: '',
        quantity: '',
        file: null
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();
    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const postData = new FormData();
            postData.append('medicineName', formData.medicineName);
            postData.append('genericName', formData.genericName);
            postData.append('expirationDate', formData.expirationDate);
            postData.append('dosageForm', formData.dosageForm);
            postData.append('manufacturer', formData.manufacturer);
            postData.append('storageConditions', formData.storageConditions);
            postData.append('price', formData.price);
            postData.append('quantity', formData.quantity);
            postData.append('file', formData.file);

            await axios.post('http:/localhost:5000/drug/add', postData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate("/druglist");
        } catch (error) {
            console.error('Error uploading drug: ', error);
        }
    };

    return (
        <div className="container">
            <Header/>
            <h2 className="text-start mt-3">Add drugs</h2>
            <div className="row d-flex justify-content-center align-middle h-100 mt-5">
                <div className="col-6 shadow-lg p-3 text-start mb-5 bg-white rounded">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-sm-6">
                                    <label className="control-label">Medicine Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="medicineName"
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <label className="control-label">Generic Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="genericName"
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-sm-6">
                                    <label className="control-label">Expiration Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="expirationDate"
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <label className="control-label">Dosage Form</label>
                                    <select
                                        className="form-control"
                                        name="dosageForm"
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Please Select</option>
                                        <option>Tablet</option>
                                        <option>Capsule</option>
                                        <option>Syrup</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-sm-6">
                                    <label className="control-label">Manufacturer</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="manufacturer"
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <label className="control-label">Storage Conditions</label>
                                    <select
                                        className="form-control"
                                        name="storageConditions"
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Please Select</option>
                                        <option>Room Temperature</option>
                                        <option>Refrigeration</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <label className="control-label">Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="price"
                                    onChange={handleInputChange}
                                    required
                                    pattern="^[0-9]+(\.[0-9]{1,2})?$"
                                  title="Please enter a valid positive number (up to 2 decimal places)."
                                />
                            </div>
                            <div className="col-sm-6">
                                <label className="control-label">Quantity</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="quantity"
                                    onChange={handleInputChange}
                                    required
                                    pattern="^\d+$"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="mb-3">
                                    <label htmlFor="formFile" className="form-label">
                                        Import an Image
                                    </label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        id="formFile"
                                        onChange={handleFileChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-sm-12 d-flex justify-content-center">
                                    <button
                                        type="submit"
                                        className="btn btn-primary pull-center"
                                    >
                                        Add+
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
