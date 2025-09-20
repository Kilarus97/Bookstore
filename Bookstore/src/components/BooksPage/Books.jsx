import React from "react";
import "../../styles/main.scss";
import { useNavigate } from "react-router-dom";

const BooksTable = ({ books, onDelete }) => {
  const navigate = useNavigate();

  return (
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
          <th>Akcije</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.pageCount}</td>
            <td>{new Date(book.publishedDate).toLocaleDateString()}</td>
            <td>{book.isbn}</td>
            <td>{book.author}</td>
            <td>{book.publisher}</td>
            <td>
              <a href={book.website} target="_blank" rel="noopener noreferrer">
                {book.website}
              </a>
            </td>
            <td>
              <button onClick={() => onDelete(book.id)}>Izbriši</button>
            </td>
            <td>
              <button onClick={() => navigate(`/edit-book/${book.id}`)}>Izmeni</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;