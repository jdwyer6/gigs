import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from "../firebase";
import { FaCheck, FaDollarSign, FaUndo } from 'react-icons/fa';
import { IoCloseCircleOutline } from "react-icons/io5";


const Dashboard = () => {
	const [requests, setRequests] = useState([]);
	const [charts, setCharts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [requestsLoaded, setRequestsLoaded] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [requestToDelete, setRequestToDelete] = useState(null);

	async function getRequests() {
		const q = query(collection(db, "requests"));
		const querySnapshot = await getDocs(q);
		const items = [];
		querySnapshot.forEach((doc) => {
		items.push({ id: doc.id, ...doc.data() }); 
		});
		setRequests(items);
		setLoading(false);
	}

	const handleCompleteRequest = async (request, isDone) => {
		try {
		const requestRef = doc(db, "requests", request.id);
		await updateDoc(requestRef, { complete: isDone });
	
		setRequests(prevRequests =>
			prevRequests.map(req =>
			req.id === request.id ? { ...req, complete: isDone } : req
			)
		);
		} catch (error) {
		console.error("Error updating document: ", error);
		}
	};

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

	const getMusicSearchQuery = (title, band) => {
		const searchQuery = encodeURIComponent(`${title} ${band}`);
		window.open(`https://www.sheetmusicdirect.com/en-US/Search.aspx?query=${searchQuery}`);
	}

	const getLyricsSearchQuery = (title, band) => {
		const searchQuery = encodeURIComponent(`${title} ${band} lyrics`);
		window.open(`https://www.google.com/search?q=${searchQuery}`);
	}

	const handleArchiveAllRequests = async () => {
		// const requestsRef = collection(db, "requests");
		// const querySnapshot = await getDocs(requestsRef);
	
		// querySnapshot.forEach(async (doc) => {
		// 	await updateDoc(doc.ref, { archived: true });
		// });
	}

	useEffect(() => {
		getRequests().then(() => setRequestsLoaded(true));
	}, []);

	if (loading) {
		return <h1>Loading...</h1>;
	}

	return (
		<div className="mx-auto bg-white pt-3 md:pt-8 md:p-8 md:shadow-lg md:rounded-lg min-h-screen">
			{/* Header */}
			<div className="flex md:flex-row items-center justify-between bg-gray-100 p-3 shadow-md rounded-lg mb-3">
				<button className="flex items-center p-2 text-sm font-medium text-gray-600 w-auto transition-colors duration-200 sm:text-base hover:bg-gray bg-white  justify-center border rounded" onClick={handleArchiveAllRequests()}>
					Archive All Requests
				</button>
				<div className="flex items-center space-x-4">
					<div>
						<label htmlFor="sortTime" className="text-gray-700 font-medium mr-2">Sort</label>
						<select id="sortTime" className="bg-white border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
							<option value="first-to-last text-sm">Tip (Most)</option>
							<option value="last-to-first text-sm">Tip (Least)</option>
							<option value="last-to-first text-sm">Time (Newest)</option>
							<option value="last-to-first text-sm">Time (Oldest)</option>
						</select>
					</div>
				</div>
			</div>

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
							<div className="flex items-center mt-2 text-gray-700 justify-center">
								<span>Search </span>
								<a className="mx-2 text-blue-600 cursor-pointer hover:underline" role="link" onClick={()=>getLyricsSearchQuery(request.title, request.band)}>Lyrics</a>
								<span>or</span>
								<a className="mx-2 text-blue-600 cursor-pointer hover:underline" role="link" onClick={()=>getMusicSearchQuery(request.title, request.band)}>Sheet Music</a>
							</div>



							<div className="flex overflow-hidden bg-white border divide-x rounded-lg rtl:flex-row-reverse mt-2 justify-center">
								<div className="w-full">{request.complete ? (
									<button className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6   gap-x-3 hover:bg-gray-100 w-full justify-center" onClick={() => handleCompleteRequest(request, false)}><FaUndo /> Reopen Request</button>) : 
									<button className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6   gap-x-3 hover:bg-gray-100 w-full justify-center" onClick={() => handleCompleteRequest(request, true)}><FaCheck />  Mark Complete</button>}
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

export default Dashboard;
