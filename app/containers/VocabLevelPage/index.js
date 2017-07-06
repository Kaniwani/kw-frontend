import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import ReactTooltip from 'react-tooltip';

import app from 'containers/App/actions';
import PageWrapper from 'base/PageWrapper';
import VocabPageHeader from 'components/VocabPageHeader';
import VocabList from 'components/VocabList';

import { VocabListWrapper } from './styles';
import { makeSelectLevelReviews } from './selectors';

export class VocabLevelPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    loadLevelReviews: PropTypes.func.isRequired,
    entries: PropTypes.array.isRequired,
    match: PropTypes.object.isRequired,
  }

  // FIXME: state.global.settings.vocabListExpanded
  state = {
    vocabListExpanded: true,
  }

  componentDidMount() {
    // TODO: ask tadgh for custom stubbed reviews api point?
    this.props.loadLevelReviews();
  }

  // FIXME: create a recompose HoC for this since multiple pages have the toggle
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
    const { entries, match: { params: { id } } } = this.props;
    const PAGE_TITLE = `Vocabulary: Level ${id}`;
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
          {entries && (
            <VocabListWrapper>
              <VocabList items={entries} isExpanded={this.state.vocabListExpanded} />
            </VocabListWrapper>
          )}
        </PageWrapper>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  entries: makeSelectLevelReviews(),
});

const mapDispatchToProps = (dispatch, { match: { params: { id } } }) => ({
  loadLevelReviews: () => dispatch(app.level.load.request({ id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(VocabLevelPage);
