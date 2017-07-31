import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import actions from 'containers/App/actions';
import {
  selectIdFromMatch,
  makeSelectLevelReviews,
 } from 'containers/App/selectors';

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

  state = {
    cardsExpanded: true,
  }

  componentDidMount() {
    const { loadLevelReviews, id } = this.props;
    // TODO: ask tadgh for custom stubbed reviews api point?
    loadLevelReviews({ id });
  }

  toggleCardsExpanded = () => this.setState({ cardsExpanded: !this.state.cardsExpanded });

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
            cardsExpanded={this.state.cardsExpanded}
            toggleCardsExpanded={this.toggleCardsExpanded}
            withVocabListToggle
          />
          <VocabListWrapper>
            <VocabList
              ids={reviewIds}
              isExpanded={this.state.cardsExpanded}
            />
          </VocabListWrapper>
        </PageWrapper>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  id: selectIdFromMatch(props),
  reviewIds: makeSelectLevelReviews(selectIdFromMatch(props))(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadLevelReviews: (payload) => dispatch(actions.level.load.request(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VocabLevelPage);
