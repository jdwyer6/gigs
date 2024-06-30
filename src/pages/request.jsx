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
      document.getElementById('form-submit-success-modal').style.display = 'block';
      setRequestData({
        title: '',
        band: '',
        name: '',
        tipAmount: '',
        message: '',
        complete: false,
      });
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
          <Form.Label className="w-100 text-start fw-bold">Your Name (Optional)</Form.Label>
          <Form.Control
            type="name"
            placeholder="Your name (optional)"
            value={requestData.name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="title">
        <Form.Label className="w-100 text-start fw-bold">Song Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={requestData.title}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="band">
        <Form.Label className="w-100 text-start fw-bold">Band</Form.Label>
          <Form.Control
            type="text"
            placeholder="Band"
            value={requestData.band}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="message">
        <Form.Label className="w-100 text-start fw-bold">Message (optional)</Form.Label>
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
          <Button className="btn-primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
      <div className="form-submit-success-modal" id="form-submit-success-modal" style={{display:'none'}}>
        <h3 className="mb-5">The band has received your song request. Thanks!</h3>
        <button onClick={() => document.getElementById('form-submit-success-modal').style.display = 'none'}>Ok</button>
      </div>
    </div>
  );
};

export default Request;
