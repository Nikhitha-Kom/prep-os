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
      <h3>My Applications</h3>
      <table style={{width: '100%', borderCollapse:'collapse', border:'1px solid white'}}>
        <thead>
          <tr style={{border:'1px solid white'}}>
            <th style={{padding:'8px', border:'1px solid white'}}>Company</th>
            <th style={{padding:'8px', border:'1px solid white'}}>Role</th>
            <th style={{padding:'8px', border:'1px solid white'}}>Source</th>
            <th style={{padding:'8px', border:'1px solid white'}}>Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedApplications.map((application) => (
            <tr style={{border:'1px solid white'}}>
              <td style={{textAlign:'left',padding:'8px', border:'1px solid white'}}>{application.company}</td>
              <td style={{textAlign:'left',padding:'8px', border:'1px solid white'}}>{application.role}</td>
              <td style={{textAlign:'left',padding:'8px', border:'1px solid white'}}>{application.source}</td>
              <td style={{textAlign:'left',padding:'8px', border:'1px solid white'}}>
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
