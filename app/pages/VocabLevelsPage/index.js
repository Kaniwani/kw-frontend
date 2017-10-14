import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import PageWrapper from 'base/PageWrapper';
import VocabPageHeader from 'components/VocabPageHeader';
import VocabLevelsList from 'components/VocabLevelsList';

import actions from 'components/App/actions';

export class VocabLevelsPage extends React.Component {
  static propTypes = {
    loadLevels: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.loadLevels();
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
          <VocabLevelsList />
        </PageWrapper>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadLevels: () => dispatch(actions.levels.load.request()),
});

export default connect(null, mapDispatchToProps)(VocabLevelsPage);
