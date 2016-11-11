import React from 'react';
import styles from './style.css';
import ProgressBar from '../ProgressBar';
import ExitQuizLink from '../ExitQuizLink';
import StatsList from '../StatsList';

const QuizHeader = () => (
  <div className={styles.base}>
    <ProgressBar />
    <ExitQuizLink />
    <StatsList />
  </div>
);

export default QuizHeader;
