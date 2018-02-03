import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HotKeys } from 'react-hotkeys';
import { pure } from 'recompose';

import quiz from 'features/quiz/actions';
import { selectInfoOpen } from 'features/quiz/QuizSession/QuizInfo/selectors';
import { selectAnswerDisabled } from 'features/quiz/QuizSession/QuizAnswer/selectors';

import QuizHeader from './QuizHeader';
import QuizAnswer from './QuizAnswer';
import QuizQuestion from './QuizQuestion';
import QuizControls from './QuizControls';
import QuizInfo from './QuizInfo';

import AddSynonymModal from 'features/quiz/QuizSession/QuizInfo/AddSynonymModal';

import backgroundImage from 'common/assets/img/reviews.svg';
import { Upper, Lower, Background } from './styles';
const QuizBackground = pure(Background);

const shouldIgnore = ({ target }) => Object.keys(target.dataset).includes('ignoreHotkeys');
const isInputField = ({ target }) => ['INPUT', 'TEXTAREA'].includes(target.nodeName);
const isButton = ({ target }) => ['button', 'submit', 'reset'].includes(target.type);
const isLink = ({ target }) => target.href != null;

export class QuizSession extends React.Component {
  static propTypes = {
    isInfoOpen: PropTypes.bool.isRequired,
    isAnswerDisabled: PropTypes.bool.isRequired,
    startWrapUp: PropTypes.func.isRequired,
    showInfo: PropTypes.func.isRequired,
    cycleInfoDetail: PropTypes.func.isRequired,
    setSynonymModal: PropTypes.func.isRequired,
    ignoreAnswer: PropTypes.func.isRequired,
    confirmAnswer: PropTypes.func.isRequired,
  };

  guardHotKeyHandler = (handler) => (event) => {
    if (
      !this.props.isAnswerDisabled ||
      shouldIgnore(event) ||
      isInputField(event) ||
      isButton(event) ||
      isLink(event)
    ) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    handler();
  };

  handleOnInfo = (event) => {
    event.preventDefault();
    event.stopPropagation();
    return this.props.isInfoOpen ? this.props.cycleInfoDetail() : this.props.showInfo();
  };

  render() {
    const {
      startWrapUp,
      showInfo,
      cycleInfoDetail,
      setSynonymModal,
      ignoreAnswer,
      confirmAnswer,
    } = this.props;

    return (
      <HotKeys
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1 0 100%',
        }}
        keyMap={{
          wrapUp: 'w',
          showInfo: 'f',
          showSynonymModal: 's',
          cycleInfoDetail: 'space',
          ignoreAnswer: ['i', '/', 'backspace'],
          confirmAnswer: 'enter',
        }}
        handlers={{
          wrapUp: this.guardHotKeyHandler(startWrapUp),
          showInfo: this.guardHotKeyHandler(showInfo),
          cycleInfoDetail: this.guardHotKeyHandler(cycleInfoDetail),
          showSynonymModal: this.guardHotKeyHandler(() => setSynonymModal(true)),
          ignoreAnswer: this.guardHotKeyHandler(ignoreAnswer),
          confirmAnswer: this.guardHotKeyHandler(confirmAnswer),
        }}
      >
        <Upper>
          <QuizHeader />
          <QuizQuestion />
          <QuizAnswer />
        </Upper>
        <Lower>
          <QuizControls
            onWrapUp={startWrapUp}
            onInfo={this.handleOnInfo}
            onAddSynonym={() => setSynonymModal(true)}
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
});

// TODO: move synonymModal to info reducer
const mapDispatchToProps = {
  startWrapUp: () => quiz.session.setWrapUp(true),
  showInfo: quiz.info.show,
  setSynonymModal: (payload) => quiz.session.setSynonymModal(payload),
  cycleInfoDetail: quiz.info.cycleDetail,
  ignoreAnswer: quiz.answer.ignore,
  confirmAnswer: quiz.answer.confirm,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizSession);
