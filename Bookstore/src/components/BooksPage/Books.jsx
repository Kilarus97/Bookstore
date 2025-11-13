import React, { useContext, useState } from "react";
import "../../styles/main.scss";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext.jsx";
import ReviewModal from "../ReviewPage/ReviewForm.jsx";
import * as reviewService from "../../service/review.services.jsx";

const BooksTable = ({ books, onDelete, triggerRefresh }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const isEditor = user && user.role === "Editor";

  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedBookReviews, setSelectedBookReviews] = useState([]);
  const [reviewedBookTitle, setReviewedBookTitle] = useState("");

  const loadReviews = async (book) => {
    try {
      const data = await reviewService.getReviewsByBookId(book.id);
      setSelectedBookReviews(Array.isArray(data) ? data : []);
      setReviewedBookTitle(book.title);
    } catch (err) {
      console.error("Greška pri učitavanju recenzija:", err);
    }
  };

  return (
    <>
      <table className="books-table">
        <thead>
          <tr>
            <th>Naslov</th>
            <th>Broj strana</th>
            <th>Datum objavljivanja</th>
            <th>ISBN</th>
            <th>Autor</th>
            <th>Izdavač</th>
            <th>Web sajt</th>
            <th>Recenzija</th>
            {isEditor && (
              <>
                <th>Izbriši</th>
                <th>Izmeni</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.pageCount}</td>
              <td>{new Date(book.publishedDate).toLocaleDateString()}</td>
              <td>{book.isbn}</td>
              <td>{book.authorFullName}</td>
              <td>{book.publisherName}</td>
              <td>
                <a href={book.website} target="_blank" rel="noopener noreferrer">
                  {book.website}
                </a>
              </td>
              <td>
                <button onClick={() => setSelectedBook(book)}>Oceni</button>
                <button
                  onClick={() => loadReviews(book)}
                  style={{ marginLeft: "0.5rem" }}
                >
                  Prikaži recenzije
                </button>
              </td>
              {isEditor && (
                <>
                  <td>
                    <button onClick={() => onDelete(book.id)}>Izbriši</button>
                  </td>
                  <td>
                    <button onClick={() => navigate(`/edit-book/${book.id}`)}>Izmeni</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedBookReviews.length > 0 && (
        <div className="reviews-section">
          <h3>Recenzije za: {reviewedBookTitle}</h3>
           {/* Prosečna ocena */}
            <p>
              <strong>Prosečna ocena:</strong>{" "}
              {(
                selectedBookReviews.reduce((sum, r) => sum + r.rating, 0) /
                selectedBookReviews.length
              ).toFixed(2)}{" "}
              ★
            </p>
          <ul>
            {selectedBookReviews.map((r) => (
              <li key={r.id}>
                <strong>Ocena:</strong> {r.rating} ★<br />
                <strong>Komentar:</strong> {r.comment || "Bez komentara"}<br />
                <strong>Korisnik:</strong> {r.username || "Nepoznat"}<br />
                <strong>Datum:</strong> {new Date(r.createdAt).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedBook && (
        <ReviewModal
          book={selectedBook}
          onClose={() => {
            setSelectedBook(null);
            if (triggerRefresh) triggerRefresh();
          }}
        />
      )}
    </>
  );
};

export default BooksTable;
