import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { white, green, red } from 'shared/styles/colors';
import titleCase from 'utils/titleCase';
import cuid from 'cuid';

import List from 'components/List';

import RankHeader from './RankHeader';
import VocabChip from './VocabChip';

const VocabList = ({ ranks, correct }) => (
  <Section>
    {Object.entries(ranks).map(([rank, vocabItems]) => {
      const count = vocabItems.length;
      return (count > 0) && (
        <section key={cuid()}>
          <RankHeader text={titleCase(rank)} count={count} />
          <List items={vocabItems} component={VocabChip} componentProps={{ color: (correct ? 'green' : 'red') }} />
        </section>
      );
    })}
  </Section>
);


VocabList.propTypes = {
  ranks: PropTypes.object.isRequired,
  correct: PropTypes.bool.isRequired,
};

const PlaceHolder = ({ correct }) => (
  <Section>
    { !correct ?
      <h3 ><span lang="ja">満点！ </span> (๑•̀ㅂ•́)و</h3> :
      <h3 ><span lang="ja">零点... 残念だよ </span> (๑◕︵◕๑)</h3>
    }
  </Section>
);

PlaceHolder.propTypes = {
  correct: PropTypes.bool.isRequired,
};

const SectionHeader = styled.h2`
  margin: 0;
  padding: 1rem;
  color: rgb(${white});
  background-color: rgb(${(props) => (props.correct ? green : red)});
`;

const Section = styled.section`
  margin-top: .5rem;
  padding: 1rem;
`;

const SummarySection = ({ items, correct }) => (
  <section>
    <SectionHeader correct={correct}>{`${items.count} Answered ${correct ? 'Correctly' : 'Incorrectly'}`}</SectionHeader>
    { items.count ? <VocabList ranks={items.ranks} correct={correct} /> : <PlaceHolder correct={correct} /> }
  </section>
);


SummarySection.propTypes = {
  items: PropTypes.object.isRequired,
  correct: PropTypes.bool.isRequired,
};

export default SummarySection;
