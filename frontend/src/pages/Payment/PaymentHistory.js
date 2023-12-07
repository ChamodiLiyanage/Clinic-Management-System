import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { PDFDocument, rgb } from 'pdf-lib';

export default function PaymentHistory() {
    const [paymentList, setPaymentList] = useState([]);
    const [filteredPaymentList, setFilteredPaymentList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/payment/')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch payment data');
                }
                return response.json();
            })
            .then((data) => {
                setPaymentList(data);
                setFilteredPaymentList(data);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query === "") {
            setFilteredPaymentList([...paymentList]);
        } else {
            const filtered = paymentList.filter((item) =>
                item.invoiceNumber.toString().includes(query.toLowerCase())
            );
            setFilteredPaymentList(filtered);
        }
    };

    const generateReport = async () => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 1000]);

        page.drawText('Payment History Report', {
            x: 50,
            y: 950,
            size: 18,
            color: rgb(0, 0, 0),
        });

        let y = 900;
        filteredPaymentList.forEach((item) => {
            const text = `Invoice Number: ${item.invoiceNumber}\nAmount: ${item.amount}\nPayment Type: ${item.paymentType}\nDate: ${item.date}`;
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

    return (
        <div className="pb-5">
            <div className="row mt-5 py-5 px-2 rounded mb-5" style={{ marginBottom: 100 }}>
                <div className="col-12 mt-3">
                    <div className="row">
                        <div className="col-8">
                            <h2 className='text-start'>Payment History</h2>
                        </div>
                        <div className='row d-flex justify-content-end'>
                            <div className="col-2">
                                <button
                                    className="btn btn-primary"
                                    onClick={generateReport}
                                > Generate PDF
                                </button>
                            </div>
                        </div>

                        <div className="col-8 d-flex justify-content-center">
                            <form>
                                <div className="p-1 bg-light d-flex rounded rounded-pill shadow-sm mb-4">
                                    <div className="input-group">
                                        <input
                                            type="search"
                                            placeholder="Search Invoice Number"
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
                    </div>
                </div>
                <div className='row d-flex justify-content-center align-middle h-100 mt-5'>
                    <div className='col-6 shadow-lg p-3 mb-5 bg-white rounded'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Invoice Number</th>
                                    <th scope="col">Appointment Number</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Payment Type</th>
                                    <th scope="col">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPaymentList.map((item, index) => (
                                    <tr key={item._id}>
                                        <td>{item.invoiceNumber}</td>
                                        <td>{item.appointmentNumber}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.paymentType}</td>
                                        <td>{item.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className='' style={{ height: '200px' }}></div>
            </div>
        </div>
    );
}
