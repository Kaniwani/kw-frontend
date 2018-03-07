import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectWord,
  selectFuri,
  selectPrimaryReading,
  selectSecondaryReadings,
} from 'features/vocab/selectors';

import Ruby from 'common/components/Ruby';
import P from 'common/components/P';

const SecondaryReadings = P.extend`
  opacity: 0.8;
  line-height: 1;
`;

VocabWord.propTypes = {
  word: PropTypes.string.isRequired,
  furi: PropTypes.string,
  primaryReading: PropTypes.string,
  secondaryReadings: PropTypes.array,
  showFuri: PropTypes.bool,
  showSecondary: PropTypes.bool,
  renderPrimary: PropTypes.func,
  renderSecondary: PropTypes.func,
};

VocabWord.defaultProps = {
  furi: '',
  primaryReading: '',
  secondaryReadings: [],
  showFuri: true,
  showSecondary: true,
  renderPrimary: (props) => <Ruby {...props} />,
  renderSecondary: ({ text }) =>
    text && (
      <SecondaryReadings lang="ja">
        <small>Alternate:</small> {text}
      </SecondaryReadings>
    ),
};

export function VocabWord({
  word,
  furi,
  primaryReading,
  secondaryReadings,
  showFuri,
  showSecondary,
  renderPrimary,
  renderSecondary,
}) {
  return (
    <Fragment>
      {renderPrimary({
        word,
        furi,
        showFuri,
        reading: primaryReading,
      })}
      {showSecondary && renderSecondary({ text: secondaryReadings.join(' ・ ') })}
    </Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  word: selectWord,
  furi: selectFuri,
  primaryReading: selectPrimaryReading,
  secondaryReadings: selectSecondaryReadings,
});

export default connect(mapStateToProps)(VocabWord);
