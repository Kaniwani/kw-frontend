import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { branch, renderComponent } from 'recompose';
import titleCase from 'voca/title_case';

import {
  selectCurrentId,
  makeSelectReviewMeanings,
  makeSelectReviewReadings,
} from 'containers/App/selectors';

import LoadingIndicator from 'components/LoadingIndicator';

import {
  Wrapper,
  QuestionWrapper,
  Question,
  Primary,
  Secondary,
  Tags,
} from './styles';

QuizQuestion.propTypes = {
  meanings: PropTypes.array.isRequired,
  readings: PropTypes.array.isRequired,
};

const enhance = branch(
  ({ meanings, readings }) => !meanings || !readings,
  renderComponent(LoadingIndicator)
);

function QuizQuestion({ meanings, readings }) {
  const [first, ...rest] = meanings;
  return (
    <Wrapper>
      <QuestionWrapper>
        <Question>
          <Primary>{titleCase(first)}</Primary>
          {rest.length > 0 && <Secondary>{rest.join(', ')}</Secondary>}
        </Question>
      </QuestionWrapper>
      <Tags tags={readings[0].tags} />
    </Wrapper>
  );
}

const mapStateToProps = (state, { category }) => {
  const id = selectCurrentId(state, { category });
  return {
    meanings: makeSelectReviewMeanings(id)(state),
    readings: makeSelectReviewReadings(id)(state),
  };
};

export default connect(mapStateToProps)(enhance(QuizQuestion));
