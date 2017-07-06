import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import PageWrapper from 'base/PageWrapper';
import VocabPageHeader from 'components/VocabPageHeader';
import VocabLevelsList from 'components/VocabLevelsList';

import actions from './actions';
import { selectLevels, selectUserLevel } from './selectors';

export class VocabLevelsPage extends React.Component {
  static propTypes = {
    userLevel: PropTypes.number.isRequired,
    levels: PropTypes.array.isRequired,
    levelsLoad: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.levelsLoad();
  }

  render() {
    const PAGE_TITLE = 'Vocabulary: Levels';
    return (
      <div>
        <Helmet>
          <title>{PAGE_TITLE}</title>
          <meta name="description" content={`Kaniwani ${PAGE_TITLE}`} />
        </Helmet>
        <PageWrapper>
          <VocabPageHeader
            pageTitle={PAGE_TITLE}
            withVocabListToggle={false}
          />
          <VocabLevelsList
            levels={this.props.levels}
            userLevel={this.props.userLevel}
          />
        </PageWrapper>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  levels: selectLevels,
  userLevel: selectUserLevel,
});

const mapDispatchToProps = (dispatch) => ({
  levelsLoad: () => dispatch(actions.load.request()),
});

export default connect(mapStateToProps, mapDispatchToProps)(VocabLevelsPage);
