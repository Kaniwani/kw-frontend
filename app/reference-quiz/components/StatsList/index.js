import React from 'react';

const StatsList = () => (
  <ul className="statslist">
    <li className="item" title="Correct answers">
      <span className="icon i-thumbsup" />
      <span id="reviewsCorrect">0</span>%</li>
    <li className="item" title="Reviews answered">
      <span className="icon i-ok" />
      <span id="reviewsDone">0</span>
    </li>
    <li className="item" title="Reviews remaining">
      <span className="icon i-inbox" />
      <span id="reviewsLeft">36</span>
    </li>
  </ul>
);

export default StatsList;