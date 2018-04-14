import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HotKeys } from 'react-hotkeys';
import { pure } from 'recompose';

import quiz from 'features/quiz/actions';
import { selectInfoOpen } from 'features/quiz/QuizSession/QuizInfo/selectors';
import { selectIsLessonQuiz } from 'features/quiz/QuizSession/selectors';
import { selectAnswerDisabled } from 'features/quiz/QuizSession/QuizAnswer/selectors';
import { stopAutoAdvance } from 'features/quiz/QuizSession/QuizAnswer/logic';

import QuizHeader from './QuizHeader';
import QuizAnswer from './QuizAnswer';
import QuizQuestion from './QuizQuestion';
import QuizControls from './QuizControls';
import QuizInfo from './QuizInfo';

import AddSynonymModal from 'features/quiz/QuizSession/QuizInfo/AddSynonymModal';

import backgroundImage from 'common/assets/img/reviews.svg';
import { Upper, Lower, Background } from './styles';
import { SRS_COLORS } from 'common/styles/colors';
const QuizBackground = pure(Background);

const isInputField = ({ target }) => ['INPUT', 'TEXTAREA'].includes(target.nodeName);
const isButton = ({ target }) => ['button', 'submit', 'reset'].includes(target.type);
const isLink = ({ target }) => target.href != null;

export class QuizSession extends React.Component {
  static propTypes = {
    isInfoOpen: PropTypes.bool.isRequired,
    isAnswerDisabled: PropTypes.bool.isRequired,
    isLessonQuiz: PropTypes.bool.isRequired,
    toggleWrapUp: PropTypes.func.isRequired,
    showInfo: PropTypes.func.isRequired,
    cycleInfoDetail: PropTypes.func.isRequired,
    setSynonymModal: PropTypes.func.isRequired,
    ignoreAnswer: PropTypes.func.isRequired,
    confirmAnswer: PropTypes.func.isRequired,
  };

  guardHotKeyHandler = (handler) => (event) => {
    if (!this.props.isAnswerDisabled || isInputField(event) || isButton(event) || isLink(event)) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    handler();
  };

  handleAddSynonym = () => {
    this.props.setSynonymModal(true);
  };

  handleOnInfo = (event) => {
    event.preventDefault();
    event.stopPropagation();
    return this.props.isInfoOpen ? this.props.cycleInfoDetail() : this.props.showInfo();
  };

  render() {
    const {
      toggleWrapUp,
      showInfo,
      cycleInfoDetail,
      ignoreAnswer,
      confirmAnswer,
      isLessonQuiz,
    } = this.props;

    return (
      <HotKeys
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1 0 100%',
          minHeight: '100vh',
        }}
        keyMap={{
          stopAutoAdvance: 'c',
          wrapUp: 'w',
          showInfo: 'f',
          showSynonymModal: 's',
          cycleInfoDetail: 'space',
          ignoreAnswer: ['i', '/', 'backspace'],
          confirmAnswer: 'enter',
        }}
        handlers={{
          stopAutoAdvance: this.guardHotKeyHandler(stopAutoAdvance),
          wrapUp: this.guardHotKeyHandler(toggleWrapUp),
          showInfo: this.guardHotKeyHandler(showInfo),
          cycleInfoDetail: this.guardHotKeyHandler(cycleInfoDetail),
          showSynonymModal: this.guardHotKeyHandler(this.handleAddSynonym),
          ignoreAnswer: this.guardHotKeyHandler(ignoreAnswer),
          confirmAnswer: this.guardHotKeyHandler(confirmAnswer),
        }}
      >
        <Upper bgColor={isLessonQuiz ? SRS_COLORS.UNTRAINED : SRS_COLORS.GURU}>
          <QuizHeader />
          <QuizQuestion />
          <QuizAnswer />
        </Upper>
        <Lower>
          <QuizControls
            onWrapUp={toggleWrapUp}
            onInfo={this.handleOnInfo}
            onAddSynonym={this.handleAddSynonym}
          />
          <QuizInfo />
          <AddSynonymModal />
          <QuizBackground imgSrc={backgroundImage} />
        </Lower>
      </HotKeys>
    );
  }
}

const mapStateToProps = (state, props) => ({
  isInfoOpen: selectInfoOpen(state, props),
  isAnswerDisabled: selectAnswerDisabled(state, props),
  isLessonQuiz: selectIsLessonQuiz(state, props),
});

const mapDispatchToProps = {
  toggleWrapUp: quiz.session.wrapUp.toggle,
  showInfo: quiz.info.show,
  setSynonymModal: quiz.session.setSynonymModal,
  cycleInfoDetail: quiz.info.cycleDetail,
  ignoreAnswer: quiz.answer.ignore,
  confirmAnswer: quiz.answer.confirm,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizSession);
