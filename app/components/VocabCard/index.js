import React from 'react';
import PropTypes from 'prop-types';

import * as COLORS from 'shared/styles/colors';

import { Li, Link, Dl } from './styles';

VocabCard.propTypes = {
  color: PropTypes.oneOf(Object.keys(COLORS)),
  id: PropTypes.number.isRequired,
  vocabulary: PropTypes.shape({
    meanings: PropTypes.array,
    readings: PropTypes.array,
  }).isRequired,
};

VocabCard.defaultProps = {
  color: 'purple',
};

function VocabCard({ color, id, vocabulary: { meanings, readings } }) {
  return (
    <Li bgColor={color}>
      <Link plainLink to={`/vocabulary/entry/${id}`}>
        <Dl color={color}>
          <div className="reading">
            {/* FIXME: should use selector for review from id  */}
            {readings.map(({ kana, character }) => ([
              <dt className="kana" lang="ja" >{kana.join(', ')}</dt>,
              <dt className="character" lang="ja" >{character}</dt>,
              <div className="separator" />,
            ]))}
          </div>
          <dd className="meaning">{meanings.join(', ')}</dd>
        </Dl>
      </Link>
    </Li>
  );
}

export default VocabCard;
