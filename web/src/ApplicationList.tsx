import { useMemo, useState } from "react";
import ApplicationForm from "./ApplicationForm";
import StatusPill from "./StatusPill";
import { FormActionType, type Application } from "./types";
import { FcFullTrash } from "react-icons/fc";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { toast } from "react-toastify";

interface ApplicationListProps {
  applications: Application[];
  onAdded: () => Promise<void>;
  onClose?: () => void;
}

function ApplicationList({ applications, onAdded }: ApplicationListProps) {
  const [application, setApplication] = useState<Application>();
  const [showForm, setShowForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteApplication, setDeleteApplication] =
    useState<Application | null>(null);

  const sortedApplications = useMemo(() => {
    return [...applications].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [applications]);

  const handleRowClick = (application: Application) => {
    setApplication(application);
    setShowForm(true);
  };

  const handleDelete = async (
    e: React.MouseEvent,
    application: Application
  ) => {
    e.stopPropagation();
    setDeleteApplication(application);
    setShowDeleteConfirm(true);
  };

  const onDelete = () => {
    setShowDeleteConfirm(false);
    onAdded();
    toast.success("Application deleted successfully");
  };

  const onCancel = () => {
    setDeleteApplication(null);
    setShowDeleteConfirm(false);
  };

  return (
    <div>
      <h3>My Applications</h3>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th></th>
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
            <tr
              key={application.id}
              onClick={() => handleRowClick(application)}
            >
              <td>
                <button
                  type="button"
                  onClick={(e) => handleDelete(e, application)}
                >
                  <FcFullTrash />
                </button>
              </td>
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
      {showForm && (
        <ApplicationForm
          onAdded={onAdded}
          onClose={() => setShowForm(false)}
          action={FormActionType.Update}
          application={application}
        />
      )}
      {showDeleteConfirm && deleteApplication && (
        <DeleteConfirmationModal
          application={deleteApplication}
          onConfirm={onDelete}
          onCancel={onCancel}
        />
      )}
    </div>
  );
}
export default ApplicationList;
