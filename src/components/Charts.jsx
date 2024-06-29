// src/components/PdfList.jsx
import React, { useEffect, useState } from 'react';
import ChartService from '../services/charts-service';
import PdfPreview from './PDFPreview';

const PdfList = () => {
    const [pdfs, setPdfs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPDF, setCurrentPDF] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); 

    useEffect(() => {
        const fetchPdfs = async () => {
            try {
                const pdfList = await ChartService.getPdfs();
                setPdfs(pdfList);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPdfs();
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const filteredPdfs = pdfs.filter(pdf =>
      pdf.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div>
                <div>
                    <button className="w-100 my-3" onClick={openModal}>Search</button>
                    <h3>{pdfs[currentPDF].name}</h3>
                    <iframe
                        className='chart-iframe'
                        src={pdfs[currentPDF].url}
                        width="100%"
    
                        title={pdfs[currentPDF].name}
                    ></iframe>
                </div>
            </div>
            {isModalOpen && (
                <div className="charts-modal">
                    <button className="btn-close" onClick={closeModal}></button>
                    <div>
                        <input
                            type="text"
                            class="chart-search mb-3"
                            placeholder="Search by PDF name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="charts-thumbnail-container">
                            {filteredPdfs.map((pdf, index) => (
                                <button className="charts-thumbnail" key={pdf.name} onClick={() => setCurrentPDF(index)}>
                                    {pdf.name}
                                </button>
                            ))}
                        </div>
    
                    </div>
                </div>
            )}
        </div>
    );
};

export default PdfList;
