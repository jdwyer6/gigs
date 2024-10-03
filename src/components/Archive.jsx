import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, doc, updateDoc, deleteDoc, where, writeBatch } from 'firebase/firestore';
import { db } from "../firebase";
import { FaCheck, FaDollarSign, FaUndo } from 'react-icons/fa';
import { IoCloseCircleOutline } from "react-icons/io5";


const Archive = () => {
	const [requests, setRequests] = useState([]);
	const [loading, setLoading] = useState(true);
	const [requestsLoaded, setRequestsLoaded] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [requestToDelete, setRequestToDelete] = useState(null);

	async function getRequests() {
		const q = query(collection(db, "requests"));
		const querySnapshot = await getDocs(q);
		const items = [];
		querySnapshot.forEach((doc) => {
			if (doc.data().archived) {
				items.push({ id: doc.id, ...doc.data() }); 
			}
		});
		setRequests(items);
		setLoading(false);
	}

	const handleDeleteRequest = async () => {
		try {
			const requestRef = doc(db, "requests", requestToDelete.id);
			await deleteDoc(requestRef);
		
			// Update the state to remove the deleted request
			setRequests(prevRequests => prevRequests.filter(req => req.id !== requestToDelete.id));
			setShowDeleteModal(false);
			setRequestToDelete(null);
		} catch (error) {
			console.error("Error deleting document: ", error);
		}
	};

	const handleUnArchiveRequest = async (request) => {
		try {
			const requestRef = doc(db, "requests", request.id);
			await updateDoc(requestRef, { archived: false });
		
			getRequests();
		} catch (error) {
			console.error("Error deleting document: ", error);
		}
	};

	useEffect(() => {
		getRequests().then(() => setRequestsLoaded(true));
	}, []);

	if (loading) {
		return <h1>Loading...</h1>;
	}

	return (
		<div className="mx-auto bg-white pt-3 md:pt-8 md:p-8 md:shadow-lg md:rounded-lg min-h-screen">
			<div className="dashboard-page grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
				{requests
				.sort((a, b) => {
					// Move incomplete requests to the front
					if (a.complete === b.complete) return 0; // Keep original order if both have the same completion status
					return a.complete ? 1 : -1; // Incomplete requests come first
				})
				.map((request, index) => (
					<div key={index} className="w-full p-3 bg-white rounded-md shadow-md flex flex-col justify-between">
						<div className="flex items-start justify-between">
							<span className="text-sm font-light text-gray-800">{request.band}</span>
							<div className={`flex items-center justify-center px-3 py-1 text-xs text-blue-800 uppercase ${request.tip ? "bg-green-200" : "bg-red-200"} rounded-full`}>
								{request.tip ? <><FaDollarSign/> {request.tipAmount} </>: 'No tip'}
							</div>
						</div>

						<div>
							<h1 className="mt-2 text-lg font-semibold text-gray-800 ">{request.title}</h1>
							<div>
								<span className="text-sm text-gray-600 ">{request.message ? request.message : "No message provided."}</span>
								<span className="ml-2 text-sm text-gray-600 ">{request.name ? "-" + request.name : "-anonymous"}</span>
							</div>
						</div>
						<div>
							<div className="flex overflow-hidden bg-white border divide-x rounded-lg rtl:flex-row-reverse mt-2 justify-center">
								<div className="flex justify-center w-full">
									<button className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6   gap-x-3 hover:bg-gray-100 w-full justify-center" onClick={()=>handleUnArchiveRequest(request)}><FaUndo  />  Un-Archive</button>
								</div>	
								<div className="flex justify-center w-full">
									<button className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6   gap-x-3 hover:bg-gray-100 w-full justify-center" onClick={() => { setShowDeleteModal(true); setRequestToDelete(request); }}><IoCloseCircleOutline />  Delete</button>
								</div>	
							</div>
						</div>
					</div>
				))}
				{showDeleteModal && (
					<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
						<div className="bg-white p-4 rounded-md shadow-md">
							<h2 className="text-lg font-semibold">Are you sure you want to delete this request?</h2>
							<p className="text-sm text-gray-500">This action cannot be undone.</p>
							<div className="flex justify-center mt-4">
								<button className="bg-red-500 text-white px-4 py-2 rounded-md mr-2" onClick={handleDeleteRequest}>Delete</button>
								<button className="bg-gray-300 text-black px-4 py-2 rounded-md" onClick={() => setShowDeleteModal(false)}>Cancel</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Archive;
