import React from 'react';

const handleDownload = (data) => {
  // Convert data to a format suitable for download (e.g., JSON)
  const textData = data.reduce((acc, item, index) => {
    const values = Object.values(item);
    if (index === 0) {
      const headings = Object.keys(item).join('\t');
      acc.push(headings);
    }
    acc.push(values.join('\t'));
    return acc;
  }, []).join('\n');

  // Create a Blob object representing the data
  const blob = new Blob([textData], { type: 'text/plain' });

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create a temporary anchor element
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.txt'; // Set the filename for the download

  // Append the anchor to the document body
  document.body.appendChild(a);

  // Programmatically trigger the click event on the anchor
  a.click();

  // Clean up by revoking the object URL
  URL.revokeObjectURL(url);

  // Remove the anchor from the document body
  a.remove();
};

const ResultTable = ({ data }) => {
  const handleDownloadButtonClick = () => {
    handleDownload(data);
  };

  return (
    <div style={{ marginTop: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', width: '510px' }}> {/* Card-like border */}
      <div style={{ padding: '20px', maxHeight: '300px', overflowY: 'auto' }}>
        <h2 style={{ fontSize: '14px', marginBottom: '10px', color: 'black' }}>Data from DataBase:</h2>
        <table style={{ width: '100%', fontSize: '12px' }}>
          <thead>
            <tr>
              {data.length > 0 && Object.keys(data[0]).map((key, idx) => (
                <th key={idx} style={{ padding: '8px', borderBottom: '1px solid #ddd', color: 'black' }}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {Object.values(item).map((value, idx) => (
                  <td key={idx} style={{ padding: '8px', borderBottom: '1px solid #ddd', color: 'black' }}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button style={{ margin: '10px', padding: '8px 16px', fontSize: '14px' }} onClick={handleDownloadButtonClick}>
          Download Data as Text
        </button>
      </div>
    </div>
  );
};

export default ResultTable;
