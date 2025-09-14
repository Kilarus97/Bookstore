import React, { useState,useEffect } from "react";
import PublisherTable from "./Publishers.jsx";
import * as crudService from "../../service/crudService.js"


export default function PublishersPage() {
    const [publishers, setPublisher] = useState([]);
    const [error, setError] = useState(null);


    const fetchPublishers = async () => {
        try {
          const response = await crudService.getAllPublishers();
          console.log(response)
          setPublisher(response);
        } catch (err) {
          setError("Greška pri dobavljanju izdavaca");
          console.error(err);
        }
      };

      useEffect(() => {
        fetchPublishers();
      }, []);


      return (
        <div>
        <h2>Lista izdavaca</h2>
    
        <PublisherTable
            users={publishers}
        />
    
        
    </div>
    );
}