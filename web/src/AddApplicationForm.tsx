import React, { useState } from "react";
import { API_URL } from "./constants";

interface CreateApplicationProps {
  onAdded: () => void;
}

function AddApplicationForm({ onAdded }: CreateApplicationProps) {
  const statusOptions: string[] = [
    "applied",
    "screen",
    "tech",
    "onsite",
    "offer",
    "rejected",
  ];

  const sourceOptions: string[] = ["LinkedIn", "Naukri", "Cutshort", "Foundit", "Referral"]

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState(statusOptions[0]);
  const [source, setSource] = useState(sourceOptions[0]);
  const [jdUrl, setJdUrl] = useState("");
  const [notes, setNotes] = useState("");

  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch(`${API_URL}/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company,
        role,
        status,
        ...(source ? { source } : {}), // Works as: if(source) body.source = source
        ...(jdUrl ? { jdUrl } : {}), 
        ...(notes ? { notes } : {}),
      }),
    });
    if (!res.ok) {
      const err = await res.json();
      setError(err.message?.join(", ") || "Failed to add");
      return;
    }
    //If Success - clear form fields
    setCompany("");
    setRole("");
    setStatus(statusOptions[0]);
    setSource(sourceOptions[0])
    setJdUrl("");
    setNotes("");

    onAdded();
  }
  return (
    <div>
      <form className="application-form" onSubmit={handleSubmit}>
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company"
        />
        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role"
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {statusOptions.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </select>
        <select value={source} onChange={(e) => setSource(e.target.value)}>
          {sourceOptions.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </select>
        <input
          name="jdUrl"
          type="url"
          value={jdUrl}
          placeholder="jdUrl"
          onChange={(e) => setJdUrl(e.target.value)}
        />
        <textarea
          name="notes"
          value={notes}
          placeholder="Notes"
          onChange={(e) => setNotes(e.target.value)}
        />
        <button type="submit">Add Application</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
export default AddApplicationForm;
