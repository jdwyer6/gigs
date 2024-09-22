import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, doc, updateDoc } from 'firebase/firestore';
import { db } from "../firebase";
import { FaCheck, FaMusic, FaList } from 'react-icons/fa';

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const [charts, setCharts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestsLoaded, setRequestsLoaded] = useState(false);

  async function getRequests() {
    const q = query(collection(db, "requests"));
    const querySnapshot = await getDocs(q);
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() }); 
    });
    console.log(items)
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

  const getMusicSearchQuery = (title, band) => {
    const searchQuery = encodeURIComponent(`${title} ${band}`);
    window.open(`https://www.sheetmusicdirect.com/en-US/Search.aspx?query=${searchQuery}`);
  }

  const getLyricsSearchQuery = (title, band) => {
    const searchQuery = encodeURIComponent(`${title} ${band} lyrics`);
    window.open(`https://www.google.com/search?q=${searchQuery}`);
  }

  useEffect(() => {
    getRequests().then(() => setRequestsLoaded(true));
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="dashboard-page request-card-wrapper">
      {requests
      .sort((a, b) => {
        // Move incomplete requests to the front
        if (a.complete === b.complete) return 0; // Keep original order if both have the same completion status
        return a.complete ? 1 : -1; // Incomplete requests come first
      })
      .map((request, index) => (
        <div key={index} className="request-card-container">
          <div className="song-info-container">
            <div className="info-item title">
              <h3>{request.title}</h3>
            </div>
            <div className="info-item band">
              <b>Band: </b>
              <p>{request.band}</p>
            </div>
            <div className="info-item name">
              <b>Name: </b>
              <p>{request.name}</p>
            </div>
            <div className="info-item tip">
              <b>Tip Amount: </b>
              <p>{request.tip ? request.tipAmount : 'No Tip Submitted :('}</p>
            </div>
            <div className="info-item message">
              <b>Message:</b>
              <p>{request.message}</p>
            </div>
          </div>
          <div className="song-actions-container">
            <div className="btn-song-actions btn-chart" onClick={()=>getMusicSearchQuery(request.title, request.band)}>
              <FaMusic /> Music
            </div>
            <div className="btn-song-actions btn-lyrics" onClick={()=>getLyricsSearchQuery(request.title, request.band)}>
              <FaList /> Lyrics
            </div>
            {request.complete ? (
              <div className="btn-song-actions btn-done" onClick={() => handleCompleteRequest(request, false)}>Undo Mark Complete</div>
            ) : 
            <div className="btn-song-actions btn-complete" onClick={() => handleCompleteRequest(request, true)}>
              Mark as Complete
            </div>
            }
          </div>
        </div>
      ))}
    </div>
    
  );
};

export default Dashboard;
