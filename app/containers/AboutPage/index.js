import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import PageWrapper from 'base/PageWrapper';
import H1 from 'base/H1';

function AboutPage() {
  return (
    <div>
      <Helmet
        title="AboutPage"
        meta={[
          { name: 'description', content: 'Description of AboutPage' },
        ]}
      />
      <PageWrapper>
        <H1>Hello AboutPage</H1>
      </PageWrapper>
    </div>
  );
}

AboutPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(AboutPage);
