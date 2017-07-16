import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import titleCase from 'voca/title_case';

import {
  makeSelectReviewMeanings,
  makeSelectReviewReadings,
} from 'containers/App/selectors';

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
          <dd className="meaning">{titleCase(meanings.join(', '))}</dd>
        </Dl>
      </Link>
    </Li>
  );
}

const mapStateToProps = (state, props) => ({
  meanings: makeSelectReviewMeanings(props.id)(state),
  readings: makeSelectReviewReadings(props.id)(state),
});

export default connect(mapStateToProps)(VocabCard);
