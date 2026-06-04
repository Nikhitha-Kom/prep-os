import { useEffect, useState } from "react";
import AddApplicationForm from "./AddApplicationForm";
import ApplicationList from "./ApplicationList";
import type { Application } from "./types";
import { API_URL } from "./constants";
import "./App.css";

function Applications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    const res = await fetch(`${API_URL}/applications`);
    const data = await res.json();
    setApplications(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) return <p>loading...</p>;
  return (
    <div>
      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <ApplicationList applications={applications} />
      )}
      <AddApplicationForm onAdded={fetchApplications} />
    </div>
  );
}

export default Applications;
