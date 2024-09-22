// src/components/AuthForm.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import PaymentFailureImage from '../assets/payment-failure.png';

const Cancel = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center flex-col">
            <div>
                <img src={PaymentFailureImage} className='w-md'/>
            </div>
            <div>
                <h1>Uh Oh</h1>
                <h3>Something went wrong with your payment.</h3>
                <Link className="btn-primary" to="/"><FaHome className="mr-small"/>Home Page</Link>
            </div>

        </div>
    );
};

export default Cancel;
