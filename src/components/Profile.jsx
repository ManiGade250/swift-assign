import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => setUser(data[1])); // Ervin Howell is user 2 (index 1)
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <button className="back-button" onClick={() => navigate('/')}>← Welcome, {user.name}</button>
        <div className="card">
          <div className="avatar">EH</div>
          <div className="userinfo">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
          <div className="details">
            <div className="field">
              <label>User ID</label>
              <input value={user.id} disabled />
            </div>
            <div className="field">
              <label>Name</label>
              <input value={user.name} disabled />
            </div>
            <div className="field">
              <label>Email ID</label>
              <input value={user.email} disabled />
            </div>
            <div className="field">
              <label>Address</label>
              <input value={`${user.address.street}, ${user.address.city}`} disabled />
            </div>
            <div className="field">
              <label>Phone</label>
              <input value={user.phone} disabled />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
