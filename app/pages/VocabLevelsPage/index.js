import React from "react";
import { Helmet } from "react-helmet";

import PageWrapper from "common/components/PageWrapper";
import Container from "common/components/Container";
import Element from "common/components/Element";
import H1 from "common/components/H1";
import Levels from 'features/vocab/Levels/Loadable';

function VocabLevelsPage() {
  const pageTitle = "Vocabulary: Levels";
  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={`Kaniwani ${pageTitle}`} />
      </Helmet>
      <PageWrapper>
        <Container>
          <Element>
            <H1>Vocabulary Levels</H1>
          </Element>
        </Container>
        <Levels />
      </PageWrapper>
    </div>
  );
}

export default VocabLevelsPage;
