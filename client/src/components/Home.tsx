import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TrackSearch from '../components/TrackSearch';
import axios from 'axios';
import HistoryList from './historyList';

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
  const modalRef = useRef<HTMLDivElement>(null); // Added useRef for modal


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


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowSearchModal(false);
      }
    };

    if (showSearchModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearchModal]);


  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Discover Your Sound</h1>
      {/* Search Bar Functionality */}
      <p
        onClick={() => setShowSearchModal(true)}
        className="cursor-pointer text-blue-500 hover:text-blue-400 mb-8"
      >
        Search for a song, artist, or album
      </p>

      {showSearchModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          {" "}
          {/* Added z-50 */}
          <div ref={modalRef} className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <TrackSearch onClose={() => setShowSearchModal(false)} />
          </div>
        </div>
      )}

      {user && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">User Info</h2>
          <p className="text-lg">Username: {user.username}</p>
          <p className="text-lg">Email: {user.email}</p>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">Your Review History</h2>
      <HistoryList />
    </div>
  );
};

export default Home;