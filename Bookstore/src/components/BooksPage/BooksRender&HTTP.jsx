import React, { useState,useEffect } from "react";
import BooksTable from "./Books.jsx";
import * as crudService from "../../service/crudService.js"


export default function BooksPage() {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);

    const deleteBooks = async (id) => {
        try {
         await crudService.deleteBook(id)
         fetchBooks()
        } catch (error) {
            setError(`Greška pri dobavljanju knjiga : ${err}`);
            console.error(error);
        }
    }

    const fetchBooks = async () => {
        try {
          const response = await crudService.getAllBooks();
          console.log(response)
          setBooks(response);
        } catch (err) {
          setError(`Greška pri dobavljanju knjiga : ${err}`);
          console.error(error);
        }
      };

      useEffect(() => {
        fetchBooks();
      }, []);


      return (
        <div>
        <h2>Knjige koje su trenutno u ponudi</h2>
    
        <BooksTable
            books={books}
            onDelete={deleteBooks}
        />
    
        
    </div>
    );
}