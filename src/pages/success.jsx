// src/components/AuthForm.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const Success = () => {
    const navigate = useNavigate();

    return (
        <div className="sign-in-wrapper">
            <h1>Success!</h1>
            <h3>Your song request and tip have been sent to the band.</h3>
            <p>Thank you for your support!</p>
            <Link className="btn-primary" to="/"><FaHome className="mr-small"/>Home Page</Link>
        </div>
    );
};

export default Success;
