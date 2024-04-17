// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import db from "../firebase"; // Make sure this path is correct

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
    <div>
      <h1>Dashboard</h1>
      {requests.map((request, index) => (
        <div key={index}>
          <h2>{request.title}</h2>
          <p>{request.band}</p>
          <p>{request.name}</p>
          <p>{request.message}</p>
          <div><span>Tip: </span><span>{request.tip ? 'Yes' : 'No'}</span></div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
