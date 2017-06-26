import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageWrapper from 'base/PageWrapper';

import { createStructuredSelector } from 'reselect';
import { makeSelectUser } from './selectors';

HomePage.propTypes = {
  user: PropTypes.object.isRequired,
};

function HomePage(props) {
  return (
    <PageWrapper>
      <h1>HomePage!</h1>
      <pre><code>{JSON.stringify(props.user, null, 2)}</code></pre>
    </PageWrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

export default connect(mapStateToProps)(HomePage);
