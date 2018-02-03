import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { getProp } from 'common/selectors';

import PageWrapper from 'common/components/PageWrapper';
import Container from 'common/components/Container';
import VocabLevel from 'features/vocab/Level';

VocabLevelPage.propTypes = {
  id: PropTypes.number.isRequired,
};

export function VocabLevelPage({ id }) {
  const pageTitle = `Level ${id}`;
  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={`Kaniwani ${pageTitle}`} />
      </Helmet>
      <PageWrapper>
        <Container>
          <VocabLevel id={id} />
        </Container>
      </PageWrapper>
    </div>
  );
}

const mapStateToProps = (_, props) => ({
  id: +getProp('match.params.id')(_, props),
});

export default connect(mapStateToProps)(VocabLevelPage);
