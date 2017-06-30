import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import * as globalActions from 'containers/App/actions';
import { makeSelectLevels } from 'containers/App/selectors';

import VocabPageHeader from 'components/VocabPageHeader';
import VocabLevelList from 'components/VocabLevelList';
import PageWrapper from 'base/PageWrapper';

import makeSelectVocabLevelsPage from './selectors';

export class VocabLevelsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    levels: PropTypes.array,
    levelsLoad: PropTypes.func.isRequired,
    userWKLevel: PropTypes.number,
    handleLevelLock: PropTypes.func,
  }

  static defaultProps = {
    levels: [],
    userWKLevel: 24,
    handleLevelLock: () => console.log('implement lol'),
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
        {this.props.levels && (
        <PageWrapper>
          <VocabPageHeader
            pageTitle={PAGE_TITLE}
            withVocabListToggle={false}
          />
          <VocabLevelList
            levels={this.props.levels}
            userWKLevel={this.props.userWKLevel}
            handleLevelLock={this.props.handleLevelLock}
          />
        </PageWrapper>
      )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  VocabLevelsPage: makeSelectVocabLevelsPage(),
  levels: makeSelectLevels(),
});

function mapDispatchToProps(dispatch) {
  return {
    levelsLoad: () => dispatch(globalActions.levelsLoad()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VocabLevelsPage);
