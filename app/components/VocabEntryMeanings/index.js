import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { makeSelectReviewMeanings } from 'containers/App/selectors';

import P from 'base/P';
import VocabEntryLock from 'components/VocabEntryLock';

import { Wrapper, Primary } from './styles';

VocabEntryMeanings.propTypes = {
  meanings: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
};

function VocabEntryMeanings({ id, meanings }) {
  const [first, ...rest] = meanings;
  return (
    <Wrapper>
      <Primary>{first}<VocabEntryLock id={id} /></Primary>
      {rest.length > 0 && <P>{rest.join(', ')}</P>}
    </Wrapper>
  );
}

const mapStateToProps = (state, { id }) => ({
  meanings: makeSelectReviewMeanings(id)(state),
});

export default connect(mapStateToProps)(VocabEntryMeanings);
