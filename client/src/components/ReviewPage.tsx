import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Review } from '../interfaces/Review';

const ReviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { track } = location.state; // Get the selected track from the TrackSearch component

  const [rating, setRating] = useState<number>(1);
  const [comment, setComment] = useState<string>('');

  const handleSubmit = () => {
    const review: Review = {
      userId: 'user123', // Placeholder, use actual logic for userId
      songId: track.id,
      rating: rating,
      comment: comment,
    };
    console.log("Review userId: " + review.userId);
    console.log("Review songId: " + review.songId);
    console.log("Review rating: " + review.rating);
    console.log("Review comment: " + review.comment);
    console.log("");
    console.log("Song id: " + track.id);
    console.log("Song trackName: " + track.trackName);
    console.log("Song albumName: " + track.albumName);
    console.log("Song artistName: " + track.artistName);
    console.log("Song playerUri: " + track.playerUri);
    console.log("Song albumImageUrl: " + track.albumImageUrl);
    // Handle storing the review, e.g., update state or API call
    navigate('/'); // Redirect back to home after submitting
  };

  const handleCancel = () => {
    navigate('/'); // Redirect back to home if review is canceled
  };

  return (
    <div>
      <h3>Review {track.trackName} - {track.albumName}</h3>
      <img src={track.albumImageUrl} alt={track.albumName} width="50" height="50" />
      <label>
        Rating (1-10):
        <input
          type="number"
          min="1"
          max="10"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
        />
      </label>
      <br />
      <label>
        Comment:
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      </label>
      <br />
      <button onClick={handleSubmit}>Submit Review</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default ReviewPage;
