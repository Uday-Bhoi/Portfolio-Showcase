import React from 'react';
import './Resume.css';
import udayResume from '../assets/documents/Uday ATS CV.pdf';

const Resume: React.FC = () => {
    return (
        <div className="resume-viewer">
            <iframe 
                src={`${udayResume}#toolbar=0&navpanes=0&scrollbar=0`} 
                title="Uday Bhoi Resume"
                className="resume-iframe"
                width="100%"
                height="100%"
            />
            <div className="resume-controls-overlay">
                <a href={udayResume} download="Uday ATS CV.pdf" className="download-floating-btn">
                    <span className="material-icons">download</span>
                    Download PDF
                </a>
            </div>
        </div>
    );
};

export default Resume;
