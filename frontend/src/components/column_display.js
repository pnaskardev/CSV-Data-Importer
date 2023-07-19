import React from "react";

const ColumnDisplay = ({ data }) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div>No data to display.</div>;
  }

  const columnKeys = Object.keys(data[0]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            {/* Render column headers */}
            {columnKeys.map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Render rows */}
          {data.map((item) => (
            <tr key={item.id}>
              {/* Render columns */}
              {columnKeys.map((key) => (
                <td key={key}>{item[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ColumnDisplay;