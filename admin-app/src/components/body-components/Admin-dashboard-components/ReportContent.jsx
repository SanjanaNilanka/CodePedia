import React from 'react';

const ReportContent = ({ data }) => {
  return (
    <div>
      <h1>Report Title</h1>
      <p>This is the content of your report.</p>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReportContent;
