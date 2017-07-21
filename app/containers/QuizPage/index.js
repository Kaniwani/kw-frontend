import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { HotKeys } from 'react-hotkeys';
import titleCase from 'voca/title_case';
import { compose, withHandlers } from 'recompose';

import quiz from 'containers/QuizPage/actions';
import { selectCategoryFromMatch } from 'containers/App/selectors';
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
};

const keyMap = {
  recordAnswer: 'enter',
  ignoreAnswer: '/',
  cycleInfoDetail: 'space',
  showNotes: 'n',
  showInfo: 'f',
  showSynonym: 's',
};

// pass through event on these
const ignoreShortcut = (answerDisabled, handler) => (event) => (
  ['INPUT', 'TEXTAREA'].includes(event.target.nodeName) || !answerDisabled ?
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
}) {
  const title = `${titleCase(category)} Session`;

  const handlers = {
    recordAnswer: ignoreShortcut(answerDisabled, (event) => {
      // don't capture on form buttons or links
      if (['submit', 'reset'].includes(event.target.type) || event.target.href != null) {
        return event;
      }
      return recordAnswer() && false; // prevent propagation if we handle
    }),
    ignoreAnswer: ignoreShortcut(answerDisabled, () => ignoreAnswer() && false),
    cycleInfoDetail: ignoreShortcut(answerDisabled, () => cycleInfoDetail() && false),
    showNotes: ignoreShortcut(answerDisabled, () => showNotes() && false),
    showInfo: ignoreShortcut(answerDisabled, () => showInfo() && false),
    showSynonym: ignoreShortcut(answerDisabled, () => showSynonym() && false),
  };

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
            {/* <ReviewAnswerContainer category={category} /> */}
            <QuizAnswer category={category} />
            <QuizInfo category={category} />
            <Background imgSrc={backgroundImage} />
          </Lower>
        </Wrapper>
      </HotKeys>
    </div>
  );
}

const mapStateToProps = (state, props) => ({
  category: selectCategoryFromMatch(props),
  answerDisabled: selectAnswerDisabled(state),
});

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
