import React from 'react';

const TimeEntryExportedTable = ({ timeEntries }) => {
  if (!timeEntries || timeEntries[0] === 'approvedTimeEntries') {
    return null;
  }

  const rows = timeEntries.map((entry, index) => (
    <tr key={index}>
      <td>{`${entry.publicDate.split('T')[0].split('-')[1]}-${entry.publicDate.split('T')[0].split('-')[2]}`}</td>
      <td>{entry.publicUser.lastName}</td>
      <td>{entry.publicHours}</td>
      <td>{entry.publicDescription}</td>
    </tr>
  ));

  return (
    <div>
      <em>Raw Time Entries</em>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">User</th>
            <th scope="col">Hours</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
};

export default TimeEntryExportedTable;
