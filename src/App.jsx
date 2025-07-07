import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CommentsDashboard from './components/CommentsDashboard';
import Profile from './components/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CommentsDashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
