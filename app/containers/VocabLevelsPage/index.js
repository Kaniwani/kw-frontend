import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import * as globalActions from 'containers/App/actions';
import { makeSelectLevels } from 'containers/App/selectors';

import VocabPageHeader from 'components/VocabPageHeader';
import VocabLevelsContainer from 'containers/VocabLevelsContainer';
import PageWrapper from 'base/PageWrapper';

import makeSelectVocabLevelsPage from './selectors';

export class VocabLevelsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    levels: PropTypes.array,
    levelsLoad: PropTypes.func.isRequired,
  }

  static defaultProps = {
    levels: [],
  }

  componentDidMount() {
    this.props.levelsLoad();
  }

  render() {
    const { levels } = this.props;
    const PAGE_TITLE = 'Vocabulary: Levels';
    return (
      <div>
        <Helmet>
          <title>{PAGE_TITLE}</title>
          <meta name="description" content={`Kaniwani ${PAGE_TITLE}`} />
        </Helmet>
        <PageWrapper>
          <VocabPageHeader pageTitle={PAGE_TITLE} withVocabListToggle={false} />
          <VocabLevelsContainer levels={levels} />
        </PageWrapper>
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
    levelsLoad: () => dispatch(globalActions.levelsLoadRequest()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VocabLevelsPage);
