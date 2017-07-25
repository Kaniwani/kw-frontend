import React from 'react';

const Debug = ({ value }) => ( // eslint-disable-line react/prop-types
  <div style={{ margin: '1rem', padding: '.5rem', border: '2px solid grey', borderRadius: '.2rem' }}>
    <h2>Debug:</h2>
    <pre>
      <code>
        {JSON.stringify(value, null, 2)}
      </code>
    </pre>
  </div>
);

export default Debug;
