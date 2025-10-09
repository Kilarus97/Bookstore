import React, { useEffect, useState } from 'react';
import {getAllAuthors} from '../../service/crudService.js';
import axios from 'axios';

export default function AuthorsPage() {
  const [authors, setAuthors] = useState([]);
  const [awards, setAwards] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const pageSize = 10;

  const fetchAuthors = async () => {
    try {
      const response = await getAllAuthors(pageIndex, pageSize);
      setAuthors(response.items.$values);
      setAwards(response.items.$values.flatMap(author => author.awards));
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }}

  useEffect(() => {
    fetchAuthors();
  }, [pageIndex]);

  return (
    <div>
    <h2>Autori</h2>
    <table className="authors-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Ime</th>
          <th>Nagrade</th>
        </tr>
      </thead>
      <tbody>
        {authors.map(author => (
          <tr key={author.id}>
            <td>{author.id}</td>
            <td>{author.fullName}</td>
            <td>
            {author.awards?.$values?.length > 0 ? (
                <ul>
                {author.awards.$values.map((award, index) => (
                    <li key={index}>
                    {award.name} ({award.yearReceived})
                    </li>
                ))}
                </ul>
            ) : (
                <em>Bez nagrada</em>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <div style={{ marginTop: '1rem' }}>
      <button disabled={pageIndex === 0} onClick={() => setPageIndex(p => p - 1)}>Prethodna</button>
      <span style={{ margin: '0 1rem' }}>Stranica {pageIndex + 1} / {totalPages}</span>
      <button disabled={pageIndex >= totalPages - 1} onClick={() => setPageIndex(p => p + 1)}>Sledeća</button>
    </div>
  </div>
  );
}
