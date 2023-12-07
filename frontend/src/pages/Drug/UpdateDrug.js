import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';

export default function UpdateDrug() {
    const { id } = useParams();
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

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/drug/get/${id}`);
                const { medicineName, genericName, expirationDate, dosageForm, manufacturer, storageConditions, price, quantity, file } = response.data;
                setFormData({ medicineName, genericName, expirationDate, dosageForm, manufacturer, storageConditions, price, quantity, file });
            } catch (error) {
                console.error('Error fetching drug details: ', error);
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedDrugData = {
                medicineName: formData.medicineName,
                genericName: formData.genericName,
                expirationDate: formData.expirationDate,
                dosageForm: formData.dosageForm,
                manufacturer: formData.manufacturer,
                storageConditions: formData.storageConditions,
                price: formData.price,
                quantity: formData.quantity
            };

            const response = await axios.put(`http://localhost:5000/drug/update/${id}`, updatedDrugData);
            console.log('Response:', response.data); // Log the response data if needed

            navigate('/druglist');
        } catch (error) {
            console.error('Error updating drug: ', error);
        }
    };


    return (
        <div className="container">
            <Header/>
            <h2 className="text-start mt-3">Update Drug</h2>
            <div className="row d-flex justify-content-center align-middle h-100 mt-5">
                <div className="col-6 text-start shadow-lg p-3 mb-5 bg-white rounded">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="control-label">Medicine Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="medicineName"
                                value={formData.medicineName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Generic Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="genericName"
                                value={formData.genericName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Expiration Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="expirationDate"
                                value={formData.expirationDate}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Dosage Form</label>
                            <input
                                type="text"
                                className="form-control"
                                name="dosageForm"
                                value={formData.dosageForm}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Manufacturer</label>
                            <input
                                type="text"
                                className="form-control"
                                name="manufacturer"
                                value={formData.manufacturer}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Storage Conditions</label>
                            <input
                                type="text"
                                className="form-control"
                                name="storageConditions"
                                value={formData.storageConditions}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Quantity</label>
                            <input
                                type="number"
                                className="form-control"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Update Image</label>
                            <input
                                type="file"
                                className="form-control"
                                name="file"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-sm-12 d-flex justify-content-center">
                                    <button type="submit" className="btn btn-primary mt-2 pull-center">
                                        Update
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
