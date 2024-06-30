import React, { useState, useEffect } from 'react';
import ChartService from '../services/charts-service';

const Upload = () => {
    const [files, setFiles] = useState([]); 
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
        setFiles(e.target.files);
    };

    const handleUpload = async () => {
        if (files.length > 0) {
            try {
                setLoading(true);
                const uploadedPdfs = [];
                for (let file of files) {
                    const uploadedPdf = await ChartService.uploadPdf(file);
                    uploadedPdfs.push(uploadedPdf);
                }
                setPdfs([...pdfs, ...uploadedPdfs]);
                setFiles([]);
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
            <input type="file" accept="application/pdf" multiple onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default Upload;
