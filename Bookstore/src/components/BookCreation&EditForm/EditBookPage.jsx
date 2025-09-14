import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ContactHookForm from "./BookForm.jsx";
import * as crudService from '../../service/crudService.js';


export default function EditBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await crudService.getBookById(id);
        setBookData(response);
      } catch (err) {
        console.error("Greška pri dobavljanju filma:", err);
      }
    };

    fetchBook();
  }, [id]);

  const handleUpdate = async (updatedBook) => {
    try {
      await crudService.updateBook(id,updatedBook)
      navigate("/books");
    } catch (err) {
      const serverMessage = err.response?.data?.message || "Greška na serveru.";
      alert(`Izmena nije uspela: ${serverMessage}`);
    }
  };

  if (!bookData) return <p>Učitavanje...</p>;

  return (
    <div>
      <h2>Izmeni film</h2>
      <ContactHookForm
        initialData={bookData}
        onSubmitBook ={handleUpdate}
        onCancel={() => navigate("/books")}
      />
    </div>
  );
}
