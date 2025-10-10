import React, { useState, useEffect } from "react";
import PublisherTable from "./Publishers.jsx";
import * as crudService from "../../service/crudService.js";

export default function PublishersPage() {
  const [publishers, setPublishers] = useState([]);
  const [sortType, setSortType] = useState("NameAsc");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPublishers = async () => {
    setLoading(true);
    try {
      const response = await crudService.getSortedPublishers(sortType);
      setPublishers(response.$values || []);
    } catch (err) {
      setError("Greška pri dobavljanju izdavača");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublishers();
  }, [sortType]);

  return (
    <div>
      <h2>Lista izdavača</h2>

      <label htmlFor="publisherSort">Sortiraj po:</label>
      <select
        className = "publisherSort"
        value={sortType}
        onChange={e => setSortType(e.target.value)}
        style={{ marginLeft: "0.5rem", marginBottom: "1rem" }}
      >
        <option value="NameAsc">Naziv (rastuće)</option>
        <option value="NameDesc">Naziv (opadajuće)</option>
        <option value="AddressAsc">Adresa (rastuće)</option>
        <option value="AddressDesc">Adresa (opadajuće)</option>
      </select>

      {error && <p className="error">{error}</p>}
      {loading ? <p>Učitavanje...</p> : <PublisherTable users={publishers} />}
    </div>
  );
}
