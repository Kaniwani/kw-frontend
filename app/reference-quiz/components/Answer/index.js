import React from 'react';
import StreakIcon from '../StreakIcon';
import IgnoreButton from '../IgnoreButton';
import SubmitButton from '../SubmitButton';

const Answer = () => (
  <form id="answerPanel" className="answerpanel" style={{ height: '66vh' }}>
    <StreakIcon />
    <label
      htmlFor="userAnswer"
      className="question u-visuallyhidden"
    >
      Vocabulary
      <strong>reading</strong>
    </label>
    <input
      id="userAnswer"
      lang="ja"
      className="answer"
      type="text"
      placeholder="答え"
      autoCapitalize="off"
      autoCorrect="off"
      spellCheck="false"
      autoComplete="off"
    />
    <IgnoreButton />
    <SubmitButton />
    <div
      id="srsUp"
      className="srs-up"
    >
      <div className="content icon i-plus" data-after />
    </div>
    <div
      id="srsDown"
      className="srs-down"
    >
      <div className="content icon i-minus" data-after />
    </div>
  </form>
);

export default Answer;
