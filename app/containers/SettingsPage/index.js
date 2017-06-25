import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';


function SettingsPage() {
  return (
    <div>
      <Helmet
        title="SettingsPage"
        meta={[
          { name: 'description', content: 'Description of SettingsPage' },
        ]}
      />
    <h1>Hello SettingsPage</h1>
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
