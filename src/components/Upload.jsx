import React, { useState, useEffect } from 'react';
import ChartService from '../services/charts-service';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [pdfs, setPdfs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (file) {
            try {
                setLoading(true);
                const uploadedPdf = await ChartService.uploadPdf(file);
                setPdfs([...pdfs, uploadedPdf]);
                setFile(null);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2 className="my-3">Upload PDF</h2>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default Upload;
