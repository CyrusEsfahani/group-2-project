import { type FormEvent, useState, useEffect } from 'react';
import { Track } from './interfaces/Track';
import { Review } from './interfaces/Review';
import ReviewModal from './components/ReviewModal';
//import AuthService from './utils/auth';
import  getLyrics  from './genius/getLyrics'

// client details for .env for the spotify api
const CLIENT_ID = "b2d05a20bd4941eb9dbb80d3244de974";
const CLIENT_SECRET = "3abe7e0378a94c2285d4c8a70fda61eb";


// searches for 5 tracks according to the search query and returns them as an array of Track objects
const searchForTrackAPI = async (accessToken: string, searchInput: string) => {
  const trackParameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken,
    },
  };
  
  const trackData = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=track`, trackParameters)
    .then(response => response.json())
    .then(data => data.tracks.items.slice(0, 5))
    .catch(error => console.error('Error fetching tracks:', error));

  if (trackData) {
    const trackList: Track[] = trackData.map((track: any) => ({
      id: track.id,
      trackName: track.name,
      albumName: track.album.name,
      artistName: track.artists.map((artist: any) => artist.name).join(', '),
      playerUri: track.uri,
      albumImageUrl: track.album.images[0].url,
    }));

    return trackList;
  } else {
    console.log('No tracks found');
  }
};

// Track Search Page
function TrackSearch() {
  const [searchInput, setSearchInput] = useState<string>(''); // search input
  const [accessToken, setAccessToken] = useState<string>(''); // Spotify access token
  const [tracks, setTracks] = useState<Track[]>([]); // search results array
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null); // user's selection
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false); // modal visibility
  const [reviews, setReviews] = useState<Review[]>([]); // store reviews
  // Added by mehdi
  const [lyrics, setLyrics] = useState<string | null>(null); // store lyrics


  // Placeholder userId, replace this with actual userId logic
  const userId = 'user123';

  // Generates Spotify API Key when search page opens
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

  // Calls the searchForTrackAPI function and sets the search results
  const searchForTrack = async (event: FormEvent) => {
    event.preventDefault();
    const trackList = await searchForTrackAPI(accessToken, searchInput);
    if (trackList) {
      setTracks(trackList);
    }
  };

  // Handling for when the user selects a track from the search results
  const handleTrackSelection = async (trackPick: Track) => {
    const track = tracks.find((t) => t === trackPick);
    if (track) {
      setSelectedTrack(track); // Displays selected track (Testing Reasons)
      setShowReviewModal(true); // Shows modal when track is selected

      // Call for Genius API to get lyrics
      // try {
      //   if (trackPick.trackName && trackPick.artistName) {
      //     console.log(
      //       "Fetching lyrics for:",
      //       trackPick.trackName,
      //       trackPick.artistName
      //     );
      //     // const fetchedLyrics = await getLyrics({
      //     //   // apiKey: GENIUS_API_KEY, // Use your Genius API key here
      //     //   title: trackPick.trackName,
      //     //   artist: trackPick.artistName,
      //     // });
      //     // setLyrics(fetchedLyrics);
      //   } else {
      //     console.error("Track data is incomplete for lyrics fetching.");
      //   }
      // } catch (error) {
      //   console.error("Error fetching lyrics:", error);
      // }
    }
  };

  // Handles review submission
  const handleReviewSubmit = (review: Review) => {
    setReviews([...reviews, review]); // Stores the submitted review
    setShowReviewModal(false); // Closes modal after submission
  };

  return (
    <div className="App">
      {/* Search Bar */}
      <form onSubmit={(event) => searchForTrack(event)}>
        <input
          type="text"
          value={searchInput}
          placeholder="Enter a track name"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Search Results (Right now they are set up as buttons) */}
      {tracks.length > 0 && (
        <div>
          <h3>Search Results</h3>
          <ul>
            {tracks.map((track, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <img
                  src={track.albumImageUrl}
                  alt={`${track.albumName} cover`}
                  style={{ width: "50px", height: "50px", marginRight: "10px" }}
                />
                <button onClick={() => handleTrackSelection(track)}>
                  {track.trackName} - {track.albumName} by {track.artistName}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display Selected Track */}
      {/* Display Selected Track and Lyrics */}
      {selectedTrack && (
        <div>
          <h3>Now Playing:</h3>
          <p>
            {selectedTrack.trackName} - {selectedTrack.albumName} by{" "}
            {selectedTrack.artistName}
          </p>
          <img
            src={selectedTrack.albumImageUrl}
            alt={`${selectedTrack.albumName} cover`}
            width="50"
            height="50"
          />
          {/* Display Lyrics */}
          {lyrics ? (
            <div>
              <h4>Lyrics:</h4>
              <p>{lyrics}</p>
            </div>
          ): (
            <p>No lyrics found</p>
          )
        }
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && selectedTrack && (
        <ReviewModal
          selectedTrack={selectedTrack}
          onClose={() => setShowReviewModal(false)}
          onSubmitReview={handleReviewSubmit}
          userId={userId}
        />
      )}

      {/* Displays All User Reviews (Testing)*/}
      {reviews.length > 0 && (
        <div>
          <h3>All Reviews:</h3>
          <ul>
            {reviews.map((review, index) => (
              <li key={index}>
                <p>Song ID: {review.songId}</p>
                <p>Rating: {review.rating}/10</p>
                <p>Comment: {review.comment}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TrackSearch;


