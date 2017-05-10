import React from 'react';
import PropTypes from 'prop-types';

import * as COLORS from 'shared/styles/colors';

import { Li, Link, Dl } from './styles';

VocabCard.propTypes = {
  id: PropTypes.number.isRequired,
  meaning: PropTypes.string.isRequired,
  readings: PropTypes.array.isRequired,
  color: PropTypes.oneOf(Object.keys(COLORS)),
};

VocabCard.defaultProps = {
  color: 'purple',
};

function VocabCard({ id, meaning, readings, color }) {
  return (
    <Li bgColor={color}>
      <Link plainLink to={`/vocabulary/entry/${id}`}>
        <Dl color={color}>
          <div className="reading">
            {readings.map(({ kana, character }) => ([
              <dt className="kana" lang="ja" >{kana}</dt>,
              <dt className="character" lang="ja" >{character}</dt>,
              <div className="separator" />,
            ]))}
          </div>
          <dd className="meaning">{meaning}</dd>
        </Dl>
      </Link>
    </Li>
  );
}

export default VocabCard;
