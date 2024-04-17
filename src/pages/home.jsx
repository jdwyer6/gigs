import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <div>
        <div className="mb-2">
          <div className="mb-10 d-flex"> 
            <div className="p-2">
              <Link to="/request">
                  <Button variant="primary" size="lg">
                    Request
                  </Button>
              </Link>
            </div>
            <div className="p-2">
              <Link to="/dashboard">
                <Button variant="secondary" size="lg">
                    Dashboard
                  </Button>
              </Link>

            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Home;
