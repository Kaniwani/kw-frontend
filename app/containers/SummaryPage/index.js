import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import {
  selectIgnoredCount,
  selectCorrectItems,
  selectIncorrectItems,
  selectCriticalItems,
  selectPercentCorrect,
} from './selectors';

import { Link } from 'react-router';
import SummarySection from './SummarySection';

import { bgGradient } from 'shared/styles/utils';
import { purple, purpleDark } from 'shared/styles/colors';


// TODO: extract and allow color etc to be passed as props
const PercentageBar = styled.div`
${bgGradient(`rgba(${purpleDark}, 0.1)`, 'left')}
  height: 1.75rem;
  border-radius: 3px;
`;

const Percentage = styled.div`
  ${bgGradient(`rgb(${purple})`, 'left')}
  display: block;
  height: 100%;
  transition: width .8s ease-in-out;
  width: ${(props) => props.width}%; /* TODO: animate reactily */
`;

export class SummaryPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    correctItems: PropTypes.object,
    incorrectItems: PropTypes.object,
    criticalItems: PropTypes.object,
    ignoredCount: PropTypes.number,
    percentCorrect: PropTypes.number,
  }

  render() {
    const { percentCorrect, ignoredCount } = this.props;
    let { correctItems, incorrectItems, criticalItems } = this.props;

    let content = (
      <div className="inner">
        <div>No reviews completed</div>
      </div>
    );

    correctItems = correctItems.toJS();
    incorrectItems = incorrectItems.toJS();
    criticalItems = criticalItems.toJS();

    if (correctItems.length || incorrectItems.length) {
      content = (
        <div className="inner">
          <h1 className="section-heading correctPercent">{percentCorrect}% Accuracy</h1>
          <PercentageBar>
            <Percentage width={percentCorrect} />
          </PercentageBar>
          <SummarySection items={incorrectItems} count={incorrectItems.length} correct={false} />
          <SummarySection items={correctItems} count={correctItems.length} correct />
          {criticalItems.length &&
            <div>
              <h3>Critical Items:</h3>
              {criticalItems.map((item, index) => <p key={`crit-${index}`}>{item.vocabulary.meaning}</p>)}
            </div>
          }
          { ignoredCount && <h4>Items ignored: {ignoredCount}</h4>}
        </div>
      );
    }

    return (
      <div>
        <Helmet
          title="SummaryPage"
          meta={[
            { name: 'description', content: 'Description of SummaryPage' },
          ]}
        />
        <section className="summary-section">
          <Link to="/review">Return to review</Link>
          {content}
        </section>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  correctItems: selectCorrectItems(),
  incorrectItems: selectIncorrectItems(),
  criticalItems: selectCriticalItems(),
  ignoredCount: selectIgnoredCount(),
  percentCorrect: selectPercentCorrect(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryPage);
