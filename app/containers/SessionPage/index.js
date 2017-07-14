import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import titleCase from 'voca/title_case';

import {
  selectCategoryFromMatch,
  selectCurrentId,
  makeSelectReview,
} from 'containers/App/selectors';
import backgroundImage from 'shared/assets/img/reviews.svg';
// import QuizInfo from 'containers/QuizInfo';
import QuizAnswer from 'containers/QuizAnswer';
import QuizHeader from 'components/QuizHeader';
import QuizQuestion from 'components/QuizQuestion';
import { Wrapper, Upper, Lower, Background } from './styles';
import actions from './actions';

SessionPage.propTypes = {
  category: PropTypes.string.isRequired,
  submitAnswer: PropTypes.func.isRequired,
  updateAnswer: PropTypes.func.isRequired,
  ignoreAnswer: PropTypes.func.isRequired,
};

// check target isn't synonym form?
// import { SRS_RANKS, KEYCODES } from 'shared/constants';
//
/*
getKeyHandler = (keycode) => ({
  [KEYCODES.ENTER]: this.props.recordAnswer,
  [KEYCODES.SPACE]: this.props.cycleInfoDetail,
  [KEYCODES.N_LOWERCASE]: () => this.props.showPanel('notes'),
  [KEYCODES.F_LOWERCASE]: () => this.props.showPanel('info'),
  [KEYCODES.S_LOWERCASE]: () => this.props.showPanel('synonym'),
  [KEYCODES.I_LOWERCASE]: this.handleIgnore,
  [KEYCODES.BACKSPACE]: this.handleIgnore,
  [KEYCODES.FORWARD_SLASH]: this.handleIgnore,
}[keycode])

handleKeyDown = (event) => {
  const action = this.getKeyHandler(event.keyCode);
  if (this.props.answer.disabled && action) {
    blockEvent(event);
    action();
  }
}
*/

function SessionPage({ category, submitAnswer, updateAnswer, ignoreAnswer }) {
  const title = `${titleCase(category)} Session`;
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`Kaniwani ${title}`} />
      </Helmet>
      <Wrapper>
        <Upper>
          <QuizHeader category={category} />
          <QuizQuestion category={category} />
        </Upper>
        <Lower>
          {/* <ReviewAnswerContainer category={category} /> */}
          <QuizAnswer
            category={category}
            handleSubmit={submitAnswer}
            handleUpdate={updateAnswer}
            handleIgnore={ignoreAnswer}
          />
          {/* <QuizInfo id={currentId} /> */}
          <Background imgSrc={backgroundImage} />
        </Lower>
      </Wrapper>
    </div>
  );
}

const mapStateToProps = (state, props) => {
  const category = selectCategoryFromMatch(props);
  const currentId = selectCurrentId(state, { category });
  return {
    category,
    currentId,
    review: makeSelectReview(currentId)(state),
  };
};

const mapDispatchToProps = {
  updateAnswer: actions.answer.update,
  submitAnswer: actions.answer.submit,
  ignoreAnswer: actions.answer.ignore,
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  // zermahgerd - passing props from mapStateToProps into handlers
  // could have used connect's mergeProps, but this should be more performant
  withHandlers({
    updateAnswer: ({ updateAnswer, currentId, review, category }) => (payload) =>
      updateAnswer(payload, { currentId, review, category }),
    submitAnswer: ({ submitAnswer, currentId, review, category }) => (payload) =>
      submitAnswer(payload, { currentId, review, category }),
    ignoreAnswer: ({ ignoreAnswer, currentId, review, category }) => (payload) =>
      ignoreAnswer(payload, { currentId, review, category }),
  })
);

export default enhance(SessionPage);
