import React,{ useState,useContext } from "react";
import "../../styles/review.scss";
import * as reviewService from "../../service/review.services.jsx";
import { AuthContext } from "../../AuthContext.jsx";

function ReviewModal({ book, onClose }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  
    const payload = {
    username: user.username,
    bookId: book.id,
    rating: rating,
    comment: comment
  };

  const handleSubmit = async () => {
    setError("");
    const response = reviewService.addReview(payload);

    if (response.ok) {
      onClose(); // zatvori modal
    } else {
      const msg = response;
      setError(msg || "Greška prilikom slanja.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Recenzija za: {book.title}</h3>

        <label>Ocena:</label>
        <select value={rating} onChange={e => setRating(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>

        <br />

        <label>Komentar:</label>
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          rows={4}
          cols={40}
          placeholder="Opcioni komentar..."
        />

        <br />

        <button onClick={handleSubmit}>Pošalji</button>
        <button onClick={onClose}>Otkaži</button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default ReviewModal;
