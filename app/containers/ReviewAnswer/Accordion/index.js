import React from 'react';

const Accordion = () => (
  <div id="detailKanji" className="reveal-block">
    <button type="button" className="button revealToggle -disabled"><strong>K</strong>anji</button>
    <div className="reveal -hidden revealTarget">
      <p lang="ja" className="text -kanji">光栄</p>
    </div>
  </div>
);

export default Accordion;
