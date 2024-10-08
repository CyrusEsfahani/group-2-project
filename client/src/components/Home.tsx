import React, { useState, useEffect, useRef } from 'react';
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"> {/* Added z-50 */}
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
      <h2 className="text-2xl font-bold mb-4">Recent Reviews</h2>
      <div className="flex flex-wrap justify-center gap-6 mx-auto">
        {/* Card Container */}
        <div className="relative bg-white border border-gray-200 rounded-lg shadow max-w-2xl w-full p-6 dark:border-gray-700 dark:bg-gray-800">

          {/* Image and Track Info Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <img
              className="object-cover w-full rounded-lg h-32 md:h-auto md:w-32 rounded-lg"
              src="https://via.placeholder.com/150"  // Replace with actual album image URL
              alt="Album Name"
            />

            <div className="flex flex-col justify-between p-4 leading-normal">
              <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Track Name
              </h3>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                <strong>Artist</strong>: Artist Name<br />
                <strong>Album</strong>: Album Name<br />
                <strong>User ID</strong>: user123
              </p>
            </div>
          </div>

          {/* Star Rating Section (moved to top-right corner) */}
          <div className="absolute top-4 right-4 flex items-center pr-2 pt-1">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-6 h-6 ${index < 4 ? 'text-yellow-300' : 'text-gray-300'}`}  // Example: 4-star rating
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
            <span className="ms-2 text-sm font-medium dark:text-white">4 / 5</span> {/* Static rating */}
          </div>

          {/* Comment Section */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Comment:
            </label>
            <p className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
              This is a static comment for the track.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;