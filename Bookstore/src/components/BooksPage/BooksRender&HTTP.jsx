import React, { useState, useEffect } from "react";
import BooksTable from "./Books.jsx";
import * as crudService from "../../service/crudService.js";

export default function BooksPage() {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [sortType, setSortType] = useState("TitleAsc");
    const [title, setTitle] = useState("");
    const [publishedFrom, setPublishedFrom] = useState("");
    const [publishedTo, setPublishedTo] = useState("");
    const [authorId, setAuthorId] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [bornFrom, setBornFrom] = useState("");
    const [bornTo, setBornTo] = useState("");
    const [authors, setAuthors] = useState([]);
    const [refresh, setRefresh] = useState(0);


    useEffect(() => {
        crudService.getSortedBookDetails(sortType)
          .then(res => setBooks(res.$values || []))
          .catch(err => console.error("Greška pri učitavanju knjiga:", err));
      }, [sortType,refresh]);
      

    useEffect(() => {
        crudService.getAllAuthors()
          .then(res => setAuthors(res.$values || []))
          .catch(err => console.error("Greška pri učitavanju autora:", err));
      }, []);
      

      const handleSearch = (e) => {
        e.preventDefault();
      
        const payload = {
            titleContains: title || null,
            publishedFrom: publishedFrom ? new Date(publishedFrom).toISOString() : null,
            publishedTo: publishedTo ? new Date(publishedTo).toISOString() : null,
            authorId: authorId ? parseInt(authorId) : null,
            authorNameContains: authorName || null,
            authorBornFrom: bornFrom ? new Date(bornFrom).toISOString() : null,
            authorBornTo: bornTo ? new Date(bornTo).toISOString() : null,
            sortType: sortType || "TitleAsc"
          };
          
      
        crudService.searchBooks(payload)
          .then(res => setBooks(res.$values || []))
          .catch(err => console.error("Greška pri pretrazi:", err));
      };
      

    const deleteBooks = async (id) => {
        try {
            await crudService.deleteBook(id);
            fetchBooks();
        } catch (error) {
            setError(`Greška pri brisanju knjige: ${error}`);
            console.error(error);
        }
    };

    const resetFilters = () => {
        setTitle("");
        setPublishedFrom("");
        setPublishedTo("");
        setAuthorId("");
        setAuthorName("");
        setBornFrom("");
        setBornTo("");
        setSortType("TitleAsc");
      
        crudService.getSortedBookDetails("TitleAsc")
          .then(res => setBooks(res.$values || []))
          .catch(err => console.error("Greška pri resetovanju:", err));
      };
      



    return (
        <div>

            <form onSubmit={handleSearch} className="book-search-form">
            <fieldset>
                <legend>Filteri</legend>
                <div className="form-grid">
                <label>
                    Naziv knjige:
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                </label>

                <label>
                    Datum izdavanja (od):
                    <input type="date" value={publishedFrom} onChange={e => setPublishedFrom(e.target.value)} />
                </label>

                <label>
                    Datum izdavanja (do):
                    <input type="date" value={publishedTo} onChange={e => setPublishedTo(e.target.value)} />
                </label>

                <label>
                    Autor:
                    <select value={authorId} onChange={e => setAuthorId(e.target.value)}>
                    <option value="">-- Izaberi autora --</option>
                    {authors.map(a => <option key={a.id} value={a.id}>{a.fullName}</option>)}
                    </select>
                </label>

                <label>
                    Ime autora:
                    <input type="text" value={authorName} onChange={e => setAuthorName(e.target.value)} />
                </label>

                <label>
                    Datum rođenja autora (od):
                    <input type="date" value={bornFrom} onChange={e => setBornFrom(e.target.value)} />
                </label>

                <label>
                    Datum rođenja autora (do):
                    <input type="date" value={bornTo} onChange={e => setBornTo(e.target.value)} />
                </label>

                <label>
                    Sortiraj po:
                    <select value={sortType} onChange={e => setSortType(e.target.value)}>
                    <option value="TitleAsc">Naziv (rastuće)</option>
                    <option value="TitleDesc">Naziv (opadajuće)</option>
                    <option value="PublishDateAsc">Datum izdavanja (rastuće)</option>
                    <option value="PublishDateDesc">Datum izdavanja (opadajuće)</option>
                    <option value="AuthorNameAsc">Autor (rastuće)</option>
                    <option value="AuthorNameDesc">Autor (opadajuće)</option>
                    </select>
                </label>
                </div>
            </fieldset>

            <div className="form-actions">
                <button type="submit">Pretraži</button>
                <button type="button" onClick={resetFilters}>Resetuj</button>
            </div>
            </form>


            <h2>Knjige koje su trenutno u ponudi</h2>
            {error && <p className="error">{error}</p>}
            <BooksTable
            books={books}
            onDelete={deleteBooks}
            triggerRefresh={() => setRefresh(prev => prev + 1)}
            />
        </div>
    );
}