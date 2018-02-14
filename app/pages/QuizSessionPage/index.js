import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { titleCase } from 'voca';
import { get } from 'lodash';
import styled from 'styled-components';

import quiz from 'features/quiz/actions';
import { selectSessionFinished } from 'features/quiz/QuizSession/selectors';

import QuizSession from 'features/quiz/QuizSession';
// match review background image svg color
import { backgroundImageColor } from 'features/quiz/QuizSession/styles';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${backgroundImageColor};
  min-height: 100vh;
  width: 100%;
  padding-left: calc(50% - 2000px);
  padding-right: calc(50% - 2000px);
`;

export class QuizSessionPage extends React.Component {
  static propTypes = {
    category: PropTypes.string.isRequired,
    setSessionCategory: PropTypes.func.isRequired,
    startNewSession: PropTypes.func.isRequired,
    loadQueue: PropTypes.func.isRequired,
    isSessionFinished: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.props.startNewSession();
    this.props.setSessionCategory(this.props.category);
    this.props.loadQueue(this.props.category);
  }

  render() {
    if (this.props.isSessionFinished) {
      return <Redirect to={`/${this.props.category}`} />;
    }

    const pageTitle = `${titleCase(this.props.category)} Session`;

    return (
      <Wrapper>
        <Helmet>
          <title>{pageTitle}</title>
          <meta name="description" content={pageTitle} />
        </Helmet>
        <QuizSession category={this.props.category} />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, props) => {
  const category = get(props, 'match.params.category');
  return {
    category,
    isSessionFinished: selectSessionFinished(state, { category }),
  };
};

const mapDispatchToProps = {
  setSessionCategory: quiz.session.setCategory,
  startNewSession: quiz.session.reset,
  loadQueue: quiz.session.queue.load.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizSessionPage);
