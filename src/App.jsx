import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Request from './pages/request'
import Dashboard from './pages/dashboard'
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './components/navbar'

import './App.css'

function App() {

  return (
    <>
      <Nav />
      <Router>
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
