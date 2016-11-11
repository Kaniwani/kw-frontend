import React, { PropTypes } from 'react';
import styles from './style.css';

const Question = ({ question }) => (
  <div className={styles.base}>
    <h1 id="meaning" className="meaning">{ question }</h1>
  </div>
);

Question.propTypes = {
  question: PropTypes.string,
};

export default Question;
