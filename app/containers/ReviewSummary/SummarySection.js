import React, { PropTypes } from 'react';
import titleCase from 'utils/titleCase';
import cuid from 'cuid';

import H2 from 'components/H2';
import List from 'components/List';
import Container from 'components/Container';
import Element from 'components/Element';
import RankHeader from './RankHeader';
import VocabChip from './VocabChip';

import {
  SectionHeader,
} from './styles';

const VocabList = ({ ranks, correct }) => (
  <Container>
    {Object.entries(ranks).map(([rank, vocabItems]) => {
      const count = vocabItems.length;
      return (count > 0) && (
        <Element key={cuid()}>
          <RankHeader text={titleCase(rank)} count={count} />
          <List items={vocabItems} component={VocabChip} componentProps={{ color: (correct ? 'green' : 'red') }} />
        </Element>
      );
    })}
  </Container>
);


VocabList.propTypes = {
  ranks: PropTypes.object.isRequired,
  correct: PropTypes.bool.isRequired,
};

const PlaceHolder = ({ correct }) => (
  <Container>
    <Element>
      { !correct ? (
        <H2 style={{ fontWeight: 'normal' }}>
          <span lang="ja">満点！ </span>
          <span>(๑•̀ㅂ•́)و</span>
        </H2>
      ) : (
        <H2 style={{ fontWeight: 'normal' }}>
          <span lang="ja">零点... 残念だよ </span>
          <span>(๑◕︵◕๑)</span>
        </H2>
      )}
    </Element>
  </Container>
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
