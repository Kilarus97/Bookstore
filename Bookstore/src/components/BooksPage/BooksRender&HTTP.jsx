import React, { useState, useEffect } from "react";
import BooksTable from "./Books.jsx";
import * as crudService from "../../service/crudService.js";

export default function BooksPage() {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [sortType, setSortType] = useState("TitleAsc");

    useEffect(() => {
    crudService.getSortedBookDetails(sortType)
        .then(res => setBooks(res.$values || []))
        .catch(err => console.error("Greška pri učitavanju knjiga:", err));
    }, [sortType]);

    const deleteBooks = async (id) => {
        try {
            await crudService.deleteBook(id);
            fetchBooks();
        } catch (error) {
            setError(`Greška pri brisanju knjige: ${error}`);
            console.error(error);
        }
    };



    return (
        <div>
            <h2>Knjige koje su trenutno u ponudi</h2>
            <label htmlFor="bookSort">Sortiraj po:</label>
            <select 
            className = "bookSort" 
            value={sortType} 
            onChange={e => setSortType(e.target.value)}
            style={{ marginLeft: "0.5rem", marginBottom: "1rem" }}>
                <option value="TitleAsc">Naziv (rastuće)</option>
                <option value="TitleDesc">Naziv (opadajuće)</option>
                <option value="PublishDateAsc">Datum izdavanja (rastuće)</option>
                <option value="PublishDateDesc">Datum izdavanja (opadajuće)</option>
                <option value="AuthorNameAsc">Autor (rastuće)</option>
                <option value="AuthorNameDesc">Autor (opadajuće)</option>
            </select>
            {error && <p className="error">{error}</p>}
            <BooksTable books={books} onDelete={deleteBooks} />
        </div>
    );
}