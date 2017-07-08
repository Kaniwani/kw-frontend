import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import PageWrapper from 'base/PageWrapper';
import VocabPageHeader from 'components/VocabPageHeader';
import VocabLevelsList from 'components/VocabLevelsList';

import actions from 'containers/App/actions';
import { selectLevelIds } from 'containers/App/selectors';

export class VocabLevelsPage extends React.Component {
  static propTypes = {
    levels: PropTypes.array.isRequired,
    loadLevels: PropTypes.func.isRequired,
  }

  componentDidMount() {
    if (!this.props.levels.length) {
      this.props.loadLevels();
    }
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
          <VocabPageHeader pageTitle={PAGE_TITLE} withVocabListToggle={false} />
          <VocabLevelsList levels={this.props.levels} />
        </PageWrapper>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  levels: selectLevelIds,
});

const mapDispatchToProps = (dispatch) => ({
  loadLevels: () => dispatch(actions.levels.load.request()),
});

export default connect(mapStateToProps, mapDispatchToProps)(VocabLevelsPage);
