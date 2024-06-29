import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { collection, addDoc } from 'firebase/firestore';
import { db } from "../firebase"; 
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';


const Request = () => {
  const navigate = useNavigate();
  const [requestData, setRequestData] = useState({
    name: '',
    title: '',
    band: '',
    chartUrl: '',
    message: '',
    tipAmount: '',
    tip: false,
    complete: false
  });

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setRequestData(prevState => ({
      ...prevState,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'requests'), requestData);
      console.log("Document written with ID: ", docRef.id);
      document.getElementById('form-submit-success-modal').style.display = 'block';
      setTimeout(() => {
        document.getElementById('form-submit-success-modal').style.display = 'none';
        navigate('/');  // Redirect after the timeout
      }, 3000); 
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error submitting request. Please try again. --- " + error)
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h1>Request a Song</h1>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Control
            type="name"
            placeholder="Your name (optional)"
            value={requestData.name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="title">
          <Form.Control
            type="text"
            placeholder="Title"
            value={requestData.title}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="band">
          <Form.Control
            type="text"
            placeholder="Band"
            value={requestData.band}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="message">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Message (optional)"
            value={requestData.message}
            onChange={handleInputChange}
          />
        </Form.Group>
        <div className="d-flex">
          <Form.Group className="mb-3" controlId="tip">
            <Form.Check
              type="checkbox"
              label="I want to tip the band."
              checked={requestData.tip}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3 ms-3" controlId="tipAmount">
          <Form.Control
            type="text"
            placeholder="Tip Amount"
            value={requestData.tipAmount}
            onChange={handleInputChange}
          />
        </Form.Group>
        </div>
        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
      <div className="form-submit-success-modal" id="form-submit-success-modal" style={{display:'none'}}>
        <h1>Song Request Submitted Successfully. Thanks!</h1>
        <h3>You will now be redirected to the home page.</h3>
        <div>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        </div>
      </div>
    </div>
  );
};

export default Request;
