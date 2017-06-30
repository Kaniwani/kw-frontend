import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import PageWrapper from 'base/PageWrapper';
import H1 from 'base/H1';

function SettingsPage() {
  return (
    <div>
      <Helmet
        title="SettingsPage"
        meta={[
          { name: 'description', content: 'Description of SettingsPage' },
        ]}
      />
      <PageWrapper>
        <H1>Hello SettingsPage</H1>
      </PageWrapper>
    </div>
  );
}

SettingsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(SettingsPage);
