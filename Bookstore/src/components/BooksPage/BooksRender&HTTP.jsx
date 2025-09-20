import React, { useState, useEffect } from "react";
import BooksTable from "./Books.jsx";
import * as crudService from "../../service/crudService.js";

export default function BooksPage() {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);

    const deleteBooks = async (id) => {
        try {
            await crudService.deleteBook(id);
            fetchBooks();
        } catch (error) {
            setError(`Greška pri brisanju knjige: ${error}`);
            console.error(error);
        }
    };

    const fetchBooks = async () => {
        try {
            const response = await crudService.getAllBooks();
            console.log(response);

            
            const books = response.$values.map((book) => {
                
                if (book.author && book.author.$ref) {
                    book.author = response.$values.find((item) => item.$id === book.author.$ref);
                }

                
                if (book.publisher && book.publisher.$ref) {
                    book.publisher = response.$values.find((item) => item.$id === book.publisher.$ref);
                }

                return book;
            });

            setBooks(books); 
        } catch (err) {
            setError(`Greška pri dobavljanju knjiga: ${err}`);
            console.error(err);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div>
            <h2>Knjige koje su trenutno u ponudi</h2>
            {error && <p className="error">{error}</p>}
            <BooksTable books={books} onDelete={deleteBooks} />
        </div>
    );
}