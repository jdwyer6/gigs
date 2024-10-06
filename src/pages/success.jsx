// src/components/AuthForm.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const Success = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg text-center">
                <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center bg-green-100 text-green-600 rounded-full">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707a1 1 0 00-1.414-1.414L9 11.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                    />
                </svg>
                </div>
            
                <h1 className="text-2xl font-bold text-gray-800">Your song was successfully submitted!</h1>
                <p className="mt-2 text-gray-600">Got a band? Use MelodyCue at your next gig. It's free!</p>
            
                <div className="mt-8 space-y-3 md:flex md:space-y-0 md:space-x-4">
                    <Link to="/" className="flex items-center justify-center w-full bg-brandPrimary text-white px-6 py-3 rounded-md font-semibold hover:bg-brandPrimary-dark"><FaHome className="mr-2" />Home</Link>
                    <Link href="#" className="flex items-center justify-center w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-md font-semibold hover:bg-gray-300">Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default Success;
