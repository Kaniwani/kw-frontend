import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { makeSelectReviewMeanings } from 'containers/App/selectors';

import P from 'base/P';

import { Wrapper, Primary, PrimaryText } from './styles';

VocabEntryMeanings.propTypes = {
  meanings: PropTypes.array.isRequired,
};

function VocabEntryMeanings({ meanings }) {
  const [first, ...rest] = meanings;
  return (
    <Wrapper>
      <Primary>
        <PrimaryText>{first}</PrimaryText>
      </Primary>
      {rest.length > 0 && <P>{rest.join(', ')}, more meanings, another meaning, lots of meanings</P>}
    </Wrapper>
  );
}

const mapStateToProps = (state, { id }) => ({
  meanings: makeSelectReviewMeanings(id)(state),
});

export default connect(mapStateToProps)(VocabEntryMeanings);
