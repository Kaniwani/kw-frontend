import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import ReactTooltip from 'react-tooltip';

import actions from 'containers/App/actions';
import { makeSelectLevelReviewIds, selectIdFromParams } from 'containers/App/selectors';
import PageWrapper from 'base/PageWrapper';
import VocabPageHeader from 'components/VocabPageHeader';
import VocabList from 'components/VocabList';

import { VocabListWrapper } from './styles';

export class VocabLevelPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    loadLevelReviews: PropTypes.func.isRequired,
    reviewIds: PropTypes.array,
    id: PropTypes.PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
  }

  static defaultProps = {
    reviewIds: [],
  }

  // FIXME: state.global.ui.level.vocabListExpanded
  // although, we probably want session summary to be small
  // and these ones to be big
  state = {
    vocabListExpanded: true,
  }

  componentDidMount() {
    const { loadLevelReviews, id } = this.props;
    // TODO: ask tadgh for custom stubbed reviews api point?
    loadLevelReviews({ id });
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
    const { reviewIds, id } = this.props;
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
          {reviewIds && (
            <VocabListWrapper>
              <VocabList ids={reviewIds} isExpanded={this.state.vocabListExpanded} />
            </VocabListWrapper>
          )}
        </PageWrapper>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  reviewIds: makeSelectLevelReviewIds(),
  id: selectIdFromParams,
});

const mapDispatchToProps = (dispatch) => ({
  loadLevelReviews: (payload) => dispatch(actions.level.load.request(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VocabLevelPage);
