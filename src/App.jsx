// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Request from './pages/request';
import Login from './pages/login';
import Admin from './pages/admin';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './components/PrivateRoute'; 
import { AuthProvider } from './context/AuthContext';

import './App.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Request />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin" element={<PrivateRoute element={Admin} />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
