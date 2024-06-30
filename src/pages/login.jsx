// src/components/AuthForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp, signIn } from '../services/auth';

const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            await signIn(email, password);
            navigate('/admin');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="sign-in-wrapper">
            <h2>Sign In</h2>
            <form onSubmit={handleSignIn} className="sign-in-form-container">
                <input
                    type="email"
                    className="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    className="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default AuthForm;
