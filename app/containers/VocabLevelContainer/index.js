import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import VocabList from 'components/VocabList';

import { VocabListWrapper } from './styles';
import makeSelectVocabLevelContainer from './selectors';

export class VocabLevelContainer extends React.Component {
  static propTypes = {
    entries: PropTypes.array.isRequired,
    vocabListExpanded: PropTypes.bool.isRequired,
  }

  render() {
    const { entries, vocabListExpanded } = this.props;
    return (
      <VocabListWrapper>
        <VocabList items={entries.map((entry) => entry.vocabulary)} isExpanded={vocabListExpanded} />
      </VocabListWrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  vocabLevelContainer: makeSelectVocabLevelContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VocabLevelContainer);
