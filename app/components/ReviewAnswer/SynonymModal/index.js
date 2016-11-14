import React from 'react';

const SynonymModal = () => (
  <div className="modal modal-medium synonym-modal" data-modal-window id="newSynonym">
    <a className="close" data-modal-close>
      <span className="icon i-cancel" />
    </a>
    <h3 className="title">Add an accepted answer synonym</h3>
    <form id="synonymForm" className="synonym-form">
      <label className="wrappinglabel" htmlFor="newKana">
        <span className="text">New Kana:</span>
        <input lang="ja" className="input" type="text" id="newKana" name="kana" defaultValue autoCapitalize="off" autoCorrect="off" spellCheck="false" autoComplete="off"
        />
        <a className="jisho" href="http://jisho.org/search/" rel="external noopener noreferrer" target="_blank" title="Search Jisho" tabIndex={ -1 }>
          <span className="icon i-help" />
        </a>
      </label>
      <label className="wrappinglabel" htmlFor="newKanji">
        <span className="text">New Kanji:</span>
        <input lang="ja" className="input" type="text" id="newKanji" name="kanji" defaultValue autoCapitalize="off" autoCorrect="off" spellCheck="false" autoComplete="off"
        />
        <a className="jisho" href="http://jisho.org/search/" rel="external noopener noreferrer" target="_blank" title="Search Jisho" tabIndex={ -1 }>
          <span className="icon i-help" />
        </a>
      </label>
      <div className="validation -hidden">
        <p>
          <span className="icon i-attention" />Please provide both Kana and Kanji. If there is no associated Kanji (IE.
          <span lang="ja">アメリカ</span>) – use Hiragana for the Kanji field. If you're unsure of either, press the "?" icon to search Jisho.org!</p>
      </div>
      <button id="synonymSubmit" type="submit" className="button -submit">Submit</button>
    </form>
  </div>
);

export default SynonymModal;