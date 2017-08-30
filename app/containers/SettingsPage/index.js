import React from 'react';
import { Helmet } from 'react-helmet';
import PageWrapper from 'base/PageWrapper';
import Container from 'base/Container';
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
        <Container>
          <SettingsForm />
        </Container>
        <Container>
          <AccountForm />
        </Container>
      </PageWrapper>
    </div>
  );
}

export default SettingsPage;
