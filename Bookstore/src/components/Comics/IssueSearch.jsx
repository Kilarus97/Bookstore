import React, { useState } from "react";
import SaveIssueForm from "./SaveIssueForm";
import { searchIssues } from "../../service/comic.services.jsx";
import "../../styles/comics.scss";

export default function IssueSearch() {
  const [volumeId, setVolumeId] = useState("");
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSearch = async () => {
    const res = await searchIssues(volumeId);
    setIssues(res);
    setCurrentPage(1);
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentIssues = issues.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(issues.length / itemsPerPage);

  return (
    <div className="search-container">
      <h2>Pretraga izdanja</h2>
      <input
        value={volumeId}
        onChange={e => setVolumeId(e.target.value)}
        placeholder="Unesi ID toma"
      />
      <button onClick={handleSearch}>Pretraži</button>

      <table>
        <thead>
          <tr>
            <th>Naziv</th>
            <th>Broj izdanja</th>
            <th>Datum izlaska</th>
            <th>Akcija</th>
          </tr>
        </thead>
        <tbody>
          {currentIssues.map(i => (
            <tr key={i.id}>
              <td>{i.name}</td>
              <td>{i.issue_number}</td>
              <td>{i.cover_date}</td>
              <td>
                <button onClick={() => setSelectedIssue(i)}>Sačuvaj</button>
              </td>
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

      {selectedIssue && (
        <SaveIssueForm issue={selectedIssue} onClose={() => setSelectedIssue(null)} />
      )}
    </div>
  );
}
