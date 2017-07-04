import React from 'react';
import PropTypes from 'prop-types';

import PageWrapper from 'base/PageWrapper';
import AccuracyBar from 'components/AccuracyBar';
import SummarySection from 'components/SummarySection';
import ToggleVocabListType from 'components/ToggleVocabListType';

import { Heading } from './styles';

SessionSummaryContent.propTypes = {
  correctItems: PropTypes.array.isRequired,
  incorrectItems: PropTypes.array.isRequired,
  criticalItems: PropTypes.array.isRequired,
  percentCorrect: PropTypes.number.isRequired,
  vocabListExpanded: PropTypes.bool.isRequired,
  onVocabListToggle: PropTypes.func.isRequired,
};

function SessionSummaryContent({
  correctItems,
  incorrectItems,
  criticalItems,
  percentCorrect,
  vocabListExpanded,
  onVocabListToggle,
}) {
  return (
    <PageWrapper>
      <Heading>
        <AccuracyBar percent={percentCorrect} />
        <ToggleVocabListType
          isExpanded={vocabListExpanded}
          handleClick={onVocabListToggle}
        />
      </Heading>
      <SummarySection
        isExpanded={vocabListExpanded}
        items={correctItems}
        category={'CORRECT'}
      />
      <SummarySection
        isExpanded={vocabListExpanded}
        items={incorrectItems}
        category={'INCORRECT'}
      />
      <SummarySection
        isExpanded={vocabListExpanded}
        items={criticalItems}
        category={'CRITICAL'}
      />
    </PageWrapper>
  );
}

export default SessionSummaryContent;
