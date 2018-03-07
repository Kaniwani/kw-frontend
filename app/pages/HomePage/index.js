import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import PageWrapper from 'common/components/PageWrapper';
import Dashboard from 'features/dashboard';

export function HomePage() {
  return (
    <Fragment>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Kaniwani Dashboard Page" />
      </Helmet>
      <PageWrapper>
        <Dashboard />
      </PageWrapper>
    </Fragment>
  );
}

export default HomePage;
