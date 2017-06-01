import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import Helmet from 'react-helmet';

import SiteHeader from 'components/SiteHeader';
import VocabPageHeader from 'components/VocabPageHeader';
import VocabList from 'components/VocabList';
import PageWrapper from 'layouts/PageWrapper';

import { VocabListWrapper } from './styles';

export class VocabEntriesPage extends React.Component {
  static propTypes = {
    entries: PropTypes.array.isRequired,
    level: PropTypes.number.isRequired,
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

  toggleVocabListType = () => {
    this.setState(prevState => ({ vocabListExpanded: !prevState.vocabListExpanded }));
  }

  render() {
    const { entries, level } = this.props;
    const PAGE_TITLE = `Vocabulary: Level ${level}`;

    return (
      <div>
        <Helmet>
          <title>{PAGE_TITLE}</title>
          <meta name="description" content={`Kaniwani ${PAGE_TITLE}`} />
        </Helmet>
        <SiteHeader />
        <PageWrapper>
          <VocabPageHeader
            pageTitle={PAGE_TITLE}
            withVocabListToggle={{
              isExpanded: this.state.vocabListExpanded,
              handleToggle: this.toggleVocabListType,
            }}
          />
          <VocabListWrapper>
            <VocabList items={entries} isExpanded={this.state.vocabListExpanded} />
          </VocabListWrapper>
        </PageWrapper>
      </div>
    );
  }
}

export default VocabEntriesPage;
