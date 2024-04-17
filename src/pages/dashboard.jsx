import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import db from "../firebase";
import { FaCheck, FaTrash } from 'react-icons/fa';

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    getRequests();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="mt-5">
      <h1 className="mb-5">Dashboard</h1>
      {requests.map((request, index) => (
        <div key={index} className="request-card-container">
          <div className="song-info-container">
            <div className="info-item title">
              <h3>{request.title}</h3>
            </div>
            <div className="info-item">
              <b>Band:</b>
              <p>{request.band}</p>
            </div>
            <div className="info-item">
              <b>Tip Amount:</b>
              <p>{request.tip ? request.tipAmount : 'No Tip Submitted :('}</p>
            </div>
            <div className="info-item">
              <b>Message:</b>
              <p>{request.message}</p>
            </div>
          </div>
          <div className="song-actions-container">
            <div className="btn-complete">
              <FaCheck color="white"/>
            </div>
            {/* <div className="btn-done">
              <b>Done</b>
            </div> */}
            <div className="btn-archive">
              <FaTrash color='white'/>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
