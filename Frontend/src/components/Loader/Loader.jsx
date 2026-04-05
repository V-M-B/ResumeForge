import React from 'react';
import './Loader.scss';

const Loader = ({ text = "Loading ResumeForge..." }) => {
    return (
        <div className="global-loader-container">
            <div className="loader-content">
                <div className="spinner"></div>
                <h2>{text}</h2>
                <p>Please wait while we wake up the server.</p>
            </div>
        </div>
    );
};

export default Loader;
