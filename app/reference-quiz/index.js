import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from './style.css';
import QuizHeader from './components/QuizHeader';
import Quiz from './components/Quiz';
import QuizInfo from './components/QuizInfo';
import QuizBg from './components/QuizBg';

const cx = classNames.bind(styles);

class QuizApp extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    optionalClassName: PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    };
  }
  render() {
    const className = cx('base', this.props.optionalClassName, {
      fullWidth: true,
    });
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
