import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PageWrapper from 'base/PageWrapper';
import AccuracyBar from 'components/AccuracyBar';
import SummarySection from 'components/SummarySection';
import ToggleVocabListButton from 'components/ToggleVocabListButton';

import {
  selectCorrectIds,
  selectIncorrectIds,
  selectCriticalIds,
  selectPercentCorrect,
} from 'containers/App/selectors';

import { Heading } from './styles';

SessionSummaryContent.propTypes = {
  correctIds: PropTypes.array.isRequired,
  incorrectIds: PropTypes.array.isRequired,
  criticalIds: PropTypes.array.isRequired,
  percentCorrect: PropTypes.number.isRequired,
};

function SessionSummaryContent({
  correctIds,
  incorrectIds,
  criticalIds,
  percentCorrect,
}) {
  return (
    <PageWrapper>
      <Heading>
        <AccuracyBar percent={percentCorrect} />
        <ToggleVocabListButton />
      </Heading>
      <SummarySection
        summaryType="INCORRECT"
        ids={incorrectIds}
      />
      <SummarySection
        summaryType="CORRECT"
        ids={correctIds}
      />
      <SummarySection
        summaryType="CRITICAL"
        ids={criticalIds}
      />
    </PageWrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  correctIds: selectCorrectIds,
  incorrectIds: selectIncorrectIds,
  criticalIds: selectCriticalIds,
  percentCorrect: selectPercentCorrect,
});

export default connect(mapStateToProps)(SessionSummaryContent);
