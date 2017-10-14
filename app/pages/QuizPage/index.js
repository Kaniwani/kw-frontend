import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { HotKeys } from 'react-hotkeys';
import { titleCase } from 'voca';
import { compose } from 'recompose';

import app from 'components/App/actions';
import quiz from 'pages/QuizPage/actions';
import { selectUi, selectCategoryFromMatch, selectCurrent } from 'components/App/selectors';
import { selectAnswerDisabled } from 'pages/QuizPage/selectors';

import backgroundImage from 'shared/assets/img/reviews.svg';
import QuizInfo from 'components/QuizInfo';
import QuizAnswer from 'components/QuizAnswer';
import QuizHeader from 'components/QuizHeader';
import QuizQuestion from 'components/QuizQuestion';
import { Wrapper, Upper, Lower, Background } from './styles';

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
const isQuizToggle = (event) => event.target.matches('.quizToggle');
const isLink = (event) => event.target.href != null;

class QuizPage extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    current: PropTypes.object.isRequired,
    resetSession: PropTypes.func.isRequired,
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
    if (!this.props.isLoading && !this.props.current.id) {
      this.props.setNewCurrent();
    }
  }

  componentDidUpdate() {
    if (!this.props.current.id) {
      this.props.redirectToSummary();
    }
  }

  componentWillUnmount() {
    this.props.resetSession();
    this.props.loadUser();
  }

  guardHandler = (event, handler) => (
    isInputField(event) || !this.props.answerDisabled ?
      () => event :
      handler(event)
  );

  cycleInfoDetail = (event) => this.guardHandler(event,
    () => isQuizToggle(event) ? event : this.props.cycleInfoDetail() && false
  )
  showNotes = (event) => this.guardHandler(event,
    () => this.props.updateInfo({ activePanel: 'NOTES' }) && false
  )
  showInfo = (event) => this.guardHandler(event,
    () => this.props.updateInfo({ activePanel: 'INFO' }) && false
  )
  showSynonym = (event) => this.guardHandler(event,
    () => this.props.updateInfo({ activePanel: 'SYNONYM' }) && false
  )
  ignoreAnswer = (event) => this.guardHandler(event,
    () => this.props.ignoreAnswer({ category: this.props.category }) && false
  )
  recordAnswer = (event) => this.guardHandler(event,
    () => isFormButton(event) || isLink(event) ?
      event :
      this.props.recordAnswer({ category: this.props.category }) && false
  )

  render() {
    const { category } = this.props;

    const title = `${titleCase(category)} Session`;

    const handlers = {
      cycleInfoDetail: this.cycleInfoDetail,
      showNotes: this.showNotes,
      showInfo: this.showInfo,
      showSynonym: this.showSynonym,
      ignoreAnswer: this.ignoreAnswer,
      recordAnswer: this.recordAnswer,
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
    current: selectCurrent(state),
    answerDisabled: selectAnswerDisabled(state),
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  loadUser: () => dispatch(app.user.load.request()),
  resetSession: () => dispatch(app.resetSession()),
  redirectToSummary: () => dispatch(push(`/${selectCategoryFromMatch(props)}`)),
  recordAnswer: (payload) => dispatch(quiz.answer.submit(payload)),
  ignoreAnswer: (payload) => dispatch(quiz.answer.ignore(payload)),
  updateInfo: (payload) => dispatch(quiz.info.update(payload)),
  cycleInfoDetail: (payload) => dispatch(quiz.info.cycledetail(payload)),
  setNewCurrent: () => dispatch(app[selectCategoryFromMatch(props)].current.set()),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(QuizPage);
