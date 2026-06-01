import { useEffect, useState } from "react";
import type { Application } from "./types";
import AddApplicationForm from "./AddApplicationForm";
import { API_URL } from "./constants";
import "./App.css";

function Applications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  let fetchApplications = async () => {
    let res = await fetch(`${API_URL}/applications`);
    let data = await res.json();
    setApplications(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchApplications();
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
      <AddApplicationForm onAdded={fetchApplications} />
    </div>
  );
}

export default Applications;
