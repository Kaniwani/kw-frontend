import React from 'react';
import PropTypes from 'prop-types';
import PageWrapper from 'base/PageWrapper';

HomePage.propTypes = {
  testingApiResults: PropTypes.object.isRequired,
};

function HomePage({ testingApiResults }) {
  return (
    <PageWrapper>
      <h1>HomePage!</h1>
      <pre><code>{JSON.stringify(testingApiResults, null, 2)}</code></pre>
    </PageWrapper>
  );
}

export default HomePage;
