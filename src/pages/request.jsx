import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { collection, addDoc } from 'firebase/firestore';
import { db } from "../firebase"; 
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { loadStripe } from '@stripe/stripe-js';
import logo from '../assets/logo.png';
import bandImage from '../assets/band_image_test.png';

const Request = () => {
  const stripePromise = loadStripe(`${import.meta.env.VITE_REACT_STRIPE_PUBLISHABLE_KEY}`);


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
		// First, send the request data to the Firestore database
		const docRef = await addDoc(collection(db, 'requests'), requestData);
      
      	if (!requestData.tip) {
			setRequestData({
				title: '',
				band: '',
				name: '',
				tipAmount: '',
				message: '',
				complete: false,
			});
			navigate('/success');
		} else {
			handleCheckout(requestData.tipAmount)
			.then(() => {
				setRequestData({
					title: '',
					band: '',
					name: '',
					tipAmount: '',
					message: '',
					complete: false,
				});
			})
			.catch((error) => {
				console.error("Error during checkout: ", error);
				alert("Error during checkout. Please try again. --- " + error);
			});
		}
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error submitting request. Please try again. --- " + error);
    }
  };

  const handleCheckout = async (amount) => {
    const stripe = await stripePromise;
    const response = await fetch(import.meta.env.VITE_REACT_PROD_SERVER_URL + '/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: parseFloat(amount) }),
    });

    const { url } = await response.json();
    window.location.href = url;
  };
    

  return (
    <div>
		<div className="mb-4">
			<div className="w-full flex items-center mb-4">
				<img className="w-8 md:w-16 h-8 md:h-16 mr-2" src={logo} alt="logo" />
				<h1 className="text-lg md:text-3xl font-regular">MelodyCue</h1>
			</div>
			
			<h1 className="text-xl md:text-2xl font-bold">Request a Song</h1>
						
			<div className="flex flex-col">
				<h1 className="text-base md:text-lg text-gray-800">The Midnight Jellyfish Parade</h1>
				<a href="/" className="text-blue-500 hover:underline">@bandNameMusic</a>
			</div>
		</div>
		<Form onSubmit={handleSubmit}>
			<Form.Group className="mb-3" controlId="name">
			<Form.Label className="w-100 text-start fw-bold">Your Name</Form.Label>
			<Form.Control
				type="name"
				placeholder="Your name"
				value={requestData.name}
				onChange={handleInputChange}
			/>
			</Form.Group>
			<Form.Group className="mb-3" controlId="title">
			<Form.Label className="w-100 text-start fw-bold">Song Title <small className="font-normal text-red-600">*Required</small></Form.Label>
			<Form.Control
				type="text"
				placeholder="Title"
				value={requestData.title}
				onChange={handleInputChange}
				required
			/>
			</Form.Group>
			<Form.Group className="mb-3" controlId="band">
			<Form.Label className="w-100 text-start fw-bold">Band <small className="font-normal text-red-600">*Required</small></Form.Label>
			<Form.Control
				type="text"
				placeholder="Band"
				value={requestData.band}
				onChange={handleInputChange}
				required
			/>
			</Form.Group>
			<Form.Group className="mb-3" controlId="message">
			<Form.Label className="w-100 text-start fw-bold">Message to the band</Form.Label>
			<Form.Control
				as="textarea"
				rows={3}
				placeholder="Message"
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
				className="hover"
				/>
			</Form.Group>
			{requestData.tip && (
			<Form.Group className="mb-3 ms-3" controlId="tipAmount">
			<Form.Control
				type="text"
				placeholder="Tip Amount"
				value={requestData.tipAmount}
				onChange={handleInputChange}
			/>
			</Form.Group>
			)}
			</div>
			<div className="d-grid gap-2">
			<button type="submit" className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-brandPrimary rounded-lg hover:bg-brandPrimary-dark focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
    Submit
</button>
			</div>
		</Form>

		<div className="fixed bottom-0 left-0 w-full bg-brandSecondary text-white text-center py-4 px-6 shadow-lg">
			<p className="text-lg font-semibold">
				Got a band? Sign up for MelodyCue<span className="italic">...it's free!</span>
			</p>
			<a href="/signup" className="mt-2 inline-block bg-white text-brandSecondary font-bold py-2 px-4 rounded-full hover:bg-indigo-100 transition">Sign Up Now</a>
		</div>

    </div>
  );
};

export default Request;