import React from 'react';
import { Helmet } from 'react-helmet';
import PageWrapper from 'base/PageWrapper';
import H1 from 'base/H1';
import SettingsForm from './SettingsForm';
import AccountForm from './AccountForm';

function SettingsPage() {
  return (
    <div>
      <Helmet>
        <title>Settings</title>
        <meta name="description" content="Kaniwani Settings Page" />
      </Helmet>
      <PageWrapper>
        <H1>Settings</H1>
        <SettingsForm />
        <AccountForm />
      </PageWrapper>
    </div>
  );
}

export default SettingsPage;
