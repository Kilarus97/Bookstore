import React, { useState } from "react";
import { createLocalIssue } from "../../service/comic.services.jsx";
import "../../styles/comics.scss";

export default function SaveIssueForm({ issue, onClose }) {
  const [price, setPrice] = useState("");
  const [availableCopies, setAvailableCopies] = useState("");

  const saveIssue = async () => {
    const dto = {
      externalId: issue.id,   // preuzet iz API-ja
      volumeId: issue.volume.id, 
      price,
      availableCopies
    };

    const res = await createLocalIssue(dto);
    alert("Izdanje sačuvano!");
    onClose();
  };

  return (
    <div>
      <h3>Sačuvaj izdanje: {issue.name}</h3>
      <label>Cena:</label>
      <input value={price} onChange={e => setPrice(e.target.value)} />
      <label>Broj primeraka:</label>
      <input value={availableCopies} onChange={e => setAvailableCopies(e.target.value)} />
      <button onClick={saveIssue}>Sačuvaj</button>
      <button onClick={onClose}>Otkaži</button>
    </div>
  );
}
