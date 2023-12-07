import React, { useState, useEffect } from 'react';
import { useParams, useNavigate,Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export default function PaymentSuccess() {
    const { invoiceNumber } = useParams();
    const [paymentData, setPaymentData] = useState(null);
    const [invoiceGenerated, setInvoiceGenerated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPaymentData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/payment/getbyappointment/${invoiceNumber}`);
                if (response.ok) {
                    const data = await response.json();
                    setPaymentData(data);
                } else {
                    console.error('Error fetching payment data:', response.statusText);
                }
            } catch (error) {
                console.error('Error occurred while fetching payment data:', error);
            }
        };

        if (!paymentData) {
            fetchPaymentData();
        }
    }, [invoiceNumber, paymentData]);

    const generateInvoice = async () => {
        if (!paymentData) {
            console.error('Payment data not available. Cannot generate invoice.');
            return;
        }

        try {
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage();
            const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

            const { width, height } = page.getSize();
            const fontSize = 20;


            const appointmentNumber = paymentData.appointmentNumber;
            const text = `Invoice for Appointment Number: ${appointmentNumber}`;
            const textWidth = font.widthOfTextAtSize(text, fontSize);

            page.drawText(text, {
                font: font,
                size: fontSize,
                color: rgb(0, 0, 0),
                x: (width - textWidth) / 2,
                y: height - 100,
            });

            const pdfBytes = await pdfDoc.save();

            // Download the PDF or send it to the server, etc.
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');

            setInvoiceGenerated(true);
        } catch (error) {
            console.error('Error generating invoice:', error);
        }
    };

    if (!paymentData) {
        return <div>Loading payment data...</div>;
    }

    return (
        <div>
            <div className='container mt-5'>
                <h2 className='text-start'>Payment Detail Form</h2>
                <Link to="/payments" className='text-end'><button className='btn btn-primary text-end'>Payments</button></Link>
                <div className='row d-flex justify-content-center align-middle h-100 mt-5'>
                    <div className='col-6 shadow-lg p-3 mb-5 bg-white rounded'>
                        <h4>Appointment Number: {paymentData.appointmentNumber}</h4>
                        <FontAwesomeIcon className='text-primary' style={{ fontSize: 60 }} icon={faCircleCheck} />
                        <br />
                        <h5 className='mt-4'>Payment Details Updated</h5>
                        <br />
                        <h5 className='mt-4'>Invoice Number: {paymentData.invoiceNumber}</h5>
                        <button className='col-12 btn btn-danger' onClick={generateInvoice}>
                            Generate Invoice
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
