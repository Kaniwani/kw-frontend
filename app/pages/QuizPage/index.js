import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { HotKeys } from 'react-hotkeys';
import { titleCase } from 'voca';

import app from 'shared/actions';
import quiz from 'pages/QuizPage/actions';
import {
  selectUi,
  selectCategoryFromMatch,
  selectCurrent,
  selectQueueNeeded,
} from 'shared/selectors';
import { selectAnswerDisabled } from 'pages/QuizPage/selectors';

import backgroundImage from 'shared/assets/img/reviews.svg';
import QuizInfo from 'containers/QuizInfo';
import QuizAnswer from 'containers/QuizAnswer';
import QuizHeader from 'containers/QuizHeader';
import QuizQuestion from 'containers/QuizQuestion';
import { Wrapper, Upper, Lower, Background } from './styles';

const keyMap = {
  recordAnswer: 'enter',
  ignoreAnswer: '/',
  cycleInfoDetail: 'space',
  showNotes: 'n',
  showInfo: 'f',
  showSynonym: 's',
};

const shouldIgnore = ({ target }) =>
  Object.keys(target.dataset).includes('ignoreHotkeys');

const isInputField = ({ target }) =>
  ['INPUT', 'TEXTAREA'].includes(target.nodeName);

const isFormButton = ({ target }) => ['submit', 'reset'].includes(target.type);

const isLink = ({ target }) => target.href != null;

class QuizPage extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    loadUser: PropTypes.func.isRequired,
    loadQueue: PropTypes.func.isRequired,
    isQueueNeeded: PropTypes.bool.isRequired,
    current: PropTypes.object.isRequired,
    resetSession: PropTypes.func.isRequired,
    resetAnswer: PropTypes.func.isRequired,
    resetInfo: PropTypes.func.isRequired,
    redirectToSummary: PropTypes.func.isRequired,
    setNewCurrent: PropTypes.func.isRequired,
    category: PropTypes.string.isRequired,
    answerDisabled: PropTypes.bool.isRequired,
    recordAnswer: PropTypes.func.isRequired,
    ignoreAnswer: PropTypes.func.isRequired,
    cycleInfoDetail: PropTypes.func.isRequired,
    updateInfo: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (!this.props.isLoading) {
      if (!this.props.current.id) {
        this.props.setNewCurrent();
      }
      if (this.props.isQueueNeeded) {
        this.props.loadQueue();
      }
    }
  }

  componentDidUpdate(prevProps) {
    // no reviews in queue
    if (!this.props.current.id) {
      this.props.redirectToSummary();
    }
    // refocus after disabling answer (which blurs on disable and user can't access hotkeys)
    if (!prevProps.answerDisabled && this.props.answerDisabled) {
      this.wrapperRef.focus();
    }
  }

  componentWillUnmount() {
    this.props.resetSession(); // quiz summary
    this.props.resetAnswer();
    this.props.resetInfo();
    this.props.loadUser(); // load updated reviewcount
  }

  guardHandler = (event, handler) =>
    !this.props.answerDisabled || // ignore everything while user still answering
    shouldIgnore(event) ||
    isInputField(event) ||
    isFormButton(event) ||
    isLink(event)
      ? () => event
      : handler(event);

  cycleInfoDetail = (event) =>
    this.guardHandler(event, () => this.props.cycleInfoDetail() && false);

  showNotes = (event) =>
    this.guardHandler(
      event,
      () => this.props.updateInfo({ activePanel: 'NOTES' }) && false,
    );

  showInfo = (event) =>
    this.guardHandler(
      event,
      () => this.props.updateInfo({ activePanel: 'INFO' }) && false,
    );

  showSynonym = (event) =>
    this.guardHandler(
      event,
      () => this.props.updateInfo({ activePanel: 'SYNONYM' }) && false,
    );

  ignoreAnswer = (event) =>
    this.guardHandler(
      event,
      () => this.props.ignoreAnswer({ category: this.props.category }) && false,
    );

  recordAnswer = (event) =>
    this.guardHandler(
      event,
      () => this.props.recordAnswer({ category: this.props.category }) && false,
    );

  render() {
    const { category } = this.props;
    const title = `${titleCase(category)} Session`;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={`Kaniwani ${title}`} />
        </Helmet>
        <HotKeys
          keyMap={keyMap}
          handlers={{
            cycleInfoDetail: this.cycleInfoDetail,
            showNotes: this.showNotes,
            showInfo: this.showInfo,
            showSynonym: this.showSynonym,
            ignoreAnswer: this.ignoreAnswer,
            recordAnswer: this.recordAnswer,
          }}
        >
          <Wrapper
            tabIndex={-1}
            innerRef={(node) => {
              this.wrapperRef = node;
            }}
          >
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
}

const mapStateToProps = (state, props) => {
  const category = selectCategoryFromMatch(props);
  return {
    category,
    isLoading: selectUi(state)[category].loading,
    isQueueNeeded: selectQueueNeeded(state, { category }),
    current: selectCurrent(state),
    answerDisabled: selectAnswerDisabled(state),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const category = selectCategoryFromMatch(props);
  return {
    loadUser: () => dispatch(app.user.load.request()),
    loadQueue: () => dispatch(app[category].queue.load.request()),
    resetSession: () => dispatch(app.resetSession()),
    resetAnswer: () => dispatch(quiz.answer.reset()),
    resetInfo: () => dispatch(quiz.info.reset()),
    redirectToSummary: () => dispatch(push(`/${category}`)),
    recordAnswer: (payload) => dispatch(quiz.answer.submit(payload)),
    ignoreAnswer: (payload) => dispatch(quiz.answer.ignore(payload)),
    updateInfo: (payload) => dispatch(quiz.info.update(payload)),
    cycleInfoDetail: (payload) => dispatch(quiz.info.cycledetail(payload)),
    setNewCurrent: () => dispatch(app[category].current.set()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizPage);
