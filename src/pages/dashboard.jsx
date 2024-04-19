import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, doc, updateDoc } from 'firebase/firestore';
import db from "../firebase";
import { FaCheck, FaMusic } from 'react-icons/fa';

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const [charts, setCharts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestsLoaded, setRequestsLoaded] = useState(false);
  const [chartsLoaded, setChartsLoaded] = useState(false);
  const [showChartModal, setShowChartModal] = useState(false);
  const [chartModalUrl, setChartModalUrl] = useState('');

  async function getRequests() {
    const q = query(collection(db, "requests"));
    const querySnapshot = await getDocs(q);
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push(doc.data());
    });
    console.log(items)
    setRequests(items);
    setLoading(false);
  }

  async function getCharts() {
    const q = query(collection(db, "charts"));
    const querySnapshot = await getDocs(q);
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push(doc.data());
    });
    console.log(items)
    setCharts(items);
  }

  const handleAddCharts = () => {
    const updatedRequests = requests.map(request => {
      const chart = charts.find(c => c.title === request.title);
      return { ...request, chartUrl: chart ? chart.url : "" };
    });
  
    setRequests(updatedRequests);
  };

  const handleSetChartModal = (url) => {
    setChartModalUrl(url);
    setShowChartModal(true);
  }

  const handleCompleteRequest = async (request) => {
    // Assuming each request has a unique ID stored in it, typically from Firestore when fetched
    const requestRef = doc(db, "requests", request.id);
  
    try {
      // Update the 'complete' field of the document in Firestore
      await updateDoc(requestRef, {
        complete: true
      });
  
      setRequests(prevRequests => prevRequests.map(r => 
        r.id === request.id ? { ...r, complete: true } : r
      ));
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };


  useEffect(() => {
    getRequests().then(() => setRequestsLoaded(true));
    getCharts().then(() => setChartsLoaded(true));
  }, []);

  useEffect(() => {
    if (requestsLoaded && chartsLoaded) {
      handleAddCharts();
    }
  }, [requestsLoaded, chartsLoaded]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="mt-5 dashboard-page">
      <h1 className="mb-5">Dashboard</h1>
      {requests.map((request, index) => (
        <div key={index} className="request-card-container">
          <div className="song-info-container">
            <div className="info-item title">
              <h3>{request.title}</h3>
            </div>
            <div className="info-item">
              <b>Band: </b>
              <p>{request.band}</p>
            </div>
            <div className="info-item">
              <b>Name: </b>
              <p>{request.name}</p>
            </div>
            <div className="info-item">
              <b>Tip Amount: </b>
              <p>{request.tip ? request.tipAmount : 'No Tip Submitted :('}</p>
            </div>
            <div className="info-item">
              <b>Message:</b>
              <p>{request.message}</p>
            </div>
          </div>
          <div className="song-actions-container">
          {request.chartUrl != '' ? (
            <div className="info-item">
              <div className="btn-chart" onClick={() => handleSetChartModal(request.chartUrl)}>
                <FaMusic color='white'/>
              </div>
            </div>
            ) : null}

            {request.complete ? (
            <div className="info-item">
              <div className="btn-done">
                <b>Done</b>
              </div>
            </div>
            ) : 
            <div className="btn-complete" onClick={()=> handleCompleteRequest(request)}>
              <FaCheck color="white"/>
            </div>
            }
          </div>
        </div>
      ))}
      <div className={`chart-modal ${showChartModal ? 'd-block' : 'd-none'}`}>
        <button className="btn-close" onClick={() => setShowChartModal(false)}></button>
        <img src={chartModalUrl} alt="chart" />
      </div>
    </div>
    
  );
};

export default Dashboard;
