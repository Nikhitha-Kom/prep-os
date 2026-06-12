import { useMemo, useState } from "react";
import StatusPill from "./StatusPill";
import { FormActionType, type Application } from "./types";
import ApplicationForm from "./ApplicationForm";

interface ApplicationListProps {
  applications: Application[];
  onAdded: () => Promise<void>;
  onClose?: () => void;
}

function ApplicationList({ applications, onAdded }: ApplicationListProps) {
  const [application, setApplication] = useState<Application>();
  const [showModal, setShowModal] = useState(false);

  const sortedApplications = useMemo(() => {
    return [...applications].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [applications]);

  const handleRowClick = (application: Application) => {
    setApplication(application);
    setShowModal(true);
  };

  return (
    <div>
      <h3>My Applications</h3>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid white",
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: "8px", border: "1px solid white" }}>
              Company
            </th>
            <th style={{ padding: "8px", border: "1px solid white" }}>Role</th>
            <th style={{ padding: "8px", border: "1px solid white" }}>
              Source
            </th>
            <th style={{ padding: "8px", border: "1px solid white" }}>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedApplications.map((application) => (
            <tr onClick={() => handleRowClick(application)}>
              <td
                style={{
                  textAlign: "left",
                  padding: "8px",
                  border: "1px solid white",
                }}
              >
                {application.company}
              </td>
              <td
                style={{
                  textAlign: "left",
                  padding: "8px",
                  border: "1px solid white",
                }}
              >
                {application.role}
              </td>
              <td
                style={{
                  textAlign: "left",
                  padding: "8px",
                  border: "1px solid white",
                }}
              >
                {application.source}
              </td>
              <td
                style={{
                  textAlign: "left",
                  padding: "8px",
                  border: "1px solid white",
                }}
              >
                <StatusPill status={application.status} />{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <ApplicationForm
          onAdded={onAdded}
          onClose={() => setShowModal(false)}
          action={FormActionType.Update}
          application={application}
        />
      )}
    </div>
  );
}
export default ApplicationList;
