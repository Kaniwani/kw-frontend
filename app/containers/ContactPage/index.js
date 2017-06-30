import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import PageWrapper from 'base/PageWrapper';
import H1 from 'base/H1';

function ContactPage() {
  return (
    <div>
      <Helmet
        title="ContactPage"
        meta={[
          { name: 'description', content: 'Description of ContactPage' },
        ]}
      />
      <PageWrapper>
        <H1>Hello ContactPage</H1>
      </PageWrapper>
    </div>
  );
}

ContactPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(ContactPage);
