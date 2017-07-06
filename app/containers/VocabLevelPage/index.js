import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import ReactTooltip from 'react-tooltip';

import * as globalActions from 'containers/App/actions';
import { makeSelectLevel, makeSelectReviews } from 'containers/App/selectors';
import PageWrapper from 'base/PageWrapper';
import VocabPageHeader from 'components/VocabPageHeader';
import VocabLevelContainer from 'containers/VocabLevelContainer';
import makeSelectVocabLevelPage from './selectors';

export class VocabLevelPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    reviewsLoad: PropTypes.func.isRequired,
    entries: PropTypes.array,
    level: PropTypes.number,
    match: PropTypes.object,
  }

  static defaultProps = {
    entries: [],
  }

  state = {
    vocabListExpanded: true,
  }

  componentDidMount() {
    // TODO: ask tadgh for custom stubbed reviews api point?
    this.props.reviewsLoad();
  }

  componentDidUpdate(prevProps, prevState) {
    const switchedToCompact = (!this.state.vocabListExpanded) && prevState.vocabListExpanded;
    if (switchedToCompact) {
      ReactTooltip.rebuild();
    }
  }

  toggleVocabListType = () => {
    this.setState((prevState) => ({ vocabListExpanded: !prevState.vocabListExpanded }));
  }

  render() {
    const { entries, match: { params: { id: level } } } = this.props;
    const PAGE_TITLE = `Vocabulary: Level ${level}`;
    return (
      <div>
        <Helmet>
          <title>{PAGE_TITLE}</title>
          <meta name="description" content={`Kaniwani ${PAGE_TITLE}`} />
        </Helmet>
        <PageWrapper>
          <VocabPageHeader
            pageTitle={PAGE_TITLE}
            withVocabListToggle={{
              isExpanded: this.state.vocabListExpanded,
              handleToggle: this.toggleVocabListType,
            }}
          />
          <VocabLevelContainer
            entries={entries}
            level={+level}
            vocabListExpanded={this.state.vocabListExpanded}
          />
        </PageWrapper>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  VocabLevelPage: makeSelectVocabLevelPage(),
  level: makeSelectLevel(),
  entries: makeSelectReviews(),
});

function mapDispatchToProps(dispatch) {
  return {
    reviewsLoad: () => dispatch(globalActions.reviewsLoadRequest()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VocabLevelPage);
