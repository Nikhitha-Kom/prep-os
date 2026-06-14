import { API_URL } from "./constants";
import type { Application } from "./types";

interface DeleteConfirmationProps {
  application: Application;
  onConfirm: () => void;
  onCancel: () => void;
}
function DeleteConfirmationModal({
  application,
  onConfirm,
  onCancel,
}: DeleteConfirmationProps) {
  const handleDelete = async (id: string) => {
    const res = await fetch(`${API_URL}/applications/${id}`, {
      method: "DELETE",
    });
    console.log("delete--", id);
    if (!res.ok) {
      throw new Error(
        `An error occured while deleting an application with id ${id}`
      );
    }
    onConfirm?.();
  };
  return (
    <div>
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>Delete Application</h3>

          <p>
            Are you sure you want to delete
            <strong> {application.company}</strong>?
          </p>

          <div className="delete-actions">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>

            <button
              type="button"
              className="delete-button"
              onClick={() => handleDelete(application.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DeleteConfirmationModal;
