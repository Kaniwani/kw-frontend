import React from 'react';
import PropTypes from 'prop-types';

import condenseReadings from 'utils/condenseReadings';
import * as COLORS from 'shared/styles/colors';

import { Li, Link, Dl } from './styles';

VocabCard.propTypes = {
  id: PropTypes.number.isRequired,
  meanings: PropTypes.array.isRequired,
  readings: PropTypes.array.isRequired,
  color: PropTypes.oneOf(Object.keys(COLORS)),
};

VocabCard.defaultProps = {
  color: 'purple',
};

function VocabCard({ id, meanings, readings, color }) {
  return (
    <Li bgColor={color}>
      <Link plainLink to={`/vocabulary/entry/${id}`}>
        <Dl color={color}>
          <div className="reading">
            {/* FIXME: memoize */}
            {condenseReadings(readings).map(({ kana, character }) => ([
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
