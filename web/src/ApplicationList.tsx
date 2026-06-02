import { useMemo } from "react";
import StatusPill from "./StatusPill";
import type { Application } from "./types";

interface ApplicationListProps {
  applications: Application[];
}

function ApplicationList({ applications }: ApplicationListProps) {
  const sortedApplications = useMemo(() => {
    return [...applications].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [applications]);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Source</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedApplications.map((application) => (
            <tr>
              <td>{application.company}</td>
              <td>{application.role}</td>
              <td>{application.source}</td>
              <td>
                <StatusPill status={application.status} />{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ApplicationList;
