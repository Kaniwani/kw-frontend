import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeSelectReviewMeanings } from 'containers/App/selectors';

import H1 from 'base/H1';
import P from 'base/P';

import { Wrapper } from './styles';

VocabEntryMeanings.propTypes = {
  meanings: PropTypes.array.isRequired,
};

function VocabEntryMeanings({ meanings }) {
  const [first, ...rest] = meanings;
  return (
    <Wrapper>
      <H1>{first}</H1>
      {rest.length > 0 && <P>{rest.join(', ')}</P>}
    </Wrapper>
  );
}

const mapStateToProps = (state, { id }) => ({
  meanings: makeSelectReviewMeanings(id)(state),
});

export default connect(mapStateToProps)(VocabEntryMeanings);
