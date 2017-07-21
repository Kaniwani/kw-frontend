import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import PageWrapper from 'base/PageWrapper';
import H1 from 'base/H1';

import app from 'containers/App/actions';
import { selectSettings } from 'containers/App/selectors';

SettingsPage.propTypes = {
  settings: PropTypes.object.isRequired,
};

function SettingsPage({ settings }) {
  return (
    <div>
      <Helmet>
        <title>Settings</title>
        <meta name="description" content="Kaniwani Settings Page" />
      </Helmet>
      <PageWrapper>
        <H1>Hello SettingsPage</H1>
        <pre><code>{JSON.stringify(settings, null, 2)}</code></pre>
      </PageWrapper>
    </div>
  );
}

const mapStateToProps = (state) => ({
  settings: selectSettings(state),
});

const mapDispatchToProps = (dispatch) => ({
  saveSettings: (payload) => dispatch(app.settings.save.request(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
