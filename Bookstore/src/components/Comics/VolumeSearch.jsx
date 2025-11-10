import React, { useState } from "react";
import { searchVolumes } from "../../service/comic.services.jsx";
import "../../styles/comics.scss";

export default function VolumeSearch() {
  const [name, setName] = useState("");
  const [volumes, setVolumes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // koliko redova po stranici

  const handleSearch = async () => {
    const res = await searchVolumes(name);
    setVolumes(res);
    setCurrentPage(1); // reset na prvu stranicu
  };

  // izračunaj slice za prikaz
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentVolumes = volumes.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(volumes.length / itemsPerPage);

  return (
    <div className="search-container">
      <h2>Pretraga tomova</h2>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Unesi ime toma"
      />
      <button onClick={handleSearch}>Pretraži</button>

      <table>
        <thead>
          <tr>
            <th>Id toma</th>
            <th>Naziv</th>
            <th>Godina početka</th>
            <th>Broj izdanja</th>
          </tr>
        </thead>
        <tbody>
          {currentVolumes.map(v => (
            <tr key={v.id}>
                <td>{v.id}</td>
              <td>{v.name}</td>
              <td>{v.start_year}</td>
              <td>{v.count_of_issues}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Prethodna
          </button>
          <span>
            Stranica {currentPage} od {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Sledeća
          </button>
        </div>
      )}
    </div>
  );
}
