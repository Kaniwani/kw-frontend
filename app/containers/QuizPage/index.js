import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { HotKeys } from 'react-hotkeys';
import titleCase from 'voca/title_case';
import { compose, withHandlers } from 'recompose';

import quiz from 'containers/QuizPage/actions';
import { selectCategoryFromMatch, selectRemainingCount, selectCurrentId } from 'containers/App/selectors';
import { selectAnswerDisabled } from 'containers/QuizPage/selectors';

import backgroundImage from 'shared/assets/img/reviews.svg';
import QuizInfo from 'containers/QuizInfo';
import QuizAnswer from 'containers/QuizAnswer';
import QuizHeader from 'components/QuizHeader';
import QuizQuestion from 'components/QuizQuestion';
import { Wrapper, Upper, Lower, Background } from './styles';

QuizPage.propTypes = {
  category: PropTypes.string.isRequired,
  answerDisabled: PropTypes.bool.isRequired,
  recordAnswer: PropTypes.func.isRequired,
  ignoreAnswer: PropTypes.func.isRequired,
  cycleInfoDetail: PropTypes.func.isRequired,
  showNotes: PropTypes.func.isRequired,
  showInfo: PropTypes.func.isRequired,
  showSynonym: PropTypes.func.isRequired,
  remainingCount: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
};

const keyMap = {
  recordAnswer: 'enter',
  ignoreAnswer: '/',
  cycleInfoDetail: 'space',
  showNotes: 'n',
  showInfo: 'f',
  showSynonym: 's',
};

const isInputField = (event) => ['INPUT', 'TEXTAREA'].includes(event.target.nodeName);
const isFormButton = (event) => ['submit', 'reset'].includes(event.target.type);
const isLink = (event) => event.target.href != null;
const guardHandler = (answerDisabled, handler) => (event) => (
  isInputField(event) || !answerDisabled ?
    () => event :
    handler(event)
);

function QuizPage({
  category,
  answerDisabled,
  recordAnswer,
  ignoreAnswer,
  cycleInfoDetail,
  showNotes,
  showInfo,
  showSynonym,
  remainingCount,
  current,
}) {
  const title = `${titleCase(category)} Session`;

  const handlers = {
    cycleInfoDetail: guardHandler(answerDisabled, () => cycleInfoDetail() && false),
    showNotes: guardHandler(answerDisabled, () => showNotes() && false),
    showInfo: guardHandler(answerDisabled, () => showInfo() && false),
    showSynonym: guardHandler(answerDisabled, () => showSynonym() && false),
    ignoreAnswer: guardHandler(answerDisabled, () => ignoreAnswer() && false),
    recordAnswer: guardHandler(answerDisabled, (event) => (
      isFormButton(event) || isLink(event) ?
        event :
        recordAnswer() && false
      )
    ),
  };

  if (remainingCount < 1 && !current) {
    return <Redirect to={`/${category}`} />;
  }

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`Kaniwani ${title}`} />
      </Helmet>
      <HotKeys keyMap={keyMap} handlers={handlers}>
        <Wrapper>
          <Upper>
            <QuizHeader category={category} />
            <QuizQuestion category={category} />
          </Upper>
          <Lower>
            <QuizAnswer category={category} />
            <QuizInfo category={category} />
            <Background imgSrc={backgroundImage} />
          </Lower>
        </Wrapper>
      </HotKeys>
    </div>
  );
}

const mapStateToProps = (state, props) => {
  const category = selectCategoryFromMatch(props);
  return {
    category,
    answerDisabled: selectAnswerDisabled(state),
    remainingCount: selectRemainingCount(state, { category }),
    current: selectCurrentId(state, { category }),
  };
};

const mapDispatchToProps = {
  recordAnswer: quiz.answer.submit, // will fall through to record logic with modified payload
  ignoreAnswer: quiz.answer.ignore,
  updateInfo: quiz.info.update,
  cycleInfoDetail: quiz.info.cycledetail,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    recordAnswer: ({ recordAnswer, category }) => () => recordAnswer({ category }),
    ignoreAnswer: ({ ignoreAnswer, category }) => () => ignoreAnswer({ category }),
    cycleInfoDetail: ({ cycleInfoDetail }) => () => cycleInfoDetail(),
    showNotes: ({ updateInfo }) => () => updateInfo({ activePanel: 'NOTES' }),
    showInfo: ({ updateInfo }) => () => updateInfo({ activePanel: 'INFO' }),
    showSynonym: ({ updateInfo }) => () => updateInfo({ activePanel: 'SYNONYM' }),
  }),
);

export default enhance(QuizPage);
