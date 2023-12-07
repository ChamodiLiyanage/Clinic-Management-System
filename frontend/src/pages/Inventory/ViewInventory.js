import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash, faEdit, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import { PDFDocument, rgb } from 'pdf-lib';

export default function ViewInventory() {
    const [inventoryList, setInventoryList] = useState([]);
    const [filteredInventoryList, setFilteredInventoryList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedInventoryId, setSelectedInventoryId] = useState(null);

    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Fetch inventory data from the backend API
        fetch('http://localhost:5000/inventory')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch inventory data');
                }
                return response.json();
            })
            .then((data) => {
                setInventoryList(data);
                setFilteredInventoryList(data);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);

    // Handle search input change
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query === "") {
            setFilteredInventoryList([...inventoryList]);
        } else {
            const filtered = inventoryList.filter((item) =>
                item.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredInventoryList(filtered);
        }
    };

    // Handle delete inventory item
    const handleDeleteInventoryItem = () => {
        if (selectedInventoryId) {
            fetch(`http://localhost:5000/inventory/delete/${selectedInventoryId}`, {
                method: 'DELETE',
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to delete inventory item');
                    }
                    const updatedList = inventoryList.filter((item) => item._id !== selectedInventoryId);
                    setInventoryList(updatedList);
                    setFilteredInventoryList(updatedList);
                    setShowDeleteModal(false);
                })
                .catch((err) => {
                    setError(err.message);
                });
        }
    };
    // Generate PDF report
    const generateReport = async () => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 1000]);

        page.drawText('Inventory Report', {
            x: 50,
            y: 950,
            size: 18,
            color: rgb(0, 0, 0),
        });

        let y = 900;
        filteredInventoryList.forEach((item) => {
            const text = `Name: ${item.name}\nCode: ${item.code}\nBrand: ${item.brand}\nCategory: ${item.category}\nQuantity: ${item.quantity}\nUnit: ${item.unit}\nPrice: ${item.price}\nCost: ${item.cost}`;
            page.drawText(text, {
                x: 50,
                y: y,
                size: 9,
                color: rgb(0, 0, 0),
            });
            y -= 80; // Adjust the line spacing
        });

        const pdfBytes = await pdfDoc.save();

        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        window.open(url);
    };

    // Render the component
    return (
        <div className="bg-dark pb-5">
            <div className="container mt-5">
                <div className="row justify-content-between mb-4">
                    <div className="col-8">
                        <h3 className='text-light'>All Inventory Items</h3>
                    </div>
                    <Link to={`/addInventory`}>
                        <button className="btn btn-primary btn-sm mx-1 my-2">
                            Add a New Item
                        </button>
                    </Link>
                    <button className="btn btn-primary col-3  btn-sm mx-1 my-2" onClick={generateReport} >
                        Generate a Report
                    </button>
                    <div className="col-4">
                        <div className="input-group">
                            <input
                                type="search"
                                className="form-control"
                                placeholder="Search Inventory"
                                aria-label="Search Inventory"
                                aria-describedby="search-button"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    id="search-button"
                                >
                                    <FontAwesomeIcon icon={faSearch} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Code</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Category</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Unit</th>
                            <th scope="col">Price</th>
                            <th scope="col">Cost</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInventoryList.map((item) => (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.code}</td>
                                <td>{item.brand}</td>
                                <td>{item.category}</td>
                                <td>{item.quantity}</td>
                                <td>{item.unit}</td>
                                <td>{item.price}</td>
                                <td>{item.cost}</td>
                                <td>
                                    <Link to={`/editInventory/${item._id}`}>
                                        <button className="btn btn-dark btn-sm mx-1">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm mx-1"
                                        onClick={() => {
                                            setSelectedInventoryId(item._id);
                                            setShowDeleteModal(true);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {error && <div className="alert alert-danger">{error}</div>}
            </div>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this inventory item?
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </button>
                    <button className="btn btn-danger" onClick={handleDeleteInventoryItem}>
                        Delete
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
