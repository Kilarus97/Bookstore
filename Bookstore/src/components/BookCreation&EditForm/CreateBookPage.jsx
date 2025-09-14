import React from "react";
import * as crudService from '../../service/crudService.js';
import ContactHookForm from "./BookForm.jsx";
import { useNavigate } from "react-router-dom";

export default function CreateBookPage({ onAddMovie }) {
    const navigate = useNavigate();

    const handleCreate = async (book) => {
      try {
        await crudService.createBook(book);
        navigate("/books");
      } catch (err) {
        const serverMessage = err.response?.data?.message || "Dodavanje nije uspelo.";
        alert(serverMessage);
      }
    };
    
  return (
    <div>
      <h2>Dodaj novu knjigu</h2>
      <ContactHookForm
        onSubmitBook={(book) => {
            console.log("Šaljem ka serveru:", book);
            handleCreate(book);
        }}
        onCancel={() => navigate("/books")}
      />
    </div>
  );
}
