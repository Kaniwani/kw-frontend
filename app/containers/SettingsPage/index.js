import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'recompose';
import Debug from 'utils/Debug';

import app from 'containers/App/actions';
import { selectSettings } from 'containers/App/selectors';

import PageWrapper from 'base/PageWrapper';
import H1 from 'base/H1';
import SettingsForm from './SettingsForm';
import AccountForm from './AccountForm';

SettingsPage.propTypes = {
  settings: PropTypes.object.isRequired,
};

SettingsPage.propTypes = {
  settings: PropTypes.object.isRequired,
  saveSettings: PropTypes.func.isRequired,
};

function SettingsPage({ settings, saveSettings }) {
  return (
    <div>
      <Helmet>
        <title>Settings</title>
        <meta name="description" content="Kaniwani Settings Page" />
      </Helmet>
      <PageWrapper>
        <H1>Settings</H1>
        <SettingsForm onSubmit={saveSettings} initialValues={settings} />
        <AccountForm />
        <Debug value={settings} />
      </PageWrapper>
    </div>
  );
}

const enhance = compose(
  connect(
    (state) => ({ settings: selectSettings(state) }),
    ({ saveSettings: app.settings.save.request }),
  ),
);


export default enhance(SettingsPage);
