import { type FormEvent, useState, useEffect } from 'react';
import { Track } from '../interfaces/Track';
import { searchForTrackAPI } from '../spotify/Api';
import { useNavigate } from 'react-router-dom'; // Use for routing

const CLIENT_ID = "b2d05a20bd4941eb9dbb80d3244de974";
const CLIENT_SECRET = "3abe7e0378a94c2285d4c8a70fda61eb";

interface TrackSearchProps {
  onClose: () => void;
}

// Track Search Page
function TrackSearch({ onClose }: TrackSearchProps) {
  const [searchInput, setSearchInput] = useState<string>(''); // search input
  const [accessToken, setAccessToken] = useState<string>(''); // Spotify access token
  const [tracks, setTracks] = useState<Track[]>([]); // search results array

  const navigate = useNavigate(); // To navigate to the review page

  // Fetch Spotify API token
  useEffect(() => {
    const authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }).toString(),
    };

    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
      .catch(error => console.error('Error fetching the token:', error));
  }, []);

  const searchForTrack = async (event: FormEvent) => {
    event.preventDefault();
    const trackList = await searchForTrackAPI(accessToken, searchInput);
    if (trackList) {
      setTracks(trackList);
    }
  };

  // Handle track selection and navigate to review page
  const handleTrackSelection = (track: Track) => {
    navigate(`/review/${track.id}`, { state: { track } });
    onClose();
  };

  return (
    <div className="App">
      <form onSubmit={(event) => searchForTrack(event)}>
        <input
          type="text"
          value={searchInput}
          placeholder="Enter a track name"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {tracks.length > 0 && (
        <div>
          <h3>Search Results</h3>
          <ul>
            {tracks.map((track, index) => (
              <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <img
                  src={track.albumImageUrl}
                  alt={`${track.albumName} cover`}
                  style={{ width: '50px', height: '50px', marginRight: '10px' }}
                />
                <button onClick={() => handleTrackSelection(track)}>
                  {track.trackName} - {track.albumName} by {track.artistName}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TrackSearch;
