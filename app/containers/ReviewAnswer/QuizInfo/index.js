import React from 'react';
import Accordion from '../Accordion';

const QuizInfo = () => (
  <div className="review-extra">
    <div className="row">
      <Accordion />
      <div id="detailKana" className="reveal-block">
        <button type="button" className="button revealToggle -disabled"><strong>P</strong>honetic</button>
        <div className="reveal -hidden revealTarget">
          <p lang="ja" className="text -kana">こうえい
            <br />
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default QuizInfo;
