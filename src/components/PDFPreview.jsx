// src/components/PdfPreview.jsx
import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PdfPreview = ({ url }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (
        <div
            style={{
                border: '1px solid rgba(0, 0, 0, 0.3)',
                height: '750px',
            }}
        >
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js`}>
                <Viewer fileUrl={url} plugins={[defaultLayoutPluginInstance]} />
            </Worker>
        </div>
    );
};

export default PdfPreview;
