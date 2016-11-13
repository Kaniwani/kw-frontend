import React from 'react';
import styled from 'styled-components';
import Question from '../Question';
import Answer from '../Answer';
// import SynonymModal from '../SynonymModal';

const Quiz = () => (
  <div className="base">
    <Question />
    <div className="lower">
      <Answer />
      {/*<a
        id="addSynonym"
        className="button -addsynonym -hidden"
        data-modal="#newSynonym"
        href="#"
      >
        Add <strong>S</strong>ynonym
      </a>
      <SynonymModal />*/}
    </div>
  </div>
);

export default Quiz;
