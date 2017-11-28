import React from 'react';

/* eslint-disable */
const Debug = ({ value, omitKeys = [] }) => {
  const data = { ...value };
  if (omitKeys.length) {
    omitKeys.forEach(key => {
      if (Object.keys(data).includes(key)) data[key] = 'OMITTED';
    });
  }
  return (
    <div
      style={{
        margin: '1rem',
        padding: '.5rem',
        border: '2px solid grey',
        borderRadius: '.2rem'
      }}
    >
      <h2>Debug:</h2>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  );
};

export default Debug;
