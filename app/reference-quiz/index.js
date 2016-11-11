import React, { Component, PropTypes } from 'react';
import QuizHeader from './components/QuizHeader';
import Quiz from './components/Quiz';
import QuizInfo from './components/QuizInfo';
import QuizBg from './components/QuizBg';

// old .review-section css
/*
.base {
  display: table;
  width: 100%;
  height: 100%;
}
*/

class QuizApp extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    };
  }
  render() {
    return (
      <section className={className}>
        <QuizHeader />
        <Quiz />
        <QuizInfo />
        <QuizBg />
      </section>
    );
  }
}

export default QuizApp;
