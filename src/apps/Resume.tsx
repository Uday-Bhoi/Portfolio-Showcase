import React from 'react';
import './Resume.css';
import resumePdf from '../assets/documents/resume.pdf';

const Resume: React.FC = () => {
  return (
    <div className="resume-viewer">
      {/* Embed the PDF directly */}
      <embed
        src={resumePdf}
        type="application/pdf"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      />

      {/* Controls overlay – only the download button for now */}
      <div className="resume-controls-overlay">
        <a
          href={resumePdf}
          target="_blank"
          rel="noopener noreferrer"
          download="resume.pdf"
          className="download-floating-btn"
        >
          <span className="material-icons">download</span>
          Download PDF
        </a>
      </div>
    </div>
  );
};

export default Resume;
