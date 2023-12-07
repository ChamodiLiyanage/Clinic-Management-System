import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditInventory() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        brand: '',
        category: '',
        quantity: '',
        unit: '',
        price: '',
        cost: '',
    });

    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        // Validation logic (similar to AddInventory component)
        // ...

        setFormErrors(errors);
        return isValid;
    };

    useEffect(() => {
        // Fetch data for editing based on the provided id parameter
        fetch(`http://localhost:5000/inventory/get/${id}`)
            .then((response) => response.json())
            .then((data) => {
                // Update formData state with fetched data
                setFormData({
                    name: data.name,
                    code: data.code,
                    brand: data.brand,
                    category: data.category,
                    quantity: data.quantity.toString(),
                    unit: data.unit,
                    price: data.price.toString(),
                    cost: data.cost.toString(),
                });
            })
            .catch((err) => {
                setError(err.message);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Update inventory item using the provided id
            fetch(`http://localhost:5000/inventory/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to update inventory item');
                    }
                    alert('Inventory Item Updated Successfully');
                    navigate('/viewinventory');
                })
                .catch((err) => {
                    setError(err.message);
                });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="container-fluid pt-5 mb-5 bg-dark">
            <div className="container p-5 mt-5 bg-body-secondary" style={{ borderRadius: 20 }}>
                <h1 className="mt-3 text-center">Edit Inventory Item</h1>
                <div className="container">
                    <form onSubmit={handleSubmit} className="text-start">
                        {/* Input fields for inventory item */}
                        <div className='row'>
                            <div className='col-6'>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        id="name"
                                        placeholder="Enter Name"
                                        required
                                    />
                                    {formErrors.name && <div className="text-danger">{formErrors.name}</div>}
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="form-group">
                                    <label htmlFor="code">Code</label>
                                    <input
                                        type="text"
                                        name="code"
                                        value={formData.code}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        id="code"
                                        placeholder="Enter Code"
                                        required
                                    />
                                    {formErrors.code && <div className="text-danger">{formErrors.code}</div>}
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <div className="form-group">
                                    <label htmlFor="brand">Brand</label>
                                    <input
                                        type="text"
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        id="brand"
                                        placeholder="Enter Brand"
                                        required
                                    />
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="form-group">
                                    <label htmlFor="category">Category</label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        id="category"
                                        placeholder="Enter Category"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <div className="form-group">
                                    <label htmlFor="quantity">Quantity</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        id="quantity"
                                        placeholder="Enter Quantity"
                                        required
                                    />
                                    {formErrors.quantity && <div className="text-danger">{formErrors.quantity}</div>}
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="form-group">
                                    <label htmlFor="unit">Unit</label>
                                    <input
                                        type="text"
                                        name="unit"
                                        value={formData.unit}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        id="unit"
                                        placeholder="Enter Unit"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <div className="form-group">
                                    <label htmlFor="price">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        id="price"
                                        placeholder="Enter Price"
                                        required
                                    />
                                    {formErrors.price && <div className="text-danger">{formErrors.price}</div>}
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="form-group">
                                    <label htmlFor="cost">Cost</label>
                                    <input
                                        type="number"
                                        name="cost"
                                        value={formData.cost}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        id="cost"
                                        placeholder="Enter Cost"
                                        required
                                    />
                                    {formErrors.cost && <div className="text-danger">{formErrors.cost}</div>}
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn col-3 mt-3 mb-5 btn-dark">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
