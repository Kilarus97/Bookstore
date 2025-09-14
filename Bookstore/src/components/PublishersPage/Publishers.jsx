import React from "react";
import "../../styles/main.scss";



const PublisherTable = ({ users }) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.address}</td>
              <td>{user.website}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

export default PublisherTable;