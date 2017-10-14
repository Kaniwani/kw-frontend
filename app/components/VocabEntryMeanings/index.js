import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { makeSelectReviewMeanings } from 'components/App/selectors';

import { Wrapper, Primary, Secondary } from './styles';

VocabEntryMeanings.propTypes = {
  meanings: PropTypes.array.isRequired,
};

function VocabEntryMeanings({ meanings }) {
  const [first, ...rest] = meanings;
  return (
    <Wrapper>
      <Primary>{first}</Primary>
      {rest.length > 0 && <Secondary>{rest.join(', ')}</Secondary>}
    </Wrapper>
  );
}

const mapStateToProps = (state, { id }) => ({
  meanings: makeSelectReviewMeanings(id)(state),
});

export default connect(mapStateToProps)(VocabEntryMeanings);
