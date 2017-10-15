import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { isEqual } from 'lodash';

import actions from 'shared/actions';
import {
  selectIdFromMatch,
  makeSelectLevelReviews,
  makeSelectLevelLocked,
  makeSelectLevelLoading,
} from 'shared/selectors';

import PageWrapper from 'base/PageWrapper';
import Container from 'base/Container';
import H3 from 'base/H3';
import A from 'base/A';
import VocabPageHeader from 'components/VocabPageHeader';
import VocabList from 'components/VocabList';
import LoadingCrabigator from 'components/LoadingCrabigator';

export class VocabLevelPage extends React.Component {
  static propTypes = {
    loadLevelReviews: PropTypes.func.isRequired,
    isLocked: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
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

  componentWillMount() {
    const { loadLevelReviews, id } = this.props;
    loadLevelReviews({ id });
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }

  toggleCardsExpanded = () => {
    this.setState({ cardsExpanded: !this.state.cardsExpanded });
  };

  render() {
    const { reviewIds, id, isLocked, isLoading } = this.props;
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
          <Container>
            {isLocked && !isLoading && (
              <H3>Level is locked! Unlock it in <A to="/vocabulary">Vocabulary Levels</A></H3>
            )}
            {!isLocked && (
              <VocabList
                ids={reviewIds}
                isExpanded={this.state.cardsExpanded}
              />
            )}
            {!isLocked && isLoading && (
              <LoadingCrabigator />
            )}
            {!isLocked && !isLoading && reviewIds.length < 1 && (
              <H3>All entries hidden. Check your WaniKani SRS filtering in <A to="/settings">Settings</A></H3>
            )}
          </Container>
        </PageWrapper>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const id = selectIdFromMatch(props);
  return {
    id,
    isLocked: makeSelectLevelLocked(id)(state),
    reviewIds: makeSelectLevelReviews(id)(state),
    isLoading: makeSelectLevelLoading(id)(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadLevelReviews: (payload) => dispatch(actions.level.load.request(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VocabLevelPage);
