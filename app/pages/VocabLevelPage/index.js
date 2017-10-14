import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import actions from 'components/App/actions';
import {
  selectIdFromMatch,
  makeSelectLevelReviews,
  makeSelectLevelPrevLoaded,
} from 'components/App/selectors';

import PageWrapper from 'base/PageWrapper';
import Container from 'base/Container';
import H3 from 'base/H3';
import A from 'base/A';
import VocabPageHeader from 'components/VocabPageHeader';
import VocabList from 'components/VocabList';

import { makeSelectLevelLoading } from './selectors';

export class VocabLevelPage extends React.Component {
  static propTypes = {
    loadLevelReviews: PropTypes.func.isRequired,
    reviewIds: PropTypes.array,
    id: PropTypes.PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    isLoading: PropTypes.bool.isRequired,
    prevLoaded: PropTypes.bool,
  }

  static defaultProps = {
    reviewIds: [],
    prevLoaded: false,
  }

  state = {
    cardsExpanded: true,
  }

  componentDidMount() {
    const { loadLevelReviews, id } = this.props;
    loadLevelReviews({ id });
  }

  toggleCardsExpanded = () => this.setState({ cardsExpanded: !this.state.cardsExpanded });

  render() {
    const { reviewIds, id, isLoading, prevLoaded } = this.props;
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
            <VocabList prevLoaded={prevLoaded} ids={reviewIds} isExpanded={this.state.cardsExpanded} />
            {!isLoading && reviewIds.length < 1 && (
              <H3>All entries hidden. Check your WaniKani filtering in <A to="/settings">Settings</A></H3>
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
    reviewIds: makeSelectLevelReviews(id)(state),
    isLoading: makeSelectLevelLoading(id)(state),
    prevLoaded: makeSelectLevelPrevLoaded(id)(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadLevelReviews: (payload) => dispatch(actions.level.load.request(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VocabLevelPage);
