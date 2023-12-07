import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { PDFDocument, rgb } from 'pdf-lib';
import { useNavigate, Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function Refunds() {
    const [refundList, setRefundList] = useState([]);
    const [filteredRefundList, setFilteredRefundList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);
    const [selectedRefundId, setSelectedRefundId] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5000/refund/')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch refund data');
                }
                return response.json();
            })
            .then((data) => {
                setRefundList(data);
                setFilteredRefundList(data);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query === "") {
            setFilteredRefundList([...refundList]);
        } else {
            const filtered = refundList.filter((item) =>
                item.refundId.toString().includes(query.toLowerCase())
            );
            setFilteredRefundList(filtered);
        }
    };

    const generateReport = async () => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 1000]);

        page.drawText('Refunds Report', {
            x: 50,
            y: 950,
            size: 18,
            color: rgb(0, 0, 0),
        });

        let y = 900;
        filteredRefundList.forEach((item) => {
            const text = `Refund ID: ${item.refundId}\nAmount: ${item.amount}\nPayment Type: ${item.paymentType}\nRequested Date: ${item.requestedDate}`;
            page.drawText(text, {
                x: 50,
                y: y,
                size: 9,
                color: rgb(0, 0, 0),
            });
            y -= 80;
        });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        window.open(url);
    };

    const navigate = useNavigate();

    const handleShowConfirmationModal = (refundId) => {
        setSelectedRefundId(refundId);
        setShowConfirmationModal(true);
    };

    const handleHideConfirmationModal = () => {
        setSelectedRefundId(null);
        setShowConfirmationModal(false);
    };

    const handleRemoveRefund = async () => {
        try {
            await fetch(`http://localhost:8070/refund/delete/${selectedRefundId}`, {
                method: 'DELETE',
            });

            const updatedRefundList = refundList.filter((item) => item.refundId !== selectedRefundId);
            setRefundList(updatedRefundList);
            setFilteredRefundList(updatedRefundList);

            handleHideConfirmationModal();
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className='text-start mb-4'>Refunds</h2>
            <div className="col-3">
                <form>
                    <div className="p-1 bg-light d-flex  shadow-sm mb-4">
                        <div className="input-group">
                            <input
                                type="search"
                                placeholder="Search Refund ID"
                                aria-describedby="button-addon1"
                                className="form-control border-0 bg-light"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <div className="input-group-append">
                                <button
                                    id="button-addon1"
                                    type="submit"
                                    className="btn btn-link text-dark"
                                >
                                    <FontAwesomeIcon icon={faSearch} />
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <button
                className="btn btn-primary mx-2"
                onClick={generateReport}
            >
                <FontAwesomeIcon icon={faFilePdf} /> Generate PDF
            </button>
            <Link to="/addrefund">
                <button
                    className="btn btn-secondary mx-2"
                >
                    Request a Refund
                </button>
            </Link>
            <div className='row d-flex justify-content-center align-middle h-100 mt-5'>
                <div className='col-8 shadow-lg p-3 mb-5 bg-white rounded'>
                    <table className="table mt-3">
                        <thead>
                            <tr>
                                <th scope="col">Refund ID</th>
                                <th scope="col">Invoice ID</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Payment Type</th>
                                <th scope="col">Requested Date</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRefundList.map((item) => (
                                <tr key={item.refundId}>
                                    <td>{item.refundId}</td>
                                    <td>{item.invoiceId}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.paymentType}</td>
                                    <td>{item.requestedDate}</td>
                                    <td>
                                        <Link to={`/updaterefund/${item.refundId}`} className='btn btn-primary'>
                                            Update
                                        </Link>
                                    </td>
                                    <td>
                                        <button className='btn btn-danger' onClick={() => handleShowConfirmationModal(item.refundId)}>
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal show={showConfirmationModal} onHide={handleHideConfirmationModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Removal</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to remove this refund?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleHideConfirmationModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleRemoveRefund}>
                        Remove
                    </Button>
                </Modal.Footer>
            </Modal>

            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}
