import React, { useEffect, useState } from "react";
import { API_URL } from "./constants";
import {
  FormActionType,
  sourceOptions,
  statusOptions,
  type Application,
} from "./types";

interface AddApplicationProps {
  onAdded: () => void;
  onClose: () => void;
  action: FormActionType;
  application?: Application;
}

function ApplicationForm({
  onAdded,
  onClose,
  action,
  application,
}: AddApplicationProps) {
  const addApplictaion = action === FormActionType.Add;

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState(application?.status ?? statusOptions[0]);
  const [source, setSource] = useState(application?.source ?? sourceOptions[0]);
  const [jdUrl, setJdUrl] = useState(application?.jdUrl ?? "");
  const [notes, setNotes] = useState(application?.notes ?? "");

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!application) return;

    setStatus(application.status);
    setSource(application.source);
    setJdUrl(application.jdUrl ?? "");
    setNotes(application.notes ?? "");
  }, [application]);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    let res;
    if (addApplictaion) {
      res = await fetch(`${API_URL}/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company,
          role,
          status,
          ...(source ? { source } : {}),
          ...(jdUrl ? { jdUrl } : {}),
          ...(notes ? { notes } : null),
        }),
      });
    } else {
      res = await fetch(`${API_URL}/applications/${application?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          source,
          jdUrl,
          notes,
        }),
      });
    }
    if (!res.ok) {
      const err = await res.json();
      setError(err.message?.join(", ") || "Failed to add");
      return;
    }
    //If Success - clear form fields
    setCompany("");
    setRole("");
    setStatus(statusOptions[0]);
    setSource(sourceOptions[0]);
    setJdUrl("");
    setNotes("");

    onAdded();
    onClose();
  }

  const handleClose = () => {
    onClose();
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form
          style={{ maxWidth: "500px", margin: "0 auto" }}
          className="application-form"
          onSubmit={handleSubmit}
        >
          <h3>
            {addApplictaion
              ? "Add application"
              : `${application?.company}'s update application`}
          </h3>
          {
            <button className="close-button" onClick={handleClose}>
              X
            </button>
          }
          {addApplictaion && (
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company"
            />
          )}
          {addApplictaion && (
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Role"
            />
          )}
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
            name="job description URL"
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
          <button type="submit">
            {addApplictaion ? "Add" : "Update"} Application
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}
export default ApplicationForm;
