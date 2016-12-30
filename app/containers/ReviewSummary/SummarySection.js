import React, { PropTypes } from 'react';
import titleCase from 'utils/titleCase';
import cuid from 'cuid';

import H1 from 'components/H1';
import List from 'components/List';
import Wrapper from 'components/Wrapper';
import Element from 'components/Element';
import RankHeader from './RankHeader';
import VocabChip from './VocabChip';

import {
  SectionHeader,
} from './UI';

const VocabList = ({ ranks, correct }) => (
  <Wrapper>
    {Object.entries(ranks).map(([rank, vocabItems]) => {
      const count = vocabItems.length;
      return (count > 0) && (
        <Element key={cuid()}>
          <RankHeader text={titleCase(rank)} count={count} />
          <List items={vocabItems} component={VocabChip} componentProps={{ color: (correct ? 'green' : 'red') }} />
        </Element>
      );
    })}
  </Wrapper>
);


VocabList.propTypes = {
  ranks: PropTypes.object.isRequired,
  correct: PropTypes.bool.isRequired,
};

const PlaceHolder = ({ correct }) => (
  <Wrapper>
    { !correct ?
      <H1 style={{ fontWeight: 'normal' }}><span lang="ja">満点！ </span> (๑•̀ㅂ•́)و</H1> :
      <H1 style={{ fontWeight: 'normal' }}><span lang="ja">零点... 残念だよ </span> (๑◕︵◕๑)</H1>
    }
  </Wrapper>
);

PlaceHolder.propTypes = {
  correct: PropTypes.bool.isRequired,
};

const SummarySection = ({ items, correct }) => (
  <section>
    <SectionHeader color={correct ? 'green' : 'red'}>{`${items.count} Answered ${correct ? 'Correctly' : 'Incorrectly'}`}</SectionHeader>
    { items.count ? <VocabList ranks={items.ranks} correct={correct} /> : <PlaceHolder correct={correct} /> }
  </section>
);


SummarySection.propTypes = {
  items: PropTypes.object.isRequired,
  correct: PropTypes.bool.isRequired,
};

export default SummarySection;
