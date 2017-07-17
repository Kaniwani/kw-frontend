import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import titleCase from 'voca/title_case';
import { makeSelectReviewMeanings } from 'containers/App/selectors';

import Container from 'base/Container';
import H1 from 'base/H1';
import P from 'base/P';

VocabEntryMeanings.propTypes = {
  meanings: PropTypes.array.isRequired,
};

function VocabEntryMeanings({ meanings }) {
  const [first, ...rest] = meanings;
  return (
    <Container>
      <H1>{titleCase(first)}</H1>
      {rest.length > 0 && <P>{titleCase(rest.join(', '))}</P>}
    </Container>
  );
}

const mapStateToProps = (state, { id }) => ({
  meanings: makeSelectReviewMeanings(id)(state),
});

export default connect(mapStateToProps)(VocabEntryMeanings);
