import React, { useState, useEffect } from "react";
import PublisherTable from "./Publishers.jsx";
import * as crudService from "../../service/crudService.js";

export default function PublishersPage() {
    const [publishers, setPublisher] = useState([]);
    const [error, setError] = useState(null);

    const fetchPublishers = async () => {
        try {
            const response = await crudService.getAllPublishers();
            console.log(response); // Proverite strukturu odgovora
            setPublisher(response.$values); // Izvlačenje niza iz `$values`
        } catch (err) {
            setError("Greška pri dobavljanju izdavača");
            console.error(err);
        }
    };

    useEffect(() => {
        fetchPublishers();
    }, []);

    return (
        <div>
            <h2>Lista izdavača</h2>
            {error && <p className="error">{error}</p>}
            <PublisherTable users={publishers} />
        </div>
    );
}