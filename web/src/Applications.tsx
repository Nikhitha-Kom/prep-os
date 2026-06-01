import { useEffect, useState } from "react";
import type { Application } from "./types";
import AddApplicationForm from "./AddApplicationForm";
import "./App.css";

const API_URL: string = import.meta.env.VITE_API_URL;
function Applications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/applications`)
      .then((r) => r.json())
      .then((data) => {
        setApplications(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>loading...</p>;
  if (applications.length === 0) return <p>No applications yet.</p>;
  return (
    <div>
      <ul>
        {applications.map((a) => (
          <li>{a.company}</li>
        ))}
      </ul>
      <AddApplicationForm />
    </div>
  );
}

export default Applications;
