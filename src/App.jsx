import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Request from './pages/request'
import Dashboard from './pages/dashboard'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/navbar'
import { BrowserRouter } from 'react-router-dom';

import './App.css'

function App() {

  return (
    <>

      <Router>
      <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/request" element={<Request />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>

  )
}

export default App
