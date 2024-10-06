import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TrackSearch from '../components/TrackSearch';
import axios from 'axios';

interface User {
  username: string;
  email: string;
}

interface Review {
  id: number;
  songTitle: string;
  reviewText: string;
  songLink: string;
}

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user info
    axios.get('/api/user')
      .then(response => setUser(response.data))
      .catch(error => console.error('Error fetching user info:', error));

    // Fetch user reviews
    axios.get('/api/reviews')
      .then(response => setReviews(response.data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, []);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {/* Search Bar Functionality */}
      <p onClick={() => setShowSearchModal(true)} style={{ cursor: 'pointer', color: 'blue' }}>
        Search Bar
      </p>

      {showSearchModal && (
        <div>
          <TrackSearch onClose={() => setShowSearchModal(false)} />
        </div>
      )}

      {user && (
        <div>
          <h2>User Info</h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
      <h2>Recent Reviews</h2>
      <table>
        <thead>
          <tr>
            <th>Song Title</th>
            <th>Review</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(review => (
            <tr key={review.id}>
              <td>{review.songTitle}</td>
              <td>{review.reviewText}</td>
              <td>
                <a href={review.songLink} target="_blank" rel="noopener noreferrer">
                  Listen
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;