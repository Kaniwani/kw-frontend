import React from "react";
import { Helmet } from "react-helmet";

import Aux from "common/components/Aux";
import PageWrapper from "common/components/PageWrapper";
import Dashboard from "features/dashboard";

export function HomePage() {
  return (
    <Aux>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Kaniwani Dashboard Page" />
      </Helmet>
      <PageWrapper>
        <Dashboard />
      </PageWrapper>
    </Aux>
  );
}

export default HomePage;
