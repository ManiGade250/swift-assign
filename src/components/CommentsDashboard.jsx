import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './Dashboard.css';

function CommentsDashboard() {
  const [comments, setComments] = useState([]);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState('none');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, []);

  const handleSort = (key) => {
    if (sortKey === key) {
      const nextOrder = sortOrder === 'none' ? 'asc' : sortOrder === 'asc' ? 'desc' : 'none';
      setSortOrder(nextOrder);
      if (nextOrder === 'none') setSortKey('');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const filtered = comments.filter((comment) => {
    const value = `${comment.name} ${comment.email} ${comment.body}`.toLowerCase();
    return value.includes(search.toLowerCase());
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === 'none' || !sortKey) return 0;

    const valA = a[sortKey];
    const valB = b[sortKey];

    if (typeof valA === 'string' && typeof valB === 'string') {
      return sortOrder === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    } else {
      return sortOrder === 'asc'
        ? valA - valB
        : valB - valA;
    }
  });

  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <div className="controls">
          <button onClick={() => handleSort('postId')}>Sort Post ID</button>
          <button onClick={() => handleSort('name')}>Sort Name</button>
          <button onClick={() => handleSort('email')}>Sort Email</button>
          <input
            type="text"
            placeholder="Search name, email, comment"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>Post ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((c) => (
              <tr key={c.id}>
                <td>{c.postId}</td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.body}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <span>Page: </span>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? 'active' : ''}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
            <option value={10}>10 / Page</option>
            <option value={50}>50 / Page</option>
            <option value={100}>100 / Page</option>
          </select>
        </div>

        <button className="goto-profile" onClick={() => navigate('/profile')}>
          View Profile
        </button>
      </div>
    </div>
  );
}

export default CommentsDashboard;