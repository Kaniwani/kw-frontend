import React from 'react';
import { Helmet } from 'react-helmet';
import PageWrapper from 'common/components/PageWrapper';
import Container from 'common/components/Container';

import LastWkSync from 'features/settings/LastWkSync';
import SettingsForm from 'features/settings/SettingsForm';
import AccountForm from 'features/settings/AccountForm';

export function SettingsPage() {
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
        <Container>
          <LastWkSync />
        </Container>
      </PageWrapper>
    </div>
  );
}

export default SettingsPage;
