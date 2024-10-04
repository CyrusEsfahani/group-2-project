import { useState } from 'react';
import { Track } from '../interfaces/Track';
import { Review } from '../interfaces/Review';

// Interface for ReviewModal props
interface ReviewModalProps {
  selectedTrack: Track;
  onClose: () => void; // When the module closes
  onSubmitReview: (review: Review) => void; // When the user submits, returns a review object
  userId: string;
}

// Review Modal component
function ReviewModal({ selectedTrack, onClose, onSubmitReview, userId }: ReviewModalProps) {
  const [rating, setRating] = useState<number>(1);
  const [comment, setComment] = useState<string>("");

  const handleSubmit = () => {
    if (selectedTrack) {
      const review: Review = {
        userId: userId,
        songId: selectedTrack.id,
        rating: rating,
        comment: comment,
      };
      onSubmitReview(review);
      onClose();
    }
  };

  return (
    <div style={{ display: selectedTrack ? 'block' : 'none', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', padding: '20px', borderRadius: '10px', zIndex: 1000, color: 'black'}}>
      <h3>Review</h3>
      <div>
          <p>{selectedTrack.trackName} - {selectedTrack.albumName} by {selectedTrack.artistName}</p>
          <img src={selectedTrack.albumImageUrl} alt={`${selectedTrack.albumName} cover`} width="50" height="50" />
        </div>
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
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleSubmit}>Submit Review</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default ReviewModal;
