import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { getProp } from 'common/selectors';

import PageWrapper from 'common/components/PageWrapper';
import Container from 'common/components/Container';
import VocabEntry from 'features/vocab/Entry';

VocabEntryPage.propTypes = {
  id: PropTypes.number.isRequired,
};

export function VocabEntryPage({ id }) {
  const pageTitle = `Vocabulary: Entry ${id}`;
  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={`Kaniwani ${pageTitle}`} />
      </Helmet>
      <PageWrapper>
        <Container>
          <VocabEntry id={id} />
        </Container>
      </PageWrapper>
    </div>
  );
}

const mapStateToProps = (_, props) => ({
  id: getProp('match.params.id')(_, props),
});

export default connect(mapStateToProps)(VocabEntryPage);
