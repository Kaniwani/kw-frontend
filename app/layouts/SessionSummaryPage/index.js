import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import Helmet from 'react-helmet';
import titleCase from 'voca/title_case';

import { CORRECT, INCORRECT, CRITICAL } from 'components/SummarySection/constants';
import PageWrapper from 'layouts/PageWrapper';
import SessionSummaryHeader from 'components/SessionSummaryHeader';
import AccuracyBar from 'components/AccuracyBar';
import SummarySection from 'components/SummarySection';
import ToggleVocabListType from 'components/ToggleVocabListType';

import { Heading } from './styles';

class SessionSummaryPage extends React.PureComponent {
  static propTypes = {
    correctItems: PropTypes.array,
    incorrectItems: PropTypes.array,
    criticalItems: PropTypes.array,
    percentCorrect: PropTypes.number,
    remainingCount: PropTypes.number,
    category: PropTypes.string,
    resumeSessionRoute: PropTypes.string,
  };

  static defaultProps = {
    correctItems: [],
    incorrectItems: [],
    criticalItems: [],
    percentCorrect: 0,
    remainingCount: 0,
    category: 'review',
    resumeSessionRoute: '/reviews/',
  };

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
    const categoryTitle = titleCase(this.props.category);

    return (
      <div>
        <Helmet>
          <title>{`${categoryTitle} Session Summary`}</title>
          <meta name="description" content={`Kaniwani ${categoryTitle} Session Summary`} />
        </Helmet>
        <SessionSummaryHeader
          category={this.props.category}
          linkRoute={this.props.resumeSessionRoute}
          count={this.props.remainingCount}
        />
        <PageWrapper>
          <Heading>
            <AccuracyBar percent={this.props.percentCorrect} />
            <ToggleVocabListType
              isExpanded={this.state.vocabListExpanded}
              handleClick={this.toggleVocabListType}
            />
          </Heading>
          <SummarySection
            isExpanded={this.state.vocabListExpanded}
            items={this.props.correctItems}
            type={CORRECT}
          />
          <SummarySection
            isExpanded={this.state.vocabListExpanded}
            items={this.props.incorrectItems}
            type={INCORRECT}
          />
          <SummarySection
            isExpanded={this.state.vocabListExpanded}
            items={this.props.criticalItems}
            type={CRITICAL}
          />
        </PageWrapper>
      </div>
    );
  }
}

export default SessionSummaryPage;
