import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import actions from 'containers/App/actions';
import { selectIdFromMatch, makeSelectLevelReviews } from 'containers/App/selectors';

import PageWrapper from 'base/PageWrapper';
import A from 'base/A';
import H3 from 'base/H3';
import VocabPageHeader from 'components/VocabPageHeader';
import VocabList from 'components/VocabList';

import { makeSelectLevelLoading } from './selectors';
import { VocabListWrapper } from './styles';

export class VocabLevelPage extends React.Component {
  static propTypes = {
    loadLevelReviews: PropTypes.func.isRequired,
    reviewIds: PropTypes.array,
    id: PropTypes.PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    levelLoading: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    reviewIds: [],
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
    const { reviewIds, id, levelLoading } = this.props;
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
            <VocabList levelLoading={levelLoading} ids={reviewIds} isExpanded={this.state.cardsExpanded} />
            {!levelLoading && reviewIds.length < 1 && (
              <H3>All entries hidden. Check your WaniKani filtering in <A to="/settings">Settings</A></H3>
            )}
          </VocabListWrapper>
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
    levelLoading: makeSelectLevelLoading(id)(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadLevelReviews: (payload) => dispatch(actions.level.load.request(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VocabLevelPage);
