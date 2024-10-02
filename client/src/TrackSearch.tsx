import { type FormEvent, useState, useEffect } from 'react';

// client details for .env
const CLIENT_ID = "b2d05a20bd4941eb9dbb80d3244de974";
const CLIENT_SECRET = "3abe7e0378a94c2285d4c8a70fda61eb";

// interface for the track object for interface file
interface Track {
  id: string;
  trackName: string;
  albumName: string;
  artistName: string;
  playerUri: string;
  albumImageUrl: string;
}

// search for 5 tracks from the spotify API and returns an array of 5 track objects for API file
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

function TrackSearch() {
  const [searchInput, setSearchInput] = useState<string>(''); // search input
  const [accessToken, setAccessToken] = useState<string>(''); // Spotify access token
  const [tracks, setTracks] = useState<Track[]>([]); // search results array
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null); // user's selection

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

  // Handling for when the users selects a track from the search results (This is where future stuff will happen)
  const handleTrackSelection = async (trackPick: Track) => {
    const track = tracks.find((t) => t === trackPick);
    if (track) setSelectedTrack(track); // For now, the user's selection is just displayed
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

      {/* Display Selected Track */}
      {selectedTrack && (
        <div>
          <h3>Now Playing:</h3>
          <p>{selectedTrack.trackName} - {selectedTrack.albumName} by {selectedTrack.artistName}</p>
          <img src={selectedTrack.albumImageUrl} alt={`${selectedTrack.albumName} cover`} width="50" height="50" />
          {/* Commented Out Audio Player (I know we are gonna use it later, I just dont want to lose the code for now) */}
          {/*<iframe
            src={`https://open.spotify.com/embed/track/${selectedTrack.playerUri.split(':')[2]}`}
            width="300"
            height="80"
            frameBorder="0"
            allowTransparency={true}
            allow="encrypted-media"
            title="Spotify Player"
          ></iframe>*/}
        </div>
      )}
    </div>
  );
}

export default TrackSearch;