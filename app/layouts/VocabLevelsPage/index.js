import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import ReactTooltip from 'react-tooltip';

import SiteHeader from 'components/SiteHeader';
import VocabPageHeader from 'components/VocabPageHeader';
import VocabLevelList from 'components/VocabLevelList';
import PageWrapper from 'layouts/PageWrapper';

class VocabLevelsPage extends React.Component {
  static propTypes = {
    levels: PropTypes.array.isRequired,
    userWKLevel: PropTypes.number.isRequired,
  }

  state = {
    vocabListExpanded: false,
  }

  componentDidUpdate(prevProps, prevState) {
    const switchedToCompact = (!this.state.vocabListExpanded) && prevState.vocabListExpanded;
    if (switchedToCompact) {
      ReactTooltip.rebuild();
    }
  }

  toggleVocabListType= () => {
    this.setState((prevState) => ({ vocabListExpanded: !prevState.vocabListExpanded }));
  }

  render() {
    const PAGE_TITLE = 'Vocabulary: Levels';
    const { levels, userWKLevel } = this.props;

    return (
      <div>
        <Helmet>
          <title>{PAGE_TITLE}</title>
          <meta name="description" content={`Kaniwani${PAGE_TITLE}`} />
        </Helmet>
        <SiteHeader />
        <PageWrapper>
          <VocabPageHeader
            pageTitle={PAGE_TITLE}
            vocabListExpanded={this.state.vocabListExpanded}
            handleToggleVocabList={this.toggleVocabListType}
          />
          <VocabLevelList
            levels={levels}
            userWKLevel={userWKLevel}
          />
        </PageWrapper>
      </div>
    );
  }
}

export default VocabLevelsPage;
