import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import ReactTooltip from 'react-tooltip';
import titleCase from 'voca/title_case';

import SessionSummaryHeader from 'components/SessionSummaryHeader';
import SessionSummaryContent from 'components/SessionSummaryContent';

import {
  selectRemainingCount,
  makeSelectCorrectItems,
  makeSelectIncorrectItems,
  makeSelectCriticalItems,
  makeSelectPercentCorrect,
} from 'containers/SessionRoutes/selectors';

class SessionSummaryPage extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    remaining: PropTypes.number.isRequired,
    correctItems: PropTypes.array.isRequired,
    incorrectItems: PropTypes.array.isRequired,
    criticalItems: PropTypes.array.isRequired,
    percentCorrect: PropTypes.number.isRequired,
  }

  // FIXME: state.global.settings.vocabListExpanded
  state = {
    vocabListExpanded: false,
  }

  // FIXME: same code is in vocabLevel page, share with a HoC instead
  componentDidUpdate(prevProps, prevState) {
    const switchedToCompact = !this.state.vocabListExpanded && prevState.vocabListExpanded;
    if (switchedToCompact) {
      ReactTooltip.rebuild();
    }
  }

  toggleVocabListType = () => this.setState({ vocabListExpanded: !this.state.vocabListExpanded });

  render() {
    const {
      match: { params },
      remaining,
      ...rest
    } = this.props;

    const categoryTitle = titleCase(params.category);

    return (
      <div>
        <Helmet>
          <title>{`${categoryTitle} Summary`}</title>
          <meta name="description" content={`Kaniwani ${categoryTitle} Summary`} />
        </Helmet>
        <SessionSummaryHeader
          category={params.category}
          linkRoute={`/${params.category}/session`}
          count={remaining}
        />
        <SessionSummaryContent
          onVocabListToggle={this.toggleVocabListType}
          vocabListExpanded={this.state.vocabListExpanded}
          {...rest}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  remaining: selectRemainingCount,
  correctItems: makeSelectCorrectItems(),
  incorrectItems: makeSelectIncorrectItems(),
  criticalItems: makeSelectCriticalItems(),
  percentCorrect: makeSelectPercentCorrect(),
});

export default connect(mapStateToProps)(SessionSummaryPage);
