import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import * as COLORS from 'shared/styles/colors';
import { Li, Link, Dl } from './styles';

VocabCard.propTypes = {
  color: PropTypes.oneOf(Object.keys(COLORS)),
  id: PropTypes.number.isRequired,
  meanings: PropTypes.array,
  readings: PropTypes.array,
};

VocabCard.defaultProps = {
  color: 'purple',
  meanings: [],
  readings: [],
};

function VocabCard({ color, id, meanings, readings }) {
  return (
    <Li bgColor={color}>
      <Link plainLink to={`/vocabulary/entry/${id}`}>
        <Dl color={color}>
          <div className="reading">
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

const mapStateToProps = createStructuredSelector({
  meanings: (state, { id }) => state.global.entities.reviews[id].vocabulary.meanings,
  readings: (state, { id }) => state.global.entities.reviews[id].vocabulary.readings,
});

export default connect(mapStateToProps)(VocabCard);
