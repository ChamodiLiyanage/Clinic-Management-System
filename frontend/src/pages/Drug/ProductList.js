import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { PDFDocument, rgb } from 'pdf-lib';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Header from './Header';

export default function ProductList() {
    const [drugs, setDrugs] = useState([]);
    const [filteredDrugs, setFilteredDrugs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);
    const [selectedDrugId, setSelectedDrugId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/drug/');
                setDrugs(response.data);
                setFilteredDrugs(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query === "") {
            setFilteredDrugs([...drugs]);
        } else {
            const filtered = drugs.filter((item) =>
                item.medicineName.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredDrugs(filtered);
        }
    };

    const generateReport = async () => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([1200, 2000]);

        page.drawText('Drugs Report', {
            x: 50,
            y: 1950,
            size: 18,
            color: rgb(0, 0, 0),
        });

        let y = 1900;
        filteredDrugs.forEach((drug) => {
            const text = `Medicine Name: ${drug.medicineName}\nPrice: Rs ${drug.price}\nGeneric Name: ${drug.genericName}\nExpiration Date: ${drug.expirationDate}\nDosage Form: ${drug.dosageForm}\nManufacturer: ${drug.manufacturer}\nStorage Conditions: ${drug.storageConditions}\nQuantity: ${drug.quantity}`;
            page.drawText(text, {
                x: 50,
                y: y,
                size: 9,
                color: rgb(0, 0, 0),
            });
            y -= 220;
        });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        window.open(url);
    };

    return (
        <div className="container pt-5">
            <Header/>
            <h2 className='text-start mb-4'>Product List</h2>
            <Link to="/adddrug" className='btn btn-primary'>Add a Drug</Link>
            <div className="col-3">
                <form>
                    <div className="p-1 bg-light d-flex  shadow-sm mb-4">
                        <div className="input-group">
                            <input
                                type="search"
                                placeholder="Search Medicine Name"
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
            <div className='d-flex justify-content-start'>
                <button
                    className="btn btn-primary mx-2"
                    onClick={generateReport}
                >
                    <FontAwesomeIcon icon={faFilePdf} /> Generate PDF
                </button>
            </div>
            <div className="container m-4">
                <div className="row">
                    {filteredDrugs.map((drug) => (
                        <div key={drug._id} className="card border-0 rounded-0 shadow mx-1 col-2">
                            <img src={`http://localhost:5000/${drug.file.replace(/\\/g, '/')}`} className="card-img-top img-fluid rounded-0" style={{ height: 200 }} alt="Drug" />
                            <div className="card-body mt-1 mb-1">
                                <p className="card-title text-truncate">{drug.medicineName}</p>
                            </div>
                            <div className="row align-items-center text-center g-0">
                                <div className="col-4">
                                    <p>Rs {drug.price}</p>
                                </div>
                                <div className="col-8">
                                    <Link to={`/viewdrug/${drug._id}`} className="btn btn-primary w-100 p-1 rounded-0">
                                        View
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
